import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SimplePage } from './simple.page';
import { ToolbarModule } from 'primeng/toolbar';
import { ComponentesModule } from '../../../../framework/componentes/componentes.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SimplePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    ToolbarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SimplePage]
})
export class SimplePageModule { }
