import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesPageRoutingModule } from './opciones-routing.module';

import { OpcionesPage } from './opciones.page';
import { ComponentesModule } from '../../../../framework/componentes/componentes.module';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesPageRoutingModule,
    ComponentesModule,
    TabViewModule
  ],
  declarations: [OpcionesPage]
})
export class OpcionesPageModule {}
