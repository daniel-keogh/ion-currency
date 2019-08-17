import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConverterPage } from './converter.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

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
    RouterModule.forChild(routes)
  ],
  declarations: [ConverterPage]
})
export class ConverterPageModule {}
