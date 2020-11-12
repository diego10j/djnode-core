import { environment } from '../../../environments/environment.prod';
import { Injectable, NgZone } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get rol(): string {
    return this.usuario.rol;
  }

  get uid(): string {
    return this.usuario.uid || '';
  }





}
