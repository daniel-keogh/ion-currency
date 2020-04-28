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
    numMonths?: number,
    numDays?: number
  ): Observable<HistoricalData[]> {
    const today: Date = new Date();
    const start: Date = new Date();

    if (numMonths) {
      this.subtractMonths(start, numMonths);
    } else {
      this.subtractDays(start, numDays);
    }

    return this.http
      .get(
        `https://api.exchangeratesapi.io/history?start_at=${this.formatDate(
          start
        )}&end_at=${this.formatDate(today)}&symbols=${currency}&base=${base}`
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

  private subtractMonths(date: Date, months: number): Date {
    date.setMonth(date.getMonth() - months);
    return date;
  }

  private subtractDays(date: Date, days: number): Date {
    date.setDate(date.getDate() - days);
    return date;
  }
}
