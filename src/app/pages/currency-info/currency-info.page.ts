import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatsService } from 'src/app/services/stats/stats.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { currencies } from 'src/app/common/currencies';
import { AlertController } from '@ionic/angular';
import { HistoricalData } from '../../interfaces/historical-data';

@Component({
  selector: 'app-currency-info',
  templateUrl: './currency-info.page.html',
  styleUrls: ['./currency-info.page.scss'],
})
export class CurrencyInfoPage implements OnInit {

  currency: string;
  base: string;
  currencies = [...currencies];
  histData: HistoricalData;

  @ViewChild('canvas', {static: true}) canvas: ElementRef;
  constructor(
    private activatedRouter: ActivatedRoute,
    private alertController: AlertController,
    private stats: StatsService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
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
      this.createChart();
    });
  }

  async createChart() {
    this.base = await this.storage.getBaseCurrency();

    this.stats.generateChart(this.canvas, this.currency, this.base)
    .then(data => {
      this.histData = data;
    })
    .catch(err => {
      console.log(err);
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
      message: 'Sorry, we couldn\'t find anything about that currency.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
