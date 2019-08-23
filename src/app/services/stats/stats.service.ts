import { Injectable, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { HistoricalData } from '../../interfaces/historical-data';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor() { }

  generateChart({ canvas, dataset, currency, base }: {
    canvas: ElementRef<HTMLCanvasElement>;
    dataset: HistoricalData[];
    currency: string;
    base: string;
  }): Chart {
    return new Chart(canvas.nativeElement, {
      type: 'line',
      data: {
        labels: dataset.map(item => item.date),
        datasets: [
          {
            label: `${base} to ${currency}`,
            data: dataset.map(item => item.rate),
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
          text: `${base} to ${currency}`,
          fontSize: 14
        }
      }
    });
  }

  getPoints(dataset: HistoricalData[]): any {
    const rates = dataset.map(r => r.rate);
    return {
      high: this.getHigh(rates),
      low: this.getLow(rates),
      average: this.getAvg(rates)
    };
  }

  getHigh(rates: number[]): number {
    return Math.max(...rates);
  }

  getLow(rates: number[]): number {
    return Math.min(...rates);
  }

  getAvg(rates: number[]): number {
    return rates.reduce((a, b) => a + b, 0) / rates.length;
  }
}
