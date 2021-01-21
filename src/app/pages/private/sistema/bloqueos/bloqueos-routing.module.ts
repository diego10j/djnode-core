import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloqueosPage } from './bloqueos.page';

const routes: Routes = [
  {
    path: '',
    component: BloqueosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloqueosPageRoutingModule {}
