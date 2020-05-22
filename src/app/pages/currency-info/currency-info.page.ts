import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartsService } from 'src/app/services/charts/charts.service';
import { currencies } from 'src/app/common/currencies';
import { AlertController } from '@ionic/angular';
import { HistoricalData } from '../../interfaces/historical-data';
import { RatesService } from 'src/app/services/rates/rates.service';
import { Points } from './../../interfaces/points';
import { Subscription } from 'rxjs';

enum Months {
  month = 1,
  sixMonths = 6,
  year = 12,
}

type SegmentValue = 'week' | 'month' | 'sixMonths' | 'year';
type Segment = { label: string; value: SegmentValue };

@Component({
  selector: 'app-currency-info',
  templateUrl: './currency-info.page.html',
  styleUrls: ['./currency-info.page.scss'],
})
export class CurrencyInfoPage implements OnInit, OnDestroy {
  currency: string;
  base: string;
  currencies = [...currencies];
  points: Points;

  ratesSub: Subscription;

  segments: Segment[] = [
    {
      label: 'Week',
      value: 'week',
    },
    {
      label: 'Month',
      value: 'month',
    },
    {
      label: 'Six Months',
      value: 'sixMonths',
    },
    {
      label: 'Year',
      value: 'year',
    },
  ];

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  constructor(
    private activatedRouter: ActivatedRoute,
    private alertController: AlertController,
    private rates: RatesService,
    private router: Router,
    private charts: ChartsService
  ) {}

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(
      (pm) => (this.currency = pm.get('currency-code'))
    );

    this.activatedRouter.queryParamMap.subscribe(
      (qpm) => (this.base = qpm.get('base'))
    );

    if (this.validateCurrencies(this.base, this.currency)) {
      // Get last 7 days
      this.createChart(this.subtractDays(new Date(), 7));
    } else {
      // A valid currency wasn't entered into the browser navbar
      this.router.navigate(['/home']);
      this.genericErrorAlert({
        message: 'Sorry, failed to find anything about that currency.',
        header: 'Invalid Currency',
      });
    }
  }

  ngOnDestroy() {
    this.ratesSub?.unsubscribe();
  }

  async createChart(startDate: Date) {
    this.ratesSub = this.rates
      .getHistoricalDataset(this.currency, this.base, startDate)
      .subscribe(
        (dataset) => {
          this.charts.generateChart({
            canvas: this.canvas,
            dataset,
            currency: this.currency,
            base: this.base,
          });

          this.points = this.getPoints(dataset);
        },
        (err) => {
          this.router.navigate(['/home']);
          this.genericErrorAlert({
            message: `Failed to load information about ${this.currency}.`,
            subHeader: err.name,
          });
        }
      );
  }

  validateCurrencies(...currencyCodes: string[]): boolean {
    return currencyCodes.every((code) => {
      return !!this.currencies.find((cur) => cur.code === code);
    });
  }

  segmentChanged(ev: any) {
    const startDate = new Date();
    const value: SegmentValue = ev.detail.value;

    if (value === 'week') {
      this.subtractDays(startDate, 7);
    } else {
      this.subtractMonths(startDate, Months[value]);
    }

    this.createChart(startDate);
  }

  getPoints(dataset: HistoricalData[]): Points {
    const rates = dataset.map((r) => r.rate);

    return {
      High: Math.max(...rates),
      Low: Math.min(...rates),
      Average: rates.reduce((a, b) => a + b, 0) / rates.length,
    };
  }

  subtractMonths(date: Date, months: number): Date {
    date.setMonth(date.getMonth() - months);
    return date;
  }

  subtractDays(date: Date, days: number): Date {
    date.setDate(date.getDate() - days);
    return date;
  }

  async genericErrorAlert({
    message,
    header = 'Error',
    subHeader,
  }: {
    message: string;
    header?: string;
    subHeader?: string;
  }) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
