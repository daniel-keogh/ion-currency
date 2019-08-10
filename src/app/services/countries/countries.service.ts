import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getFlagUrl(currencyCode: string) {
    return `https://www.countryflags.io/${currencyCode.slice(0, -1)}/flat/64.png`;
  }
}
