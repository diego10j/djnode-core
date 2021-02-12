import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { ComponentesModule } from '@djnode/componentes/componentes.module';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import { PipesModule } from '@djnode/pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    ComponentesModule,
    FileUploadModule,
    InputTextModule,
    TabViewModule,
    PipesModule,
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
