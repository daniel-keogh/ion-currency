import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConverterPage } from './converter.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { SettingsPopoverComponent } from 'src/app/components/settings-popover/settings-popover.component';

const routes: Routes = [
  {
    path: '',
    component: ConverterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [SettingsPopoverComponent],
  declarations: [ConverterPage]
})
export class ConverterPageModule {}
