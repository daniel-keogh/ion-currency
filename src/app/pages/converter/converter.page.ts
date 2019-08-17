import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { currencies } from '../../common/currencies';
import { RatesService } from 'src/app/services/rates/rates.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})
export class ConverterPage implements OnInit {

  baseCur: string;
  convertTo: string;
  currencies = [...currencies];
  baseToConv: any = [];
  date: string;

  constructor(private storage: StorageService, private rates: RatesService) { }

  ngOnInit() {
    this.storage.getBaseCurrency().then(cur => {
      this.baseCur = cur;
    });
    this.storage.getConvertedCurrency().then(cur => {
      this.convertTo = cur;
    });
  }

  ionViewDidEnter() {
    this.rates.convert(this.baseCur, this.convertTo).subscribe((data: any) => {
      this.baseToConv = data.rates[this.convertTo];
      this.date = data.date;
    }, (err) => {
      console.log(err);
    });
  }

  baseChanged(val: any): any {
    return (this.baseToConv * (+val)).toFixed(4);
  }

  convertChanged(val: any): any {
    return ((1 / this.baseToConv) * (+val)).toFixed(4);
  }
}
