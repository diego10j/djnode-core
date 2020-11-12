import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment.prod';
import { SistemaService } from '../framework/servicios/sistema.service';
import { TablaComponent } from '../framework/componentes/tabla/tabla.component';

@Injectable({
    providedIn: 'root',
})
export class UtilitarioService {
    constructor(
        private storage: Storage,
        private router: Router,
        private datePipe: DatePipe,
        private sistemaService: SistemaService,
    ) { }

    /**
     * Agrega un mensaje en la pantalla
     * @param $title
     * @param $mensaje
     */
    agregarMensaje($mensaje: string, $titulo?: string) {
        if (!this.isDefined($titulo)) {
            $titulo = 'Información';
        }
        Swal.fire({
            icon: 'info',
            title: $titulo,
            html: $mensaje,
            heightAuto: false,
        });
    }

    /**
     * Agrega un mensaje de Error en la pantalla
     * @param $title
     * @param $message
     */
    agregarMensajeError($mensaje: string, $titulo?: string) {
        if (!this.isDefined($titulo)) {
            $titulo = 'Error';
        }
        Swal.fire({
            icon: 'error',
            title: $titulo,
            html: $mensaje,
            heightAuto: false,
        });
    }

    /**
     * Agrega un mensaje de Advertencia en la pantalla
     * @param $mensaje 
     * @param $titulo 
     */
    agregarMensajeAdvertencia($mensaje: string, $titulo?: string) {
        if (!this.isDefined($titulo)) {
            $titulo = 'Advertencia';
        }
        Swal.fire({
            icon: 'warning',
            title: $titulo,
            html: $mensaje,
            heightAuto: false,
        });
    }

    /**
     * Agrega un mensaje de Exito en la pantalla
     * @param $title
     * @param $message
     */
    async agregarMensajeExito($mensaje: string, $titulo?: string) {
        if (!this.isDefined($titulo)) {
            $titulo = 'Éxito';
        }
        Swal.fire({
            icon: 'success',
            title: $titulo,
            text: $mensaje,
            heightAuto: false,
        });
    }
    /**
     * Retorna si una variable esta definida
     * @param $variable
     */
    isDefined($variable: any): boolean {
        return typeof $variable !== 'undefined' && $variable !== null;
    }

    /**
     * Retorna si una variable esta definida
     * @param $variable
     */
    isEmpty($variable: string): boolean {
        if (this.isDefined($variable)) {
            $variable = $variable.trim();
            if ($variable.length === 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * Borra una variable del Storage
     * @param $variable
     */
    borrarVariable($variable: string) {
        this.storage.remove($variable);
    }

    /**
     * Crea una variable en el Storage
     * @param variable
     * @param valor
     */
    crearVariable(variable: string, valor: any) {
        this.storage.set(variable, valor);
    }

    /**
     * Retorna el valor de una variable del Storage
     * @param variable
     */
    getVariable(variable: string): Promise<any> {
        return new Promise((resolve) => {
            this.storage.get(variable).then((result) => {
                // console.log(result);
                resolve(result);
            });
        });
    }

    /**
     * Crea una variable en el Local Storage
     * @param variable
     * @param valor
     */
    crearVariableLocalStorage(variable: string, valor: any) {
        localStorage.setItem(variable, valor);
    }

    /**
     * Elimina una variable en el Local Storage
     * @param variable
     * @param valor
     */
    eliminarVariableLocalStorage(variable: string) {
        localStorage.removeItem(variable);
    }

    /**
     * Retorna el valor de una variable del Local Storage
     * @param variable
     */
    getVariableLocalStorage(variable: string): string {
        return localStorage.getItem(variable);
    }

    getFormatoNumero(numero: number): any {
        return this.getFormatoNumeroDecimales(numero, 2);
    }

    getFormatoNumeroDecimales(numero: number, decimales: number): any {
        if (!this.isDefined(numero)) {
            numero = 0;
        }
        if (isNaN(numero)) {
            numero = 0;
        }
        return Number(
            Math.round(parseFloat(numero + 'e' + decimales)) + 'e-' + decimales
        ).toFixed(decimales);
    }
    /**
     * Limpia todo el contenido del Storage
     */
    limpiarVariablesLocalStorage() {
        localStorage.clear();
    }
    /**
     * Retorna la fecha en formato yyyy-MM-dd
     * @param fecha
     */
    getFormatoFecha(fecha: Date): string {
        return this.getFechaFormato(fecha, 'yyyy-MM-dd');
    }

    getFechaFormato(fecha: Date, formato: string): string {
        return this.datePipe.transform(fecha, formato);
    }

    /**
 * Retorna la fecha hora en formatoyyyy-MM-dd HH:mm:ss
 * @param fecha
 */
    getFormatoFechaHora(fecha: Date): string {
        return this.getFechaFormato(fecha, 'yyyy-MM-dd HH:mm:ss');
    }

    /**
   * Retorna la hora en formato hh:mm:ss
   * @param fecha
   */
    getFormatoHora(fecha: Date): string {
        return this.getFechaFormato(fecha, 'HH:mm:ss');
    }

    /**
     * Transforma a Date una fecha string
     * @param fecha
     */
    toDate(fecha: string): Date {
        return new Date(fecha);
    }

    /**
     * Suma dias a una fecha
     * @param fecha
     * @param dias
     */
    sumarDiasFecha(fecha: string, dias: number): string {
        let fechaDate: Date;
        fechaDate = this.toDate(fecha);
        fechaDate.setDate(fechaDate.getDate() + dias);
        return this.getFormatoFecha(fechaDate);
    }
    /**
     * Retorna la fecha actual en formato 
     */
    getFechaActual(): string {
        return this.getFormatoFecha(new Date());
    }


    getRestApi(): string {
        return environment.API_REST;
    }

    /**
     * Navega hacia una pagina
     * @param path
     * @param parametros
     */
    abrirPagina(path: string, parametros?: any) {
        this.router.navigate(['private/'+path], { replaceUrl: true });
    }

    /**
     * Navega hacia una pagina
     * @param path
     * @param parametros
     */
    abrirPaginaPublica(path: string, parametros?: any) {
        if (parametros) {
            this.router.navigate([path], { state: parametros });
        } else {
            this.router.navigate([path]);
        }
    }

    getCalendarioEsp() {
        const es = {
            firstDayOfWeek: 0,
            dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Borrar',
            dateFormat: `${environment.FORMATO_FECHA}`,
            weekHeader: 'Sem'
        };

        return es;
    }

    guardarPantalla(...tablas: TablaComponent[]): boolean {
        let lisAgrupa = [];
        for (const tab of tablas) {
            //valida que no haya errores para ejecutar todas las sentencias
            let lista = tab.guardar();
            if (lista.length > 0) {
                tab.buscando = true;
                lisAgrupa.push(...lista);
            }
        }
        if (lisAgrupa.length > 0) {
            this.sistemaService.ejecutarListaSQL(lisAgrupa).subscribe(resp => {
                for (let tab of tablas) {
                    tab.onCommit();
                    tab.buscando = false;
                }
                this.agregarMensajeExito('Datos guardados exitosamente');
            }, (err) => {
                this.agregarMensajeError(err.error.mensaje);
                for (let tab of tablas) {
                    tab.buscando = false;
                }
            });
        }
        return true;
    }

}
