import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaAuditoriaPageRoutingModule } from './consulta-auditoria-routing.module';

import { ConsultaAuditoriaPage } from './consulta-auditoria.page';
import { ComponentesModule } from '../../../../framework/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaAuditoriaPageRoutingModule,
    ComponentesModule,
  ],
  declarations: [ConsultaAuditoriaPage]
})
export class ConsultaAuditoriaPageModule {}
