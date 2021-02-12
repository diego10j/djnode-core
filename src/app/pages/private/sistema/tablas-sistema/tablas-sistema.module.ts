import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TablasSistemaPageRoutingModule } from './tablas-sistema-routing.module';
import { TablasSistemaPage } from './tablas-sistema.page';
import { ComponentesModule } from '@djnode/componentes/componentes.module';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    TabViewModule,
    TablasSistemaPageRoutingModule
  ],
  declarations: [TablasSistemaPage]
})
export class TablasSistemaPageModule {}
