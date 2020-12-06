import { MenuItem } from 'primeng/api';
import { environment } from './../../../environments/environment';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { of, Observable } from 'rxjs';
import { ServicioBase } from '../clases/servicio-base';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService extends ServicioBase {

  public usuario: Usuario;

  toggled = false;
  _hasBackgroundImage = true;

  constructor(public http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    super(http);
    this.llamarServicioIpPublic();
  }


  login(formData: any, dispositivo: string) {
    formData['ip'] = localStorage.getItem('ip') || '127.0.0.1';
    formData['dispositivo'] = dispositivo;
    const url = `${environment.API_REST}/api/seguridad/login`;
    return this.http.post(url, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp);
          localStorage.setItem('ultimaFecha', resp.ultimaFecha);
        })
      );
  }

  guardarLocalStorage(resp: any) {
    localStorage.setItem('token', resp.token);
    localStorage.setItem('menu', JSON.stringify(resp.datos.menu));
    localStorage.setItem('ide_usua', resp.datos.ide_usua);

  }


  logout(dispositivo: string) {
    this.llamarServicioLogout(dispositivo);
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('ide_usua');
    localStorage.removeItem('ip');
    localStorage.removeItem('ultimaFecha');
    localStorage.removeItem('identificacion');
    this.llamarServicioIpPublic();

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
    const body = {
      identificacion: formData.identificacion,
      nombre: formData.nombre,
      email: formData.email,
      clave: formData.clave,
    };
    return this.llamarServicioPost('api/seguridad/registrar', body);
  }


  isAccesoPantalla(ruta: string): boolean {
    ruta = ruta.substring(ruta.lastIndexOf('/') + 1, ruta.length);
    if (ruta === 'dashboard') {
      return true;
    }
    const menus = JSON.parse(localStorage.getItem('menu')) || [];
    //Busqueda recursiva
    for (const opciActual of menus) {
      const encontro = this.busquedaRecursiva(opciActual, ruta);
      if (encontro === true) {
        return true;
      }
    }
    return false;
  }

  private busquedaRecursiva(opcion: any, ruta: string): boolean {
    if (opcion.ruta === ruta) {
      return true;
    }
    if (opcion.items) {
      for (const opciActual of opcion.items) {
        const encontro = this.busquedaRecursiva(opciActual, ruta);
        if (encontro === true) {
          return true;
        }
      }
    }
    return false;
  }





  private llamarServicioIpPublic() {
    if (this.isDefined(localStorage.getItem('ip')) === false) {
      //const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${environment.IP_API}`;
      const url = 'https://api.ipify.org/?format=json';
      this.http.get(url).subscribe((res: any) => {
        localStorage.setItem('ip', res.ip);
      });
    }
  }


  auditoriaAccesoPantalla(ide_opci: string, dispositivo: string) {
    const body = {
      ide_opci,
      ide_usua: localStorage.getItem('ide_usua'),
      ip: localStorage.getItem('ip') || '127.0.0.1',
      dispositivo
    };
    this.llamarServicioPost('api/seguridad/auditoriaAccesoPantalla', body).subscribe((res: any) => {
    });
  }

  private llamarServicioLogout(dispositivo: string) {
    const body = {
      ide_usua: localStorage.getItem('ide_usua'),
      ip: localStorage.getItem('ip') || '127.0.0.1',
      dispositivo
    };
    this.llamarServicioPost('api/seguridad/logout', body).subscribe((res: any) => {
    });
  }



  private isDefined($variable: any): boolean {
    return typeof $variable !== 'undefined' && $variable !== null;
  }


}
