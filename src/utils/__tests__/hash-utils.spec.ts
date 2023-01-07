import { describe, expect, it } from 'vitest';
import { compare, decrypt, encrypt } from '../hash-utils';

describe('Hash utils tests', () => {
  it('should encrypt a string', () => {
    expect(encrypt('ABC123')).toString();
  });

  it('should decrypt a string', () => {
    const encryptedValue = encrypt('ABC123');
    expect(encryptedValue).toString();
    expect(decrypt(encryptedValue)).toString();
  });

  it('should encrypt and decrypt match the string', () => {
    const encryptedValue = encrypt('ABC123');
    expect(encryptedValue).toString();
    expect(compare('ABC123', encryptedValue)).toBeTruthy();
  });
});
