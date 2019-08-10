import { Component, OnInit } from '@angular/core';
import { RatesService } from '../services/rates/rates.service';
import { CountriesService } from '../services/countries/countries.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  latest: any = [];

  constructor(private rates: RatesService, private countries: CountriesService) {}

  ngOnInit() {
    this.getLatestRates();
  }

  getLatestRates() {
    this.rates.latest().subscribe(data => {
      this.latest = data;
    });
  }

  getFlag(currencyCode: string) {
    return this.countries.getFlagUrl(currencyCode);
  }

  viewCurInfo(currencyCode: string) {
    // TODO navigate to info page
    console.log(currencyCode);
  }
}
