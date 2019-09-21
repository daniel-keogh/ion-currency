import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter-fab',
  template: `<ion-fab vertical="bottom" horizontal="end" class="ion-padding">
              <ion-fab-button routerLink="/converter" color="tertiary">
                <ion-icon name="calculator"></ion-icon>
              </ion-fab-button>
             </ion-fab>`
})
export class ConverterFabComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
