import { Pipe, PipeTransform } from '@angular/core';
import { Currencies } from './currencies';

@Pipe({
  name: 'currencyName'
})
export class CurrencyNamePipe implements PipeTransform {

  transform(currencyCode: any): any {
    return Currencies.find(c => currencyCode === c.code).name;
  }
}
