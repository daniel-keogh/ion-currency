import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoricalData } from 'src/app/interfaces/historical-data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  constructor(private http: HttpClient) {}

  latest(base: string): Observable<any> {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
  }

  convert(base: string, convertTo: string): Observable<any> {
    return this.http.get(
      `https://api.exchangeratesapi.io/latest?symbols=${convertTo}&base=${base}`
    );
  }

  getHistoricalDataset(
    currency: string,
    base: string,
    startDate: Date
  ): Observable<HistoricalData[]> {
    const today: Date = new Date();

    return this.http
      .get(
        `https://api.exchangeratesapi.io/history?start_at=${this.formatDate(startDate)}&end_at=${this.formatDate(today)}&symbols=${currency}&base=${base}`
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
