import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

    constructor() { }



    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const url = `${environment.API_REST}`;

        if (req.url.startsWith(url) === false) {
            return next.handle(req);
        }


        const headers = new HttpHeaders({
            'x-token': localStorage.getItem('token') || ''
        });

        const body = {
            ide_empr: localStorage.getItem('ide_empr') || null,
            ide_sucu: localStorage.getItem('ide_sucu') || null,
            ide_usua: localStorage.getItem('ide_usua') || null,
            usuario: localStorage.getItem('identificacion') || null
        };

        const reqClone = req.clone({
            headers,
            body: { ...req.body, ...body }
        });

        return next.handle(reqClone).pipe(
            catchError(this.manejarError)
        );


    }


    manejarError(error: HttpErrorResponse) {

        let x = {
            status: error.status,
            statusText: error.statusText,
            ok: error.ok,
            name: error.name,
            message: error.message,
        };
        if (error.error) {
            x['error'] = error.error;
        }
        else {
            x['error']['mensaje'] = error.message
        }

        if (navigator.onLine === false) {
            x['error']['mensaje'] = 'En este momento no tienes conexión :-(';

        }

        return throwError(x);
    }



}
