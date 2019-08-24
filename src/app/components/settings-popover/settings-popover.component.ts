import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-settings-popover',
  template: `<ion-item button class="settings-popover" lines="none" (click)="onClick()" routerLink="/settings">Settings</ion-item>`
})
export class SettingsPopoverComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  onClick() {
    this.popoverController.dismiss();
  }
}
