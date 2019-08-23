import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter-fab',
  template: `<ion-fab vertical="bottom" horizontal="end" slot="fixed" class="ion-padding">
              <ion-fab-button routerLink="/converter">
                <ion-icon name="calculator"></ion-icon>
              </ion-fab-button>
             </ion-fab>`
})
export class ConverterFabComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
