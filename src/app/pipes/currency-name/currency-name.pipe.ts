import { Pipe, PipeTransform } from '@angular/core';
import { currencies } from './currencies';

@Pipe({
  name: 'currencyName'
})
export class CurrencyNamePipe implements PipeTransform {

  transform(currencyCode: string): string {
    return currencies.find(c => currencyCode === c.code).name;
  }
}
