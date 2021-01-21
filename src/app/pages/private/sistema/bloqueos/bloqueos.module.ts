import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BloqueosPageRoutingModule } from './bloqueos-routing.module';

import { BloqueosPage } from './bloqueos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloqueosPageRoutingModule
  ],
  declarations: [BloqueosPage]
})
export class BloqueosPageModule {}
