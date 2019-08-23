import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatsService } from 'src/app/services/stats/stats.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { currencies } from 'src/app/common/currencies';
import { AlertController } from '@ionic/angular';
import { HistoricalData } from '../../interfaces/historical-data';
import { RatesService } from 'src/app/services/rates/rates.service';

@Component({
  selector: 'app-currency-info',
  templateUrl: './currency-info.page.html',
  styleUrls: ['./currency-info.page.scss'],
})
export class CurrencyInfoPage implements OnInit {

  currency: string;
  base: string;
  currencies = [...currencies];
  points: any;
  months: number;

  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  constructor(
    private activatedRouter: ActivatedRoute,
    private alertController: AlertController,
    private rates: RatesService,
    private router: Router,
    private stats: StatsService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    const days = 7;
    this.activatedRouter.paramMap.subscribe(paramMap => {
      if (paramMap.get('currency-code')) {
        // make sure the currency-code in the URL is valid
        if (!this.currencies.find(cur => paramMap.get('currency-code') === cur.code)) {
          this.router.navigate(['/home']);
          this.invalidCurrencyAlert();
          return;
        }
      }
      this.currency = paramMap.get('currency-code');
      this.createChart(days);
    });
  }

  async createChart(days?: number, months?: number) {
    this.base = await this.storage.getBaseCurrency();

    this.rates.getHistoricalDataset(this.currency, this.base, months, days)
    .then((dataset: HistoricalData[]) => {
      this.stats.generateChart({
        canvas: this.canvas,
        dataset,
        currency: this.currency,
        base: this.base
      });
      this.points = this.stats.getPoints(dataset);
    })
    .catch(err => {
      this.router.navigate(['/home']);
      this.genericErrorAlert(err);
    });
  }

  async genericErrorAlert(err: Error) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: err.name,
      message: `Failed to load information about ${this.currency}.`,
      buttons: ['OK']
    });
    await alert.present();
  }

  async invalidCurrencyAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid Currency',
      message: 'Sorry, failed to find anything about that currency.',
      buttons: ['OK']
    });
    await alert.present();
  }

  segmentChanged(ev: any) {
    let months: number;
    let days: number;
    const enum Months {
      month = 1,
      sixMonths = 6,
      year = 12
    }

    switch (ev.detail.value) {
      case 'week':
        days = 7;
        break;
      case 'month':
        months = Months.month;
        break;
      case 'sixMonths':
        months = Months.sixMonths;
        break;
      case 'year':
        months = Months.year;
        break;
      default:
        break;
    }
    this.createChart(days, months);
  }
}
