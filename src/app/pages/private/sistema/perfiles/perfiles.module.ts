import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { PerfilesPage } from './perfiles.page';
import { ComponentesModule } from '@djnode/componentes/componentes.module';
import { PerfilesPageRoutingModule } from './perfiles-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilesPageRoutingModule,
    ComponentesModule,
  ],
  declarations: [PerfilesPage]
})
export class PerfilesPageModule {}
