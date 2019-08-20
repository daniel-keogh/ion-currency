import { Injectable, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { RatesService } from '../rates/rates.service';
import { HistoricalData } from '../../interfaces/historical-data';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private rates: RatesService) { }

  async generateChart(canvas: ElementRef, currency: string, base: string): Promise<HistoricalData> {
    return await this.rates.historical(currency, base).toPromise()
    .then(rates => {
      return Object.keys(rates.rates).sort().map(dt => ({date: dt, rate: rates.rates[dt][currency]}));
    })
    .then(historicalData => {
      const chart = new Chart(canvas.nativeElement, {
        type: 'line',
        data: {
          labels: historicalData.map(item => item.date),
          datasets: [
            {
              label: `${currency} to ${base}`,
              data: historicalData.map(item => item.rate),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: `${currency} to ${base}`,
            fontSize: 14
          }
        }
      });

      const rates = historicalData.map(r => r.rate);
      return {chart, points: {
        high: this.getHigh(rates),
        low: this.getLow(rates),
        avg: this.getAvg(rates)
      }};
    });
  }

  getHigh(rates: number[]): number {
    return Math.max(...rates);
  }

  getLow(rates: number[]): number {
    return Math.min(...rates);
  }

  getAvg(rates: number[]) {
    return rates.reduce((a, b) => a + b, 0) / rates.length;
  }
}
