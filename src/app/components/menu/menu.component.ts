import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MenuController, IonButton } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {}

  isOpen() {
    return this.menu.isOpen();
  }

  openMenu() {
    this.menu.enable(true, 'side');
    this.menu.open('side');
  }

  closeMenu() {
    this.menu.close('side');
  }
}
