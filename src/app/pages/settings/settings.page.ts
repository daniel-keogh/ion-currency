import { Component, OnInit } from '@angular/core';
import { currencies } from '../../common/currencies';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  defaultCurrency = 'EUR';
  currencies = [...currencies];

  constructor() { }

  ngOnInit() {
  }

  changeDefaultBase() {
    // TODO
  }

}
