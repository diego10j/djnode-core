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

  buscandoActividad = false;
  datosActividad: any[];

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
    console.log(localStorage.getItem('ultimaFecha'));
    this.fechaUltimoAcceso = this.utilitario.getFormatoFechaLarga(localStorage.getItem('ultimaFecha'));
    this.getActividadAuditoria();
  }

  get ip(): string {
    return this.utilitario.getIp();
  }


  private getActividadAuditoria() {
    this.buscandoActividad = true;
    this.seguridad.getActividadAuditoria().subscribe(resp => {
      const respuest: any = resp;
      this.datosActividad = respuest.datos;
      console.log(this.datosActividad);
      this.buscandoActividad = false;
    }, (err) => {
      this.utilitario.agregarMensajeErrorServicioWeb(err);
      this.buscandoActividad = false;
    }
    );
  }

  private async getDatosClima() {
    this.buscandoClima = true;
    const cordenadas = await this.utilitario.getGeoLocalizacion();
    this.sistema.getDatosClima(cordenadas.longitud, cordenadas.latitud).subscribe(resp => {
      const respuest: any = resp;
      this.datosClima = respuest.datos;
      console.log(this.datosClima);
      this.buscandoClima = false;
    }, (err) => {
      this.utilitario.agregarMensajeErrorServicioWeb(err);
      this.buscandoClima = false;
    }
    );
  }


}
