import { Component, OnInit } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { SeguridadService } from '../../../framework/servicios/seguridad.service';
import { Usuario } from '../../../framework/clases/usuario';
import { PrimeIcons } from 'primeng/api';

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
    private seguridad: SeguridadService) {
    this.dispositivo = this.utilitario.getPlataforma();
    this.userAgent = this.utilitario.getUserAgent();
    this.sistemaOperativo = this.utilitario.getSistemaOperativo();
    this.usuario = this.seguridad.usuario;
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
    this.fechaUltimoAcceso = localStorage.getItem('ultimaFecha');
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
      this.utilitario.agregarMensajeError('<p>' + err.error.mensaje + '</p> <p><strong>Origen: </strong>' + err.message + '</p> ');
      this.buscandoActividad = false;
    }
    );

  }


}
