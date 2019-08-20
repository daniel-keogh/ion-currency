import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { SettingsPopoverComponent } from './settings-popover/settings-popover.component';
import { ConverterFabComponent } from './converter-fab/converter-fab.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule
    ],
    declarations: [
        MenuComponent,
        SettingsPopoverComponent,
        ConverterFabComponent
    ],
    exports: [
        MenuComponent,
        SettingsPopoverComponent,
        ConverterFabComponent
    ]
})
export class ComponentsModule {}
