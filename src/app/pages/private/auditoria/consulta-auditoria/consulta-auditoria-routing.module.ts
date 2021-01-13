import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaAuditoriaPage } from './consulta-auditoria.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaAuditoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaAuditoriaPageRoutingModule {}
