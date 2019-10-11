import { Injectable, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { HistoricalData } from '../../interfaces/historical-data';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private history: Chart;

  constructor() {}

  generateChart({ canvas, dataset, currency, base }: {
    canvas: ElementRef<HTMLCanvasElement>;
    dataset: HistoricalData[];
    currency: string;
    base: string;
  }): Chart {
    // If a chart was already drawn, nuke it and make a new one.
    if (this.history) {
      this.history.destroy();
    }
    return this.history = new Chart(canvas.nativeElement, {
      type: 'line',
      data: {
        labels: dataset.map(item => item.date),
        datasets: [
          {
            label: `1 ${base}`,
            data: dataset.map(item => item.rate),
            backgroundColor: 'rgba(40, 175, 176, 0.2)',
            borderColor: 'rgba(40, 175, 176, 1)',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5
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
          text: `1 ${base} in ${currency}`,
          fontSize: 16,
          fontColor: '#717172'
        },
        hover: {
          intersect: false
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              return `${data.datasets[tooltipItem.datasetIndex].label} = ${(+tooltipItem.yLabel).toFixed(4)} ${currency}`;
            }
          },
          intersect : false,
          mode: 'index',
          displayColors: false,
          titleFontColor: '#ff3366',
          titleFontSize: 13,
          bodyFontSize: 13,
          xPadding: 10,
          yPadding: 10,
        }
      }
    });
  }

  getPoints(dataset: HistoricalData[]): any {
    const rates = dataset.map(r => r.rate);
    return {
      High: this.getHigh(rates),
      Low: this.getLow(rates),
      Average: this.getAvg(rates)
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
