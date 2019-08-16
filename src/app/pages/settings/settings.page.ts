import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { currencies } from '../../common/currencies';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  defaultCurrency: string;
  currencies = [...currencies];

  constructor(private storage: StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.getBaseCurrency().then(cur => {
      this.defaultCurrency = cur;
    });
  }

  changeBaseCurrency() {
    this.storage.setBaseCurrency(this.defaultCurrency);
  }

}
