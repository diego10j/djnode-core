import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SeguridadGuard } from '../../guards/seguridad.guard';

const childRoutes: Routes = [
  {
    path: 'dashboard', canActivate: [SeguridadGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'simple/:id', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/simple/simple.module').then(m => m.SimplePageModule)
  },
  {
    path: 'simple-ui/:id',
    loadChildren: () => import('./sistema/simple-ui/simple-ui.module').then( m => m.SimpleUiPageModule)
  },
  {
    path: 'doble/:id', canActivate: [SeguridadGuard],
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
    path: 'detalle-perfil/:id',
    loadChildren: () => import('./sistema/perfiles/detalle-perfil/detalle-perfil.module').then(m => m.DetallePerfilPageModule)
  },
  {
    path: 'detalle-perfil',
    loadChildren: () => import('./sistema/perfiles/detalle-perfil/detalle-perfil.module').then(m => m.DetallePerfilPageModule)
  },
  {
    path: 'sucursales', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/sucursales/sucursales.module').then(m => m.SucursalesPageModule)
  },
  {
    path: 'tablas-sistema', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/tablas-sistema/tablas-sistema.module').then(m => m.TablasSistemaPageModule)
  },

  {
    path: 'consulta-auditoria', canActivate: [SeguridadGuard],
    loadChildren: () => import('./auditoria/consulta-auditoria/consulta-auditoria.module').then(m => m.ConsultaAuditoriaPageModule)
  },

  {
    path: 'usuarios', canActivate: [SeguridadGuard],
    loadChildren: () => import('./sistema/usuarios/usuarios.module').then(m => m.UsuariosPageModule)
  },
  {
    path: 'bloqueos',
    loadChildren: () => import('./sistema/bloqueos/bloqueos.module').then(m => m.BloqueosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./usuario/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
]
@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }