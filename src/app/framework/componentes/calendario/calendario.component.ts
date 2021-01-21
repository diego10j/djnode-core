import { Component, OnInit } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {

  fecha: Date;
  fechaMinima: Date;
  fechaMaxima: Date;

  fechaIonic: string;
  fechaMinimaIonic: string;
  fechaMaximaIonic: string;

  plataforma: string = 'desktop'; //defecto

  //eventos
  onMetodoChange?: (event?: any) => void;

  constructor(private utilitario: UtilitarioService) {
    this.plataforma = this.utilitario.getPlataforma();
  }

  ngOnInit() { }

  setFechaActual() {
    this.fecha = new Date();
  }

  setFecha(fecha: Date) {
    if (this.plataforma === 'desktop') {
      this.fecha = fecha;
    }
    else {
      //convierte a string
      this.fechaIonic = this.utilitario.getFormatoFecha(fecha);
    }
  }


  setFechaMinima(fecha: Date) {
    if (this.plataforma === 'desktop') {
      this.fechaMinima = fecha;
    }
    else {
      //convierte a string
      this.fechaMinimaIonic = this.utilitario.getFormatoFecha(fecha);
    }
  }

  setFechaMaxima(fecha: Date) {
    if (this.plataforma === 'desktop') {
      this.fechaMaxima = fecha;
    }
    else {
      //convierte a string
      this.fechaMaximaIonic = this.utilitario.getFormatoFecha(fecha);
    }
  }

  getValor(): string {
    if (this.plataforma === 'desktop') {
      return this.utilitario.getFormatoFecha(this.fecha);
    }
    else {
      return this.fechaIonic;
    }
  }


}
