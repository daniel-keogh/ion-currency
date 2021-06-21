import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistoricalData } from './../../interfaces/historical-data';
import { Rates } from '../../interfaces/rates';

const BASE_URL = 'https://api.exchangerate.host/';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  constructor(private http: HttpClient) {}

  latest(base: string): Observable<Rates> {
    return this.http.get<Rates>(`${BASE_URL}/latest?base=${base}`);
  }

  convert(base: string, convertTo: string): Observable<Rates> {
    return this.http.get<Rates>(
      `${BASE_URL}/latest?symbols=${convertTo}&base=${base}`
    );
  }

  getHistoricalDataset(
    currency: string,
    base: string,
    startDate: Date
  ): Observable<HistoricalData[]> {
    const start = this.formatDate(startDate);
    const end = this.formatDate(new Date());

    return this.http
      .get(
        `${BASE_URL}/timeseries?start_date=${start}&end_date=${end}&symbols=${currency}&base=${base}`
      )
      .pipe(
        map((data: any) => {
          return Object.keys(data.rates)
            .sort()
            .map((dt) => ({ date: dt, rate: data.rates[dt][currency] }));
        })
      );
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
