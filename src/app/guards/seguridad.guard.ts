import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, Params } from '@angular/router';
import { SeguridadService } from '../framework/servicios/seguridad.service';

@Injectable({
    providedIn: 'root'
})
export class SeguridadGuard implements CanActivate {

    constructor(private segurirdad: SeguridadService,
        private router: Router) { }
//Valida que tenga acceso el perfil a la pantalla
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.segurirdad.isAccesoPantalla(state.url)) {
            return true;
        } else {
            this.router.navigateByUrl('/private/dashboard');
            return true;
        }
    }

}
