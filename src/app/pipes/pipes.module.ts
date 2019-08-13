import { NgModule } from '@angular/core';

import { CurrencyNamePipe } from './currency-name/currency-name.pipe';
import { FilterCurrencyPipe } from './filter-currency/filter-currency.pipe';

@NgModule({
    imports: [
    ],
    declarations: [
        CurrencyNamePipe,
        FilterCurrencyPipe
    ],
    exports: [
        CurrencyNamePipe,
        FilterCurrencyPipe
    ]
})
export class PipesModule {}
