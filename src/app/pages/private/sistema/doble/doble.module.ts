import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DoblePage } from './doble.page';
import { ComponentesModule } from '@djnode/componentes/componentes.module';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';


const routes: Routes = [
  {
    path: '',
    component: DoblePage
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
  declarations: [DoblePage]
})
export class DoblePageModule { }
