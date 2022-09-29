export const CLIENT_APP_KEY = process.env.REACT_APP_KEY;

export default class HashService {
  instance = null;

  readonly KEY_LOGIN_COOKIE = '__login';
  readonly KEY_USER_COOKIE = '__user';

  constructor() {
    this.instance = require('crypto-js');
  }

  hashCryptoAES(data: any | string): string {
    if (!data) return '';
    return this.instance.AES.encrypt(JSON.stringify(data), CLIENT_APP_KEY).toString();
  }

  unHashCryptoAES(hash: string): any {
    if (!hash) return '';
    const bytes = this.instance.AES.decrypt(hash, CLIENT_APP_KEY);
    return JSON.parse(bytes.toString(this.instance.enc.Utf8));
  }
}
