import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParametrosPageRoutingModule } from './parametros-routing.module';

import { ParametrosPage } from './parametros.page';
import { ComponentesModule } from '@djnode/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParametrosPageRoutingModule,
    ComponentesModule
  ],
  declarations: [ParametrosPage]
})
export class ParametrosPageModule {}
