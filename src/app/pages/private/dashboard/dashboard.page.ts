import { Component, OnInit } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { SeguridadService } from '../../../framework/servicios/seguridad.service';
import { Usuario } from '../../../framework/clases/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  usuario: Usuario;
  now: Date = new Date();
  userAgent: any = null;
  sistemaOperativo: any = null;
  dispositivo: string;
  fechaUltimoAcceso: string;

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
  ampm ;


  constructor(private utilitario: UtilitarioService,
    private seguridad: SeguridadService) {
    this.usuario = this.seguridad.usuario;
    this.userAgent = this.utilitario.getUserAgent();
    this.sistemaOperativo = this.utilitario.getSistemaOperativo();
    this.dispositivo = this.utilitario.getPlataforma();
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

  ngOnInit() {
    this.fechaUltimoAcceso = localStorage.getItem('ultimaFecha');
  }

  get ip(): string {
    return this.utilitario.getIp();
  }






}
