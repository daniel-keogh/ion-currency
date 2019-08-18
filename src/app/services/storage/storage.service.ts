import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const DEF_BASE_CUR = 'EUR';
const BASE_CUR_KEY = 'Base Currency';
const DEF_CONV_CUR = 'USD';
const CONV_CUR_KEY = 'Converted Currency';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  setBaseCurrency(currencyCode: string) {
    this.storage.set(BASE_CUR_KEY, currencyCode);
  }

  async getBaseCurrency(): Promise<string> {
    return await this.storage.get(BASE_CUR_KEY).then(cur => {
      if (cur) {
        return cur;
      } else {
        throw new Error();
      }
    }).catch(() => {
      return DEF_BASE_CUR;
    });
  }

  setConvertedCurrency(currencyCode: string) {
    this.storage.set(CONV_CUR_KEY, currencyCode);
  }

  async getConvertedCurrency(): Promise<string> {
    return await this.storage.get(CONV_CUR_KEY).then(cur => {
      if (cur) {
        return cur;
      } else {
        throw new Error();
      }
    }).catch(() => {
      return DEF_CONV_CUR;
    });
  }
}
