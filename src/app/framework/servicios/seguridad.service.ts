import { environment } from './../../../environments/environment';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  public usuario: Usuario;

  toggled = false;
  _hasBackgroundImage = true;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  login(formData: any) {
    const url = `${environment.API_REST}/api/seguridad/login`;
    return this.http.post(url, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp);
        })
      );
  }

  guardarLocalStorage(resp: any) {
    localStorage.setItem('token', resp.token);
    localStorage.setItem('menu', JSON.stringify(resp.datos.menu));
    localStorage.setItem('ide_usua', resp.datos.ide_usua);
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('ide_usua');
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }


  validarToken(): Observable<boolean> {
    return this.http.get(`${environment.API_REST}/api/seguridad/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        this.usuario = new Usuario(resp.datos.nombre, resp.datos.email, resp.datos.avatar, false, resp.datos.rol, resp.datos.ide_usua);
        this.guardarLocalStorage(resp);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  registrar(formData: any) {
    const campos = {
      identificacion: formData.identificacion,
      nombre: formData.nombre,
      email: formData.email,
      clave: formData.clave,
    };
    return this.http.post(`${environment.API_REST}/api/seguridad/registrar`, campos);
  }


  isAccesoPantalla(ruta: string): boolean {
    ruta = ruta.substring(ruta.lastIndexOf('/') + 1, ruta.length);
    if(ruta==='dashboard'){
      return true;
    }
    let menus = JSON.parse(localStorage.getItem('menu')) || [];
    //Obtiene menus solo que tienen submenus
    menus = menus.filter(menu => menu.submenus !== undefined);
    for (let m of menus) {
      let subm = m.submenus;
      let opcion = subm.find(opcion => opcion.url === ruta);
      if (opcion) {
        return true;
      }
    }
    return false;
  }

}
