import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresaPageRoutingModule } from './empresa-routing.module';

import { EmpresaPage } from './empresa.page';
import { ComponentesModule } from '@djnode/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    EmpresaPageRoutingModule
  ],
  declarations: [EmpresaPage]
})
export class EmpresaPageModule {}
