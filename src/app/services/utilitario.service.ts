import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment.prod';
import { SistemaService } from '../framework/servicios/sistema.service';
import { TablaComponent } from '../framework/componentes/tabla/tabla.component';
import { LoadingController, Platform } from '@ionic/angular';
import Condicion from '../framework/interfaces/condicion';
import * as moment from 'moment';
import 'moment/locale/es';
@Injectable({
    providedIn: 'root',
})
export class UtilitarioService {
    constructor(
        private storage: Storage,
        private router: Router,
        private datePipe: DatePipe,
        public platform: Platform,
        public sistemaService: SistemaService,
        private loadingController: LoadingController,
        private geolocation: Geolocation
    ) {
    }

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
            confirmButtonText: 'Ok',
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
            confirmButtonText: 'Ok',
            heightAuto: false,
        });
    }

    agregarMensajeErrorServicioWeb(err) {
        if (this.isDefined(err.error)) {
            this.agregarMensajeError('<p>' + err.error.mensaje + '</p> <p><strong>Origen: </strong>' + err.message + '</p> ');
        }
        else {
            this.agregarMensajeError('<p>' + err.error + '</p> <p><strong>Origen: </strong>' + err.message + '</p> ');
        }
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
            confirmButtonText: 'Ok',
            heightAuto: false,
        });
    }

    /**
     * Agrega un mensaje de Exito en la pantalla
     * @param $title
     * @param $message
     */
    agregarMensajeExito($mensaje: string, $titulo?: string) {
        if (!this.isDefined($titulo)) {
            $titulo = 'Éxito';
        }
        Swal.fire({
            icon: 'success',
            title: $titulo,
            text: $mensaje,
            confirmButtonText: 'Ok',
            heightAuto: false,
        });
    }

    confirmar($mensaje: string, callback, $titulo?: string) {
        if (!this.isDefined($titulo)) {
            $titulo = 'Confirmar';
        }
        Swal.fire({
            title: $titulo,
            icon: 'question',
            html: $mensaje,
            showCancelButton: true,
            focusConfirm: false,
            reverseButtons: true,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Si',
            confirmButtonAriaLabel: 'Si',
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> No',
            cancelButtonAriaLabel: 'No',
            heightAuto: false,
        }).then((result) => {
            if (result.isConfirmed) {
                callback();
            }
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
        this.router.navigate(['private/' + path], { replaceUrl: true });
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

    guardarPantalla(...tablas: TablaComponent[]): Promise<boolean> {

        return new Promise(resolve => {
            const lisAgrupa = [];
            for (const tab of tablas) {
                // valida que no haya errores para ejecutar todas las sentencias
                const lista = tab.guardar();
                if (lista.length > 0) {
                    tab.buscando = true;
                    lisAgrupa.push(...lista);
                }
            }
            if (lisAgrupa.length > 0) {
                this.sistemaService.ejecutarListaSQL(lisAgrupa).subscribe(resp => {
                    for (const tab of tablas) {
                        tab.onCommit();
                        tab.buscando = false;
                    }
                    this.agregarMensajeExito('Datos guardados exitosamente');
                    resolve(true);
                }, (err) => {
                    resolve(false);
                    this.agregarMensajeError(err.error.mensaje);
                    for (const tab of tablas) {
                        tab.buscando = false;
                    }
                });
            }
            else {
                resolve(true);
            }

        });
    }


    getIdeOpci(ruta?: string): string {
        if (!this.isDefined(ruta)) {
            ruta = this.router.url;
            ruta = ruta.substring(ruta.lastIndexOf('/') + 1, ruta.length);
        }

        if (ruta.includes('generic_')) {
            let data = ruta.substring(ruta.lastIndexOf('_') + 1, ruta.length);
            return data;
        }
        else {
            const menus = JSON.parse(localStorage.getItem('menu')) || [];
            //Busqueda recursiva
            for (const opciActual of menus) {
                const encontro = this.busquedaRecursivaIdeOpci(opciActual, ruta);
                if (encontro !== null) {
                    return encontro;
                }
            }
        }
        return null;
    }

    getRuta(): string {
        let ruta = this.router.url;
        ruta = ruta.substring(ruta.lastIndexOf('/') + 1, ruta.length);
        return ruta;
    }

    private busquedaRecursivaIdeOpci(opcion: any, ruta: string): string {

        if (opcion.ruta === ruta) {
            return opcion.data;
        }
        if (opcion.items) {
            for (const opciActual of opcion.items) {
                const encontro = this.busquedaRecursivaIdeOpci(opciActual, ruta);
                if (encontro !== null) {
                    return opciActual.data;
                }
            }
        }

        return null;
    }

    getIp(): string {
        return localStorage.getItem('ip') || '127.0.0.1';
    }


    getUserAgent(): any {
        const agent = { browser: { name: null, version: null, v: null, userAgent: null, app: null, os: null }, mobile: false, pointlock: false };

        let nVer = navigator.appVersion;
        let nAgt = navigator.userAgent;
        let browserName = navigator.appName;
        let fullVersion = '' + parseFloat(navigator.appVersion);
        let majorVersion = parseInt(navigator.appVersion, 10);
        let nameOffset, verOffset, ix;
        agent.pointlock = 'pointerLockElement' in document ||
            'mozPointerLockElement' in document ||
            'webkitPointerLockElement' in document;
        // In Opera, the true version is after "Opera" or after "Version"
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browserName = 'Opera';
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }
        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browserName = 'Microsoft Internet Explorer';
            fullVersion = nAgt.substring(verOffset + 5);
        }
        // In Chrome, the true version is after "Chrome"
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browserName = 'Chrome';
            fullVersion = nAgt.substring(verOffset + 7);
        }
        // In Safari, the true version is after "Safari" or after "Version"
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browserName = 'Safari';
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }
        // In Firefox, the true version is after "Firefox"
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browserName = 'Firefox';
            fullVersion = nAgt.substring(verOffset + 8);
        }
        // In most other browsers, "name/version" is at the end of userAgent
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
            (verOffset = nAgt.lastIndexOf('/'))) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);
            if (browserName.toLowerCase() == browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(';')) != -1) {
            fullVersion = fullVersion.substring(0, ix);
        }
        if ((ix = fullVersion.indexOf(' ')) != -1) {
            fullVersion = fullVersion.substring(0, ix);
        }

        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }
        agent.browser.name = browserName;
        agent.browser.version = fullVersion;
        agent.browser.v = majorVersion;
        agent.browser.app = navigator.appName;
        agent.browser.userAgent = navigator.userAgent;
        let OSName = 'Unknown OS';
        if (navigator.appVersion.indexOf('Win') != -1) { OSName = 'Windows'; }
        if (navigator.appVersion.indexOf('Mac') != -1) { OSName = 'MacOS'; }
        if (navigator.appVersion.indexOf('X11') != -1) { OSName = 'UNIX'; }
        if (navigator.appVersion.indexOf('Linux') != -1) { OSName = 'Linux'; }

        agent.browser.os = OSName;
        agent.mobile = (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
        return agent;
    }

    getPlataforma(): string {
        if (this.platform.is('desktop')) {
            return 'desktop';
        } else if (this.platform.is('ios')) {
            return 'ios';
        } else if (this.platform.is('android')) {
            return 'android';
        }
        return 'desktop';
    }

    getGeoLocalizacion(): Promise<any> {
        return new Promise(resolve => {
            this.geolocation.getCurrentPosition().then((resp) => {
                const cordenadas = {
                    longitud: resp.coords.longitude,
                    latitud: resp.coords.latitude
                }
                resolve(cordenadas);
            }).catch((error) => {
                //Por defecto
                const cordenadas = {
                    longitud: -78.52480,
                    latitud: -0.225219
                }
                resolve(cordenadas);
                console.log('Error getGeoLocalizacion', error);
            });
        });

    }

    getWidhtPantalla() {
        return this.platform.width();
    }


    getSistemaOperativo(): any {

        const sistemaOperativo = { nombre: null, icono: null, color: null };
        try {
            // system
            let os = 'Unknown OS';
            const nVer = navigator.appVersion;
            const nAgt = navigator.userAgent;
            let icono = '';
            let color = '';

            let clientStrings = [
                { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
                { s: 'Windows Server', r: /Windows NT 5.2/ },
                { s: 'Windows Vista', r: /Windows NT 6.0/ },
                { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
                { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
                { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
                { s: 'Windows 10', r: /(Windows 10|Windows NT 10.0)/ },
                { s: 'Android', r: /Android/ },
                { s: 'Open BSD', r: /OpenBSD/ },
                { s: 'Sun OS', r: /SunOS/ },
                { s: 'Linux', r: /(Linux|X11)/ },
                { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
                { s: 'Mac OS X', r: /Mac OS X/ },
                { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
                { s: 'QNX', r: /QNX/ },
                { s: 'UNIX', r: /UNIX/ },
                { s: 'BeOS', r: /BeOS/ },
                { s: 'OS/2', r: /OS\/2/ },
                { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
            ];
            for (const id in clientStrings) {
                const cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }


            let osVersion = null;

            if (/Windows/.test(os)) {
                osVersion = /Windows (.*)/.exec(os)[1];
                os = 'Windows ' + osVersion;
                sistemaOperativo.icono = 'logo-windows';
                sistemaOperativo.color = 'primary';
            }

            switch (os) {
                case 'Mac OS X':
                    osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                    os = os + ' ' + osVersion;
                    sistemaOperativo.icono = 'logo-apple';
                    sistemaOperativo.color = 'dark';
                    break;

                case 'Android':
                    osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                    os = os + ' ' + osVersion;
                    sistemaOperativo.icono = 'logo-android';
                    sistemaOperativo.color = 'success';
                    break;

                case 'iOS':
                    osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                    osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                    os = os + ' ' + osVersion;
                    sistemaOperativo.icono = 'logo-apple';
                    sistemaOperativo.color = 'dark';
                    break;

            }

            sistemaOperativo.nombre = os;
        } catch (err) {
        }
        return sistemaOperativo;
    }


    getPantallasGenericas(): string[] {
        return ['simple', 'doble', 'recursiva', 'triple'];
    }

    async abrirLoading() {
        const loading = await this.loadingController.create({
            //message: 'Cargando...',
            cssClass: 'loadin-class',
            mode: 'md',
            spinner: 'dots',
            translucent: true,
            keyboardClose: true
        });
        return await loading.present();
    }

    cerrarLoading() {
        try {
            this.loadingController.dismiss();
        } catch (err) {
        }
    }


    getObjSqlModificar(nombreTabla: string, valores: any, condiciones: Condicion[]): any {
        return {
            tipo: 'modificar',
            nombreTabla,
            valores,
            condiciones
        };
    }

    getObjSqlEliminar(nombreTabla: string, condiciones: Condicion[]): any {
        return {
            tipo: 'eliminar',
            nombreTabla,
            condiciones
        };
    }

    ejecutarListaSQL(listaSQL: any[], mensaje = true): Promise<boolean> {
        return new Promise(resolve => {
            this.sistemaService.ejecutarListaSQL(listaSQL).subscribe(resp => {
                if (mensaje === true) {
                    this.agregarMensajeExito('Datos guardados exitosamente');
                }
                resolve(true);
            }, (err) => {
                this.agregarMensajeError(err.error.mensaje);
                resolve(false);
            });
        });
    }

    cambiarSizeFuente(size: number) {
        document.documentElement.style.fontSize = size + 'px';
    }


    //Formatos Fechas Moment

    getFormatoMoment(fecha,format, formatoFecha = 'YYYY-MM-DD h:mm:ss') {
        return moment(fecha, formatoFecha).format(format);
    }

}
