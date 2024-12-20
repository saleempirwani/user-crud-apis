// import CryptoJS from "crypto-js";

// Encryption
export const encrypt = (text: string, secretKey: string, enabled = true) => {
  if (enabled) return CryptoJS.AES.encrypt(text, secretKey).toString();
  return text;
};

// Decryption
export const decrypt = (
  encryptedText: string,
  secretKey: string,
  enabled = true
) => {
  if (enabled) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return encryptedText;
};
