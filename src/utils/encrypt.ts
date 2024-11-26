// @ts-ignore
import CryptoJS from 'crypto-js';

// A secret key for encryption
const secretKey: string = import.meta.env.VITE_secret_Encrpt;
// Type for the data you are storing
export interface Data {
  id: number;
  name: string;
  age: number;
}

// Encrypt the data (array of objects)
export const encryptValue = (data:any): string => {
  const jsonString: string = JSON.stringify(data);
  const encrypted: string = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  return encrypted;
};

// Decrypt the data (when retrieving from localStorage)
export const decryptValue = (encodedData: string): any | null => {
  try {
    // Decrypt the provided encodedData
    const bytes = CryptoJS.AES.decrypt(encodedData, secretKey);
    const decrypted: string = bytes.toString(CryptoJS.enc.Utf8);

    // If the decryption process returns an empty string, return null (indicating failure)
    if (!decrypted) {
      console.error('Decryption failed: No data was decrypted.');
      return null;
    }

    // Parse the decrypted data to return it as an object (or array)
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Error during decryption:', error);
    return null;
  }
};
