import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[searchLimit]'
})
export class SearchLimitDirective {

  @Input('searchLimit') limit: number;

  constructor() { }

  @HostListener('keypress', ['$event'])
  onKeypress(e: any) {
    if (e.target.value.length === this.limit) {
      e.preventDefault();
    }
  }
}
