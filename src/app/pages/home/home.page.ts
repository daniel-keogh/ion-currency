import { Component, OnInit, ViewChild } from '@angular/core';
import { RatesService } from '../../services/rates/rates.service';
import { CountriesService } from '../../services/countries/countries.service';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  latest: any = [];
  currencies: string[] = [];
  defaultCurrency: string;
  isSearchbarOpen = false;

  @ViewChild(IonSearchbar, {static: false}) searchbar: IonSearchbar;
  @ViewChild(MenuComponent, {static: false}) menu: MenuComponent;
  constructor(
    private rates: RatesService,
    private countries: CountriesService,
    private storage: StorageService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.getBaseCurrency().then(cur => {
      this.defaultCurrency = cur;
    }).then(() => {
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

    if (this.menu.isOpen()) {
      this.menu.closeMenu();
    }
  }

  getLatestRates() {
    this.rates.latest(this.defaultCurrency).subscribe(data => {
      this.latest = data;
    }, (err) => {
      console.log(err);
      this.presentErrorToast(err);
    }, () => {
      this.currencies = [...Object.keys(this.latest.rates)].sort();
    });
  }

  getFlag(currencyCode: string) {
    return this.countries.getFlagUrl(currencyCode);
  }

  async presentErrorToast(err: Error) {
    const toast = await this.toastController.create({
      header: 'Failed to get currency rates',
      message: err.name,
      duration: 3000,
      buttons: [{text: 'OK'}]
    });
    toast.present();
  }
}
