import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePerfilPage } from './detalle-perfil.page';
import { ComponentesModule } from '../../../../../framework/componentes/componentes.module';
import { TabViewModule } from 'primeng/tabview';
import { DetallePerfilPageRoutingModule } from './detalle-perfil-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePerfilPageRoutingModule,
    ComponentesModule,
    TabViewModule,
  ],
  declarations: [DetallePerfilPage]
})
export class DetallePerfilPageModule {}
