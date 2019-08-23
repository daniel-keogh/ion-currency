import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {}

  isOpen(): Promise<boolean> {
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
