import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RatesService } from '../../services/rates/rates.service';
import { CountriesService } from '../../services/countries/countries.service';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  latest: any = [];
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
        this.currencies = [...Object.keys(this.latest.rates)].sort();
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
