import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const DEF_BASE_CUR = 'EUR';
const BASE_CUR_KEY = 'Base Currency';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  setBaseCurrency(currencyCode: string) {
    this.storage.set(BASE_CUR_KEY, currencyCode);
  }

  async getBaseCurrency(): Promise<string> {
    return this.storage.get(BASE_CUR_KEY).then(cur => {
      if (cur) {
        return cur;
      } else {
        throw new Error();
      }
    }).catch(() => {
      return DEF_BASE_CUR;
    });
  }
}
