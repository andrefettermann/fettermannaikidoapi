// src/tests/crypto.test.ts
import * as crypto from "../utils/crypto";

describe('Utilitario de criptografia', () => {

  test.only('deveria encriptar', async () => {
    const encrypted = crypto.encripta('André Fettermann');
    expect(encrypted).toBe('464c45306073c3eed23d08bb6bf384fa:930377a3c3c246ab85756c1b5f1fb434');
  });

  test.only('deveria decriptar', async () => {
    let encrypted = '5a2b463ff2718bae988d6b5bcf7c0978:816d16a6833604cc5bb08c6775a7bcec';
    const decrypted = crypto.decripta(encrypted);
    expect(decrypted).toBe('954.520.797-34');
  });

});
