import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCurrency'
})
export class FilterCurrencyPipe implements PipeTransform {

  transform(rates: any, ...args: any[]): any {
    if (!args[0])
      return rates;

    const filtered: object = {};
    for (const rate in rates) {
      if (rate.toUpperCase().includes(args[0].toUpperCase()))
        filtered[rate] = rates[rate];
    }
    return filtered;
  }
}
