import { Component } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { SeguridadService } from '../../../framework/servicios/seguridad.service';
import { Usuario } from '../../../framework/clases/usuario';
import { SistemaService } from '../../../framework/servicios/sistema.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  usuario: Usuario;
  now: Date = new Date();
  userAgent: any = null;
  sistemaOperativo: any = null;
  dispositivo: string;
  fechaUltimoAcceso: string;

  buscandoPantallas = false;
  datosPantallas: any[];

  buscandoClima = false;
  datosClima: any;

  semana = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];

  meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];
  diaSemana;
  dia;
  mes;
  year;
  ampm;

  constructor(private utilitario: UtilitarioService,
    private seguridad: SeguridadService,
    private sistema: SistemaService) {
    this.dispositivo = this.utilitario.getPlataforma();
    this.userAgent = this.utilitario.getUserAgent();
    this.sistemaOperativo = this.utilitario.getSistemaOperativo();
    this.usuario = this.seguridad.usuario;
    this.getDatosClima();
    setInterval(() => {
      this.now = new Date();
      this.diaSemana = this.now.getDay();
      this.dia = this.now.getDate();
      this.mes = this.now.getMonth();
      this.year = this.now.getFullYear();
      this.ampm = this.now.getHours() >= 12 ? 'PM' : 'AM';
      if (this.now.getDate() < 10) {
        this.dia = '0' + this.dia;
      }
    }, 1);
  }

  ionViewWillEnter() {
    this.usuario = this.seguridad.usuario;
    this.fechaUltimoAcceso = this.utilitario.getFormatoMoment(localStorage.getItem('ultimaFecha'), 'll', 'DD-MM-YYYY') + ' / ' + this.utilitario.getFormatoMoment(localStorage.getItem('ultimaFecha'), 'LT', 'DD-MM-YYYY h:mm:ss');
    this.getPantallasFrecuentes();
  }

  get ip(): string {
    return this.utilitario.getIp();
  }


  private getPantallasFrecuentes() {
    this.buscandoPantallas = true;
    this.seguridad.getPantallasFrecuentes().subscribe(resp => {
      const respuest: any = resp;
      this.datosPantallas = respuest.datos;
      this.buscandoPantallas = false;
    }, (err) => {
      this.utilitario.agregarMensajeErrorServicioWeb(err);
      this.buscandoPantallas = false;
    }
    );
  }

  private async getDatosClima() {
    this.buscandoClima = true;
    const cordenadas = await this.utilitario.getGeoLocalizacion();
    this.sistema.getDatosClima(cordenadas.longitud, cordenadas.latitud).subscribe(resp => {
      const respuest: any = resp;
      this.datosClima = respuest.datos;
      this.buscandoClima = false;
    }, (err) => {
      this.utilitario.agregarMensajeErrorServicioWeb(err);
      this.buscandoClima = false;
    }
    );
  }

  abrirPantalla(opcion) {
    if (opcion) {
      if (this.utilitario.isDefined(opcion.ruta)) {
        var index = this.utilitario.getPantallasGenericas().indexOf(opcion.ruta);
        if (index === -1) {
          this.utilitario.abrirPagina(opcion.ruta);
        }
        else {
          this.utilitario.abrirPagina(opcion.ruta + '/' + 'generic_' + opcion.data);
        }
        if (this.utilitario.isDefined(opcion.data)) {
          this.seguridad.auditoriaAccesoPantalla(opcion.data, this.utilitario.getPlataforma());
        }
      }
    }
  }


  contador(i: number) {
    return new Array(i);
  }

}
