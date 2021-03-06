import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrivateRoutingModule } from './pages/private/private-routing';
import { PublicRoutingModule } from './pages/public/public-routing.module';
import { ErrorComponent } from './pages/public/error/error.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];


@NgModule({
  imports: [
    PrivateRoutingModule,
    PublicRoutingModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
