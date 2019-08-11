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
  currencies: string[] = [];
  defaultCurrency: string = 'EUR';

  constructor(private rates: RatesService, private countries: CountriesService) {}

  ngOnInit() {
    this.getLatestRates();
  }

  getLatestRates() {
    console.log(this.defaultCurrency)
    this.rates.latest(this.defaultCurrency).subscribe(data => {
      this.latest = data;
    }, (err) => {
      console.log(err);
    }, () => {
      this.currencies = [...Object.keys(this.latest.rates)].sort();
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
