import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SeguridadGuard } from '../../guards/seguridad.guard';

const childRoutes: Routes = [
  {
    path: 'dashboard',canActivate: [ SeguridadGuard ],
     component: DashboardComponent,
  },
  {
    path: 'simple',canActivate: [ SeguridadGuard ],
    loadChildren: () => import('./sistema/simple/simple.module').then(m => m.SimplePageModule)
  },
  {
    path: 'doble',canActivate: [ SeguridadGuard ],
    loadChildren: () => import('./sistema/doble/doble.module').then(m => m.DoblePageModule)
  },
  {
    path: 'empresa',canActivate: [ SeguridadGuard ],
    loadChildren: () => import('./sistema/empresa/empresa.module').then(m => m.EmpresaPageModule)
  },
  {
    path: 'opciones',canActivate: [ SeguridadGuard ],
    loadChildren: () => import('./sistema/opciones/opciones.module').then( m => m.OpcionesPageModule)
  },
  {
    path: 'perfiles',canActivate: [ SeguridadGuard ],
    loadChildren: () => import('./sistema/perfiles/perfiles.module').then( m => m.PerfilesPageModule)
  },
]
@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }