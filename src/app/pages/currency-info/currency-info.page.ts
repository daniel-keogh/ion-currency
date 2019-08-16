import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-currency-info',
  templateUrl: './currency-info.page.html',
  styleUrls: ['./currency-info.page.scss'],
})
export class CurrencyInfoPage implements OnInit {

  currency: string;
  info: any = [];

  constructor(private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      if (paramMap.get('currency-code')) {
        // TODO make sure currency-code is valid
        // this.router.navigate(['/home']);
      }
      this.currency = paramMap.get('currency-code');
    });
  }
}
