import { Component, OnInit, Input } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {

  @Input() lectura = false;
  @Input() label:string ="Label";
  fecha: Date;
  fechaMinima: Date;
  fechaMaxima: Date;

  fechaMinimaIonic: string;
  fechaMaximaIonic: string;

  plataforma: string = 'desktop'; //defecto
  invalid = false;

  //Eventos
  onChange?: (event?: any) => void;


  constructor(private utilitario: UtilitarioService) {
    this.plataforma = this.utilitario.getPlataforma();
  }

  ngOnInit() { }

  public changeEvent() {
    this.invalid = false;
    //Ejecuta callback method
    if (this.onChange) {
      this.onChange({
        originalEvent: null
      });
    }

  }

  setInvalid(invalid: boolean) {
    this.invalid = invalid;
  }

  setFechaActual() {
    this.fecha = new Date();
  }

  setFecha(fecha: Date) {
    this.fecha = fecha;
  }


  setFechaMinima(fecha: Date) {
    if (this.plataforma === 'desktop') {
      this.fechaMinima = fecha;
    }
    else {
      //convierte a string
      this.fechaMinimaIonic = this.utilitario.getFormatoFecha(fecha, this.utilitario.FORMATO_FECHA_BDD);
    }
  }

  setFechaMaxima(fecha: Date) {
    if (this.plataforma === 'desktop') {
      this.fechaMaxima = fecha;
    }
    else {
      //convierte a string
      this.fechaMaximaIonic = this.utilitario.getFormatoFecha(fecha, this.utilitario.FORMATO_FECHA_BDD);
    }
  }

  /**
   * Retorna el Valor de la fecha en Formato YYYY-MM-DD
   */
  getValor(): string {
    return this.utilitario.getFormatoFecha(this.fecha, this.utilitario.FORMATO_FECHA_BDD);
  }

  getValorDate(): Date {
    return this.utilitario.toDate(this.fecha, this.utilitario.FORMATO_FECHA_BDD);
  }


}
