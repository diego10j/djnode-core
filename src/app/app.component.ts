import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FilterMatchMode, PrimeNGConfig, Translation } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  translation: Translation = {
    startsWith: 'Empezar con',
    contains: 'Contiene',
    notContains: 'No contiene',
    endsWith: 'Termina con',
    equals: 'Igual',
    notEquals: 'No es igual',
    lt: 'Menor que',
    lte: 'Menor o igual',
    gt: 'Mayor que',
    gte: 'Mayor o igual',
    is: 'Igual',
    isNot: 'No es igual',
    before: 'Antes de',
    after: 'Después de',
    clear: 'Limpiar',
    apply: 'Aplicar',
    matchAll: 'Coincidir con todos',
    matchAny: 'Coincidir con cualquiera',
    addRule: 'Agregar Condición',
    removeRule: 'Eliminar Condición',
    accept: 'Si',
    reject: 'No',
    choose: 'Seleccionar',
    upload: 'Subir',
    cancel: 'Cancelar',
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    today: 'Hoy',
    weekHeader: 'Sem'
}


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private primengConfig: PrimeNGConfig
  ) {
    //Configuraciones primeng
    this.primengConfig.ripple = true;
    this.primengConfig.setTranslation(this.translation);
    this.primengConfig.filterMatchModeOptions = {
      text: [
          FilterMatchMode.CONTAINS,
          FilterMatchMode.STARTS_WITH,
          FilterMatchMode.NOT_CONTAINS
      ],
      numeric: [
          FilterMatchMode.EQUALS,
          FilterMatchMode.NOT_EQUALS,
          FilterMatchMode.LESS_THAN,
          FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
          FilterMatchMode.GREATER_THAN,
          FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
      ],
      date: [
          FilterMatchMode.IS,
          FilterMatchMode.IS_NOT,
          FilterMatchMode.BEFORE,
          FilterMatchMode.AFTER
      ]
  }
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
