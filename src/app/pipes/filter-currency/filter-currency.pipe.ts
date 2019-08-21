import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCurrency'
})
export class FilterCurrencyPipe implements PipeTransform {

  transform(rates: any, search: string): any {
    if (!search) {
      return rates;
    }

    const filtered: any = [];
    for (const rate in rates) {
      if (rate.toUpperCase().includes(search.toUpperCase())) {
        filtered[rate] = rates[rate];
      }
    }
    return filtered;
  }
}
