import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesModule } from '../../framework/componentes/componentes.module';
import { IonicModule } from '@ionic/angular';

import { PrivateComponent } from './private.component';


@NgModule({
  declarations: [
    PrivateComponent,
  ],
  imports: [
    ComponentesModule,
    IonicModule,
    CommonModule,
  ],
  providers: [
  ],
})
export class PrivateModule { }
