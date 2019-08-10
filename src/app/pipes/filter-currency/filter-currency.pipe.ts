import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCurrency'
})
export class FilterCurrencyPipe implements PipeTransform {

  transform(latest: any, ...args: any[]): any {
    if (!args[0]) {
      return latest;
    }

    const filtered: any = [];
    for (const rate in latest) {
      if (rate.toLowerCase().includes(args[0].toLowerCase())) {
        filtered[rate] = latest[rate];
      }
    }
    return filtered;
  }

}
