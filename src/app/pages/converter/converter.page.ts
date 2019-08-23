import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { currencies } from '../../common/currencies';
import { RatesService } from 'src/app/services/rates/rates.service';
import { PopoverController, IonInput, ToastController } from '@ionic/angular';
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
  constructor(
    private storage: StorageService,
    private rates: RatesService,
    private popoverController: PopoverController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    Promise.all([
      this.storage.getBaseCurrency(),
      this.storage.getConvertedCurrency()
    ])
    .then(curCodes => {
      [this.baseCur, this.convertTo] = curCodes;

      this.rates.convert(this.baseCur, this.convertTo).subscribe(data => {
        this.baseToConv = data.rates[this.convertTo];
        this.date = data.date;
      }, (err) => {
        this.presentErrorToast(err);
      });
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
