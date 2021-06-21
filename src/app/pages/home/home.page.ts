import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { currencies } from './../../common/currencies';
import { Rates } from './../../interfaces/rates';
import { RatesService } from '../../services/rates/rates.service';
import { CountriesService } from '../../services/countries/countries.service';
import { StorageService } from '../../services/storage/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  latest: Rates = {};
  currencies: string[] = [];
  defaultCurrency: string;
  isSearchbarOpen = false;

  latestSub: Subscription;

  @ViewChild(IonSearchbar, { static: false }) searchbar: IonSearchbar;
  constructor(
    private rates: RatesService,
    private countries: CountriesService,
    private storage: StorageService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.latestSub?.unsubscribe();
  }

  ionViewWillEnter() {
    this.storage
      .getBaseCurrency()
      .then((cur) => {
        this.defaultCurrency = cur;
      })
      .then(() => {
        this.getLatestRates();
      });
  }

  ionViewDidLeave() {
    if (this.isSearchbarOpen) {
      this.isSearchbarOpen = false;
      if (this.searchbar.value) {
        this.searchbar.value = null;
      }
    }
  }

  getLatestRates(ev?: any) {
    this.latestSub = this.rates.latest(this.defaultCurrency).subscribe(
      (data) => {
        this.latest = data;
      },
      (err) => {
        this.presentErrorToast(err);
        ev?.target.complete();
      },
      () => {
        const keys = Object.keys(this.latest.rates);

        this.currencies = keys.sort().filter(code => !!currencies.find(c => c.code === code));

        keys.forEach(k => {
          if (this.currencies.indexOf(k) === -1) {
            delete this.latest.rates[k];
          }
        })

        ev?.target.complete();
      }
    );
  }

  getFlag(currencyCode: string): string {
    return this.countries.getFlagUrl(currencyCode);
  }

  async presentErrorToast(err: Error) {
    const toast = await this.toastController.create({
      header: 'Failed to get currency rates',
      message: err.name,
      duration: 3000,
      buttons: [{ text: 'OK' }],
    });
    toast.present();
  }
}
