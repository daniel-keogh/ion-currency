import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  historical(compare: string, base: string, monthPeriod: number = 1): Observable<any> {
    const formatDate = (date: Date) => {
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
      return `${yyyy}-${mm}-${dd}`;
    };

    const subtractMonths = (date: Date, months: number) => {
      date.setMonth(date.getMonth() - months);
      return date;
    };

    const today: any = new Date();
    const start: any = subtractMonths(new Date(), monthPeriod);

    return this.http.get(`https://api.exchangeratesapi.io/history?start_at=${formatDate(start)}&end_at=${formatDate(today)}&symbols=${compare}&base=${base}`);
  }
}
