import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { currencies } from '../../common/currencies';
import { RatesService } from 'src/app/services/rates/rates.service';
import { PopoverController, IonInput } from '@ionic/angular';
import { SettingsPopoverComponent } from 'src/app/components/settings-popover/settings-popover.component';

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

  @ViewChildren(IonInput) inputs: QueryList<IonInput>;
  constructor(private storage: StorageService, private rates: RatesService, private popoverController: PopoverController) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.storage.getBaseCurrency().then(cur => {
      this.baseCur = cur;
    });
    await this.storage.getConvertedCurrency().then(cur => {
      this.convertTo = cur;
    });

    this.rates.convert(this.baseCur, this.convertTo).subscribe((data: any) => {
      this.baseToConv = data.rates[this.convertTo];
      this.date = data.date;
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLeave() {
    this.inputs.forEach(item => item.value = null);
  }

  baseChanged(val: any): any {
    return (this.baseToConv * (+val)).toFixed(4);
  }

  convertChanged(val: any): any {
    return ((1 / this.baseToConv) * (+val)).toFixed(4);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SettingsPopoverComponent,
      event: ev,
      translucent: true,
      showBackdrop: false
    });
    return await popover.present();
  }
}
