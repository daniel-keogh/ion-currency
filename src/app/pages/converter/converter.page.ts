import { Router } from '@angular/router';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { PopoverController, IonInput, ToastController } from '@ionic/angular';
import { currencies } from '../../common/currencies';
import { PopoverComponent } from './../../components/popover/popover.component';
import { StorageService } from './../../services/storage/storage.service';
import { RatesService } from './../../services/rates/rates.service';

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
    private router: Router,
    private popoverController: PopoverController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    Promise.all([
      this.storage.getBaseCurrency(),
      this.storage.getConvertedCurrency(),
    ]).then((curCodes) => {
      [this.baseCur, this.convertTo] = curCodes;

      this.rates.convert(this.baseCur, this.convertTo).subscribe(
        (data) => {
          this.baseToConv = data.rates[this.convertTo];
          this.date = data.date;
        },
        (err) => {
          this.presentErrorToast(err);
        }
      );
    });
  }

  ionViewDidLeave() {
    this.inputs.forEach((item) => (item.value = null));
  }

  baseChanged(val: any): any {
    return (this.baseToConv * +val).toFixed(4);
  }

  convertChanged(val: any): any {
    return ((1 / this.baseToConv) * +val).toFixed(4);
  }

  presentPopover(event: any) {
    this.popoverController
      .create({
        component: PopoverComponent,
        event,
        translucent: true,
        componentProps: { items: ['Settings'] },
      })
      .then((popover) => {
        popover.present();
        return popover.onWillDismiss();
      })
      .then((result) => {
        if (result.data === 'Settings') {
          this.router.navigate([`/settings`]);
        }
      });
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
