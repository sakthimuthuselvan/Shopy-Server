const CryptoJS = require('crypto-js');

const secretKey = process.env.SECRET_KEY;

function encrypt(text) {
    const cipherText = CryptoJS.AES.encrypt(text, secretKey).toString();
    return cipherText;
  }
  
  // Decryption function
  function decrypt(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
  module.exports={encrypt,decrypt}



