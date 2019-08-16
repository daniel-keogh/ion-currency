import { Pipe, PipeTransform } from '@angular/core';
import { currencies } from '../../common/currencies';

@Pipe({
  name: 'currencyName'
})
export class CurrencyNamePipe implements PipeTransform {

  transform(currencyCode: string): string {
    const currency = currencies.find(c => currencyCode === c.code);
    return currency ? currency.name : undefined;
  }
}
