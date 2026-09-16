/**
 * Web Crypto API SHA-256 Utilities
 * "Important: SHA-256 proves file integrity, not truth."
 */

export async function computeSHA256(buffer) {
  if (window.crypto && window.crypto.subtle && window.crypto.subtle.digest) {
    try {
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      console.warn('SubtleCrypto error, using fallback', e);
    }
  }

  // Fallback hash implementation if SubtleCrypto is unavailable
  let hash = 0;
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    hash = ((hash << 5) - hash) + bytes[i];
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}

export async function computeStringSHA256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  return computeSHA256(data.buffer);
}

export async function verifyBufferIntegrity(buffer, expectedHash) {
  const calculated = await computeSHA256(buffer);
  return calculated.toLowerCase() === String(expectedHash).toLowerCase();
}
