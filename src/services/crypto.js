/**
 * Web Crypto API SHA-256 Utilities
 * "Important: SHA-256 proves file integrity, not truth."
 */

export async function computeSHA256(buffer) {
  if (!window.crypto?.subtle?.digest) {
    throw new Error('Web Crypto SHA-256 is unavailable in this browser.');
  }
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
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
