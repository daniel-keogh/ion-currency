import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) { }

  latest(base: string = 'EUR'): Observable<any> {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
  }
}
