import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartsService } from 'src/app/services/charts/charts.service';
import { StorageService } from 'src/app/services/storage/storage.service';
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

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  constructor(
    private activatedRouter: ActivatedRoute,
    private alertController: AlertController,
    private rates: RatesService,
    private router: Router,
    private charts: ChartsService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(
      (pm) => (this.currency = pm.get('currency-code'))
    );

    this.activatedRouter.queryParamMap.subscribe(
      (qpm) => (this.base = qpm.get('base'))
    );

    if (
      this.validateCurrency(this.base) &&
      this.validateCurrency(this.currency)
    ) {
      const days = 7;
      this.createChart(days);
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

  async createChart(days?: number, months?: number) {
    // Base currency wasn't passed into the URL: Use default
    if (this.base === undefined) {
      this.base = await this.storage.getBaseCurrency();
    }

    this.ratesSub = this.rates
      .getHistoricalDataset(this.currency, this.base, months, days)
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

  validateCurrency(currencyCode: string): boolean {
    return !!this.currencies.find((cur) => currencyCode === cur.code);
  }

  segmentChanged(ev: any) {
    let months: number;
    let days: number;

    switch (ev.detail.value) {
      case 'week':
        days = 7;
        break;
      case 'month':
      case 'sixMonths':
      case 'year':
        months = Months[ev.detail.value as string];
        break;
      default:
        break;
    }

    this.createChart(days, months);
  }

  getPoints(dataset: HistoricalData[]): Points {
    const rates = dataset.map((r) => r.rate);

    return {
      High: Math.max(...rates),
      Low: Math.min(...rates),
      Average: rates.reduce((a, b) => a + b, 0) / rates.length,
    };
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
