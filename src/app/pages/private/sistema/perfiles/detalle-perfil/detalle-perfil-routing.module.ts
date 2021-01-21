import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePerfilPage } from './detalle-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePerfilPageRoutingModule {}
