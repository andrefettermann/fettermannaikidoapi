import * as crypto from 'crypto';

// Ensure your key is 32 bytes (256 bits) for AES-256
const ENCRYPTION_KEY = 'ABCDEFGHIJKLMNOPabcdefghijklmnop';
            //crypto.randomBytes(32); // Use a securely generated key in a real application
const IV_LENGTH = 16; // For 'aes-256-cbc', the IV length is 16 bytes

/**
 * Encrypts a plaintext string using AES-256-CBC.
 * @param text The plaintext string to encrypt.
 * @returns A string containing the IV and encrypted data, separated by a colon.
 */
export function encripta(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Decrypts an encrypted string using AES-256-CBC.
 * @param text The encrypted string (IV:encryptedData).
 * @returns The decrypted plaintext string.
 */
export function decripta(text: string): string {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString();
}