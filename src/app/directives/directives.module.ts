import { NgModule } from '@angular/core';

import { SearchLimitDirective } from './limit/limit.directive';

@NgModule({
    imports: [
    ],
    declarations: [
        SearchLimitDirective
    ],
    exports: [
        SearchLimitDirective
    ]
})
export class DirectivesModule {}
