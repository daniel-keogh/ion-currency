import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { currencies } from '../../common/currencies';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  defaultBase: string;
  defaultConverted: string;
  currencies = [...currencies];

  constructor(private storage: StorageService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    Promise.all([
      this.storage.getBaseCurrency(),
      this.storage.getConvertedCurrency(),
    ]).then((res) => {
      [this.defaultBase, this.defaultConverted] = res;
    });
  }

  changeBaseCurrency() {
    this.storage.setBaseCurrency(this.defaultBase);
  }

  changeConvertedCurrency() {
    this.storage.setConvertedCurrency(this.defaultConverted);
  }
}
