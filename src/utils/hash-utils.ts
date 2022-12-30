import SimpleCrypto from 'simple-crypto-js';

const secretKey = 'some-unique-key';
const simpleCrypto = new SimpleCrypto(secretKey);

export const decrypt = (encodedText: string) => {
  return simpleCrypto.decrypt(encodedText).toString();
};

export const encrypt = (plainText: string) => {
  return simpleCrypto.encrypt(plainText);
};

export const compare = (plainText: string, encodedText: string) => {
  return plainText === decrypt(encodedText);
};
