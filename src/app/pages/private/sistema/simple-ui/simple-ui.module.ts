import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimpleUiPageRoutingModule } from './simple-ui-routing.module';

import { SimpleUiPage } from './simple-ui.page';
import { ComponentesModule } from '@djnode/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimpleUiPageRoutingModule,
    ComponentesModule
  ],
  declarations: [SimpleUiPage]
})
export class SimpleUiPageModule {}
