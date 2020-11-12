import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SeguridadService } from '../framework/servicios/seguridad.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private seguridad: SeguridadService,
        private router: Router) { }

    canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        return this.seguridad.validarToken()
            .pipe(
                tap(estaAutenticado => {
                    if (!estaAutenticado) {
                        this.router.navigateByUrl('/login');
                    }
                })
            );
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {

        return this.seguridad.validarToken()
            .pipe(
                tap(estaAutenticado => {
                    if (!estaAutenticado) {
                        this.router.navigateByUrl('/login');
                    }
                })
            );
    }

}
