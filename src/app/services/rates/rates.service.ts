import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  historical: Chart;

  constructor(private http: HttpClient) { }

  latest(base: string): Observable<any> {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
  }
}
