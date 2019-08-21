import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor() { }

  getFlagUrl(currencyCode: string): string {
    return `https://www.countryflags.io/${currencyCode.slice(0, -1)}/flat/64.png`;
  }
}
