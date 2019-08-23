import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoricalData } from 'src/app/interfaces/historical-data';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) { }

  latest(base: string): Observable<any> {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
  }

  convert(base: string, convertTo: string): Observable<any> {
    return this.http.get(`https://api.exchangeratesapi.io/latest?symbols=${convertTo}&base=${base}`);
  }

  async getHistoricalDataset(currency: string, base: string, numMonths?: number, numDays?: number): Promise<HistoricalData[]> {
    const formatDate = (date: Date): string => date.toISOString().split('T')[0];

    const subtractMonths = (date: Date, months: number): Date => {
      date.setMonth(date.getMonth() - months);
      return date;
    };

    const subtractDays = (date: Date, days: number): Date => {
      date.setDate(date.getDate() - days);
      return date;
    };

    const today: Date = new Date();
    const start: Date = numMonths ? subtractMonths(new Date(), numMonths) : subtractDays(new Date(), numDays);

    return await this.http.get(
      `https://api.exchangeratesapi.io/history?start_at=${formatDate(start)}&end_at=${formatDate(today)}&symbols=${currency}&base=${base}`
    )
    .toPromise()
    .then((data: any) => {
      return Object.keys(data.rates).sort().map(dt => ({date: dt, rate: data.rates[dt][currency]}));
    });
  }
}
