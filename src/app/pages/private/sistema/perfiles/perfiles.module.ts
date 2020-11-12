import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilesPageRoutingModule } from './perfiles-routing.module';

import { PerfilesPage } from './perfiles.page';
import { ComponentesModule } from '../../../../framework/componentes/componentes.module';
import {TabViewModule} from 'primeng/tabview';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilesPageRoutingModule,
    ComponentesModule,
    TabViewModule
  ],
  declarations: [PerfilesPage]
})
export class PerfilesPageModule {}
