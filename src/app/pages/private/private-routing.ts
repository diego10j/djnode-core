import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateComponent } from './private.component';
import { AuthGuard } from '../../guards/auth.guard';



const routes: Routes = [
    { 
        path: 'private', 
        component: PrivateComponent,
       canActivate: [ AuthGuard ],
       canLoad: [ AuthGuard ],
        loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
    },
];

@NgModule({
    declarations: [],
    imports: [
        [RouterModule.forChild(routes)]
    ],
    exports: [
        RouterModule
    ]
})
export class PrivateRoutingModule { }