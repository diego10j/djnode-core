import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Condicion from '../interfaces/condicion';




@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  constructor(private http: HttpClient) { }

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

  /**
   * Consulta ws consultarTabla
   * @param nombreTabla 
   * @param filas 
   * @param pagina 
   */
  consultarTabla(nombreTabla: string, campoOrden: string, condiciones:Condicion[],  filas: number, pagina: number) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campoOrden = campoOrden.toLowerCase();//pg estandar para tablas
    const campos = {
      nombreTabla,
      campoOrden,
      condiciones,
      filas,
      pagina,
    };
    const url = `${environment.API_REST}/api/sistema/consultarTabla`;
    return this.http.post(url, campos, this.headers);
  }

  getColumnasTabla(nombreTabla: string) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    const campos = {
      nombreTabla
    };
    const url = `${environment.API_REST}/api/sistema/getColumnasTabla`;
    return this.http.post(url, campos, this.headers);
  }

  getComboTabla(nombreTabla: string, campoPrimario: string, campoNombre: string, condicion?: string) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campoPrimario = campoPrimario.toLowerCase();//pg estandar para tablas
    campoNombre = campoNombre.toLowerCase();//pg estandar para tablas
    const campos = {
      nombreTabla,
      campoPrimario,
      campoNombre,
      condicion
    };
    const url = `${environment.API_REST}/api/sistema/getComboTabla`;
    return this.http.post(url, campos, this.headers);
  }

   getComboSql(sql: string) {
    const campos = {
      sql
    };
    const url = `${environment.API_REST}/api/sistema/getComboTabla`;
    return this.http.post(url, campos, this.headers);
  }


  isEliminar(nombreTabla: string, campoPrimario: string, valorCampoPrimario: any) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campoPrimario = campoPrimario.toLowerCase();//pg estandar para tablas
    const campos = {
      nombreTabla,
      campoPrimario,
      valorCampoPrimario
    };
    const url = `${environment.API_REST}/api/sistema/isEliminar`;
    return this.http.post(url, campos, this.headers);
  }

  ejecutarListaSQL(listaSQL: any) {
    const campos = {
      listaSQL
    };
    const url = `${environment.API_REST}/api/sistema/ejecutarListaSQL`;
    return this.http.post(url, campos, this.headers);
  }


  isUnico(nombreTabla: string, campo: string, valorCampo: any) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campo = campo.toLowerCase();//pg estandar para tablas
    const campos = {
      nombreTabla,
      campo,
      valorCampo
    };
    const url = `${environment.API_REST}/api/sistema/isUnico`;
    return this.http.post(url, campos, this.headers);
  }


  getMaximo(nombreTabla: string, campoPrimario: string, numeroFilas: number) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campoPrimario = campoPrimario.toLowerCase();//pg estandar para tablas
    const campos = {
      nombreTabla,
      campoPrimario,
      numeroFilas
    };
    const url = `${environment.API_REST}/api/sistema/getMaximo`;
    return this.http.post(url, campos, this.headers);
  }

  consultarArbol(nombreTabla: string,  campoPrimario: string, campoNombre: string,campoPadre: string,campoOrden: string, condiciones:Condicion[]) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campoPrimario = campoPrimario.toLowerCase();//pg estandar para tablas
    campoNombre = campoNombre.toLowerCase();//pg estandar para tablas
    campoOrden = campoOrden.toLowerCase();//pg estandar para tablas
    const campos = {
      nombreTabla,
      campoOrden,
      condiciones,
      campoPrimario,
      campoNombre,
      campoPadre,
    };
    const url = `${environment.API_REST}/api/sistema/consultarArbol`;
    return this.http.post(url, campos, this.headers);
  }


}
