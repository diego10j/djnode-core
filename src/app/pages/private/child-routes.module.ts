import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SeguridadGuard } from '../../guards/seguridad.guard';

const childRoutes: Routes = [
  {
    path: 'dashboard', canActivate: [SeguridadGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'simple', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/simple/simple.module').then(m => m.SimplePageModule)
  },
  {
    path: 'doble', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/doble/doble.module').then(m => m.DoblePageModule)
  },
  {
    path: 'empresa', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/empresa/empresa.module').then(m => m.EmpresaPageModule)
  },
  {
    path: 'opciones', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/opciones/opciones.module').then(m => m.OpcionesPageModule)
  },
  {
    path: 'perfiles', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/perfiles/perfiles.module').then(m => m.PerfilesPageModule)
  },
  {
    path: 'sucursales', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/sucursales/sucursales.module').then(m => m.SucursalesPageModule)
  },
  {
    path: 'tablas-sistema', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/tablas-sistema/tablas-sistema.module').then( m => m.TablasSistemaPageModule)
  },
  {
    path: 'usuarios', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },

  {
    path: 'perfil',
    loadChildren: () => import('./usuario/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
]
@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }