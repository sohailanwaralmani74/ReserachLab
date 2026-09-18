import * as XLSX from 'xlsx';
import { computeSHA256 } from './crypto.js';

export function getFileTypeFromFilename(filename) {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  if (ext === 'pdf') return 'pdf';
  if (['xls', 'xlsx'].includes(ext)) return 'xlsx';
  if (ext === 'csv') return 'csv';
  if (ext === 'docx') return 'docx';
  if (['txt', 'log', 'md'].includes(ext)) return 'txt';
  if (['vtt', 'srt', 'transcript'].includes(ext)) return 'transcript';
  if (['html', 'htm', 'mhtml', 'webarchive'].includes(ext)) return 'web';
  return 'other';
}


async function parseDocxText(buffer) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const decoder = new TextDecoder('utf-8');

  const readU16 = (o) => view.getUint16(o, true);
  const readU32 = (o) => view.getUint32(o, true);
  const findEnd = () => {
    for (let i = bytes.length - 22; i >= 0; i--) {
      if (readU32(i) === 0x06054b50) return i;
    }
    return -1;
  };
  const inflate = async (data) => {
    if (typeof DecompressionStream === 'undefined') throw new Error('This browser does not support ZIP decompression required for DOCX files.');
    const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  };

  const eocd = findEnd();
  if (eocd < 0) throw new Error('Invalid DOCX ZIP container.');
  const centralOffset = readU32(eocd + 16);
  const entries = readU16(eocd + 10);
  let offset = centralOffset;
  let documentEntry = null;

  for (let i = 0; i < entries; i++) {
    if (readU32(offset) !== 0x02014b50) throw new Error('Invalid DOCX central directory.');
    const compression = readU16(offset + 10);
    const compressedSize = readU32(offset + 20);
    const nameLen = readU16(offset + 28);
    const extraLen = readU16(offset + 30);
    const commentLen = readU16(offset + 32);
    const localOffset = readU32(offset + 42);
    const name = decoder.decode(bytes.slice(offset + 46, offset + 46 + nameLen));
    if (name === 'word/document.xml') documentEntry = { compression, compressedSize, localOffset };
    offset += 46 + nameLen + extraLen + commentLen;
  }

  if (!documentEntry) throw new Error('DOCX document.xml was not found.');
  const local = documentEntry.localOffset;
  if (readU32(local) !== 0x04034b50) throw new Error('Invalid DOCX local file header.');
  const localNameLen = readU16(local + 26);
  const localExtraLen = readU16(local + 28);
  const dataStart = local + 30 + localNameLen + localExtraLen;
  const compressed = bytes.slice(dataStart, dataStart + documentEntry.compressedSize);
  let xmlBytes;
  if (documentEntry.compression === 0) xmlBytes = compressed;
  else if (documentEntry.compression === 8) xmlBytes = await inflate(compressed);
  else throw new Error('Unsupported DOCX compression method.');

  const xml = decoder.decode(xmlBytes);
  const xmlDoc = new DOMParser().parseFromString(xml, 'application/xml');
  if (xmlDoc.querySelector('parsererror')) throw new Error('Could not parse DOCX XML.');

  const paragraphs = Array.from(xmlDoc.getElementsByTagNameNS('*', 'p')).map((p) => {
    return Array.from(p.getElementsByTagNameNS('*', 't')).map((t) => t.textContent || '').join('');
  }).filter(Boolean);
  return paragraphs.join('\\n\\n').trim();
}

export async function parseFile(file, sequenceNumber = 1, folderId = null) {
  const buffer = await file.arrayBuffer();
  const sha256 = await computeSHA256(buffer);
  const type = getFileTypeFromFilename(file.name);
  const sourceId = `S${String(sequenceNumber).padStart(2, '0')}`;

  let rawText = '';
  let pageCount = 1;
  let sheetCount = 0;
  let textPages = [];
  let sheets = [];
  let previewUrl = null;

  try {
    if (type === 'pdf') {
      try {
        const pdfjs = await import('pdfjs-dist');
        if (pdfjs.GlobalWorkerOptions && !pdfjs.GlobalWorkerOptions.workerSrc) {
          pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version || '4.10.38'}/pdf.worker.min.mjs`;
        }
        const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buffer) });
        const pdfDoc = await loadingTask.promise;
        pageCount = pdfDoc.numPages;

        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items
            .map((item) => (item.str ? item.str : ''))
            .join(' ');
          textPages.push({ pageNumber: i, text: pageText.trim() });
        }
        rawText = textPages.map((p) => `--- Page ${p.pageNumber} ---\n${p.text}`).join('\n\n');
      } catch (pdfErr) {
        console.warn('PDF.js text parsing encountered error, using binary text extractor:', pdfErr);
        const decoder = new TextDecoder('utf-8', { fatal: false });
        const rough = decoder.decode(buffer);
        const readable = rough.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ');
        rawText = readable.slice(0, 30000);
        textPages = [{ pageNumber: 1, text: rawText }];
        pageCount = 1;
      }
    } else if (type === 'xlsx' || type === 'csv') {
      const workbook = XLSX.read(buffer, { type: 'array' });
      sheetCount = workbook.SheetNames.length;
      sheets = workbook.SheetNames.map((name) => {
        const worksheet = workbook.Sheets[name];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = (data[0] || []).map((h) => String(h ?? ''));
        const rows = data.slice(1).map((row) => (row || []).map((cell) => cell ?? ''));
        return {
          sheetName: name,
          headers,
          rows,
        };
      });

      rawText = sheets
        .map((s) => {
          const rowLines = s.rows
            .map((r, i) => `Row ${i + 1}: ${r.filter((c) => c !== '').join(' | ')}`)
            .join('\n');
          return `=== Sheet: ${s.sheetName} ===\nHeaders: ${s.headers.join(' | ')}\n${rowLines}`;
        })
        .join('\n\n');

      pageCount = sheetCount;
    } else if (type === 'docx') {
      rawText = await parseDocxText(buffer);
      // Create logical reading pages ~ 2500 characters
      const paragraphs = rawText.split(/\n\s*\n/);
      let curText = '';
      let pageNum = 1;
      for (const p of paragraphs) {
        curText += p + '\n\n';
        if (curText.length > 2500) {
          textPages.push({ pageNumber: pageNum++, text: curText.trim() });
          curText = '';
        }
      }
      if (curText.trim() || textPages.length === 0) {
        textPages.push({ pageNumber: pageNum, text: curText.trim() });
      }
      pageCount = textPages.length;
    } else if (type === 'txt' || type === 'transcript' || type === 'web') {
      const decoder = new TextDecoder('utf-8', { fatal: false });
      rawText = decoder.decode(buffer).slice(0, 20000);
      textPages = [{ pageNumber: 1, text: rawText }];
    }
  } catch (err) {
    console.error('File parsing error:', err);
    rawText = `[Error extracting text: ${err.message}]`;
    textPages = [{ pageNumber: 1, text: rawText }];
  }

  return {
    id: sourceId,
    name: file.name,
    originalName: file.name,
    type,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    sha256,
    importedAt: new Date().toISOString(),
    pageCount,
    sheetCount,
    folderId,
    indexingState: 'indexed',
    rawText,
    textPages,
    sheets,
    previewUrl,
    metadata: {
      'File Size': `${(file.size / 1024).toFixed(1)} KB`,
      'MIME Type': file.type || 'application/octet-stream',
      'Extracted Characters': rawText.length,
    },
    sourceDetails: `Imported ${new Date().toLocaleDateString()} · SHA-256 integrity recorded`,
  };
}
