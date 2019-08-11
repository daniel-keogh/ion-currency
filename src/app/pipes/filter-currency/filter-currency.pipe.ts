import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyNamePipe } from '../currency-name/currency-name.pipe';

@Pipe({
  name: 'filterCurrency'
})
export class FilterCurrencyPipe implements PipeTransform {

  transform(rates: any, ...args: any[]): any {
    if (!args[0]) {
      return rates;
    }

    const filtered: any = [];
    for (const rate in rates) {
      if (rate.toLowerCase().includes(args[0].toLowerCase())) {
        filtered[rate] = rates[rate];
      }
    }
    return filtered;
  }
}
