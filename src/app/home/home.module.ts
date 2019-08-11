import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { FilterCurrencyPipe } from '../pipes/filter-currency/filter-currency.pipe';
import { CurrencyNamePipe } from '../pipes/currency-name/currency-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, FilterCurrencyPipe, CurrencyNamePipe]
})
export class HomePageModule {}
