import { Injectable } from '@angular/core';
import Condicion from '../interfaces/condicion';
import Columna from '../clases/columna';
import Tabla from '../clases/tabla';
import { ServicioBase } from '../clases/servicio-base';




@Injectable({
  providedIn: 'root'
})
export class SistemaService extends ServicioBase {

  /**
   * Consulta ws consultarTabla
   * @param nombreTabla 
   * @param filas 
   * @param pagina 
   */
  consultarTabla(nombreTabla: string, campoOrden: string, condiciones: Condicion[], filas: number, pagina: number) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campoOrden = campoOrden.toLowerCase();//pg estandar para tablas
    const body = {
      nombreTabla,
      campoOrden,
      condiciones,
      filas,
      pagina,
    };
    return this.llamarServicioPost('api/sistema/consultarTabla', body);
  }

  /**
   * Llama al ws getColumnasTabla
   */
  getColumnasTabla(nombreTabla: string, ide_opci: string, numero_tabl: string) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    const body = {
      nombreTabla,
      ide_opci,
      numero_tabl
    };
    return this.llamarServicioPost('api/sistema/getColumnas', body);
  }

  getComboTabla(nombreTabla: string, campoPrimario: string, campoNombre: string, condicion?: string) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campoPrimario = campoPrimario.toLowerCase();//pg estandar para tablas
    campoNombre = campoNombre.toLowerCase();//pg estandar para tablas
    const body = {
      nombreTabla,
      campoPrimario,
      campoNombre,
      condicion
    };
    return this.llamarServicioPost('api/sistema/getCombo', body);
  }

  getComboSql(sql: string) {
    const body = {
      sql
    };
    return this.llamarServicioPost('api/sistema/getCombo', body);
  }


  isEliminar(nombreTabla: string, campoPrimario: string, valorCampoPrimario: any) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campoPrimario = campoPrimario.toLowerCase();//pg estandar para tablas
    const body = {
      nombreTabla,
      campoPrimario,
      valorCampoPrimario
    };
    return this.llamarServicioPost('api/sistema/isEliminar', body);
  }

  ejecutarListaSQL(listaSQL: any) {
    const body = {
      listaSQL
    };
    return this.llamarServicioPost('api/sistema/ejecutarLista', body);
  }


  isUnico(nombreTabla: string, campo: string, valorCampo: any) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campo = campo.toLowerCase();//pg estandar para tablas
    const body = {
      nombreTabla,
      campo,
      valorCampo
    };
    return this.llamarServicioPost('api/sistema/isUnico', body);
  }


  getMaximo(nombreTabla: string, campoPrimario: string, numeroFilas: number) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campoPrimario = campoPrimario.toLowerCase();//pg estandar para tablas
    const body = {
      nombreTabla,
      campoPrimario,
      numeroFilas
    };
    return this.llamarServicioPost('api/sistema/getMaximo', body);
  }

  consultarArbol(nombreTabla: string, campoPrimario: string, campoNombre: string, campoPadre:
    string, campoOrden: string, condiciones: Condicion[]) {
    nombreTabla = nombreTabla.toLowerCase();//pg estandar para tablas
    campoPrimario = campoPrimario.toLowerCase();//pg estandar para tablas
    campoNombre = campoNombre.toLowerCase();//pg estandar para tablas
    campoOrden = campoOrden.toLowerCase();//pg estandar para tablas
    const body = {
      nombreTabla,
      campoOrden,
      condiciones,
      campoPrimario,
      campoNombre,
      campoPadre,
    };
    return this.llamarServicioPost('api/sistema/consultarArbol', body);
  }

  configurarTabla(ide_opci: string, tabla: Tabla, columnas: Columna[]) {
    const tabConf = new Tabla();
    tabConf.numeroTabla = tabla.numeroTabla;
    tabConf.nombreTabla = tabla.nombreTabla;
    tabConf.campoPrimario = tabla.campoPrimario;
    tabConf.campoNombre = tabla.campoNombre;
    tabConf.campoForanea = tabla.campoForanea;
    tabConf.campoPadre = tabla.campoPadre;
    tabConf.campoOrden = tabla.campoOrden;
    tabConf.numeroFilas = tabla.numeroFilas;
    tabConf.tipoFormulario = tabla.tipoFormulario;
    tabConf.calculaPrimaria = tabla.calculaPrimaria;
    const body = {
      ide_opci,
      tabla: tabConf,
      columnas
    };
    return this.llamarServicioPost('api/sistema/configurar', body);
  }


  eliminarConfiguracionTabla(ide_tabl: string) {
    const body = {
      ide_tabl
    };
    return this.llamarServicioPost('api/sistema/eliminarConfiguracion', body);
  }

  getConfiguracion(ide_opci: string, numero_tabl: string) {
    const body = {
      ide_opci,
      numero_tabl
    };
    return this.llamarServicioPost('api/sistema/getConfiguracion', body);
  }

  getDatosClima(longitud: string, latitud: string) {
    const body = {
      longitud,
      latitud
    };
    return this.llamarServicioPost('api/sistema/getDatosClima', body);
  }

}
