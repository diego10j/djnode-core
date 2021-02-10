import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { CalendarioComponent } from '../calendario/calendario.component';

@Component({
  selector: 'app-rango-fechas',
  templateUrl: './rango-fechas.component.html',
  styleUrls: ['./rango-fechas.component.scss'],
})
export class RangoFechasComponent implements OnInit {

  @ViewChild('calFechaInicial', { static: false }) calFechaInicial: CalendarioComponent;
  @ViewChild('calFechaFinal', { static: false }) calFechaFinal: CalendarioComponent;
  plataforma: string = 'desktop'; //defecto

  //Eventos
  onBuscar?: (event?: any) => void;

  constructor(private utilitario: UtilitarioService) {
    this.plataforma = this.utilitario.getPlataforma();
  }


  public buscarClick() {
    if (this.isFechasValidas()) {
      //Ejecuta callback method
      if (this.onBuscar) {
        this.onBuscar({
          originalEvent: null
        });
      }
    }
  }

  isFechasValidas(): boolean {

    //Nullos
    if (this.utilitario.isDefined(this.getValorFechaInicial()) === false || this.utilitario.isFechaValida(this.getValorFechaInicial(), this.utilitario.FORMATO_FECHA_BDD) === false) {
      this.calFechaInicial.setInvalid(true);
      this.utilitario.getMensaje().agregarMensajeError('La Fecha Inicial no es válida.');
      return false;
    }

    if (this.utilitario.isDefined(this.getValorFechaFinal()) === false || this.utilitario.isFechaValida(this.getValorFechaFinal(), this.utilitario.FORMATO_FECHA_BDD) === false) {
      this.calFechaFinal.setInvalid(true);
      this.utilitario.getMensaje().agregarMensajeError('La Fecha Fin no es válida.');
      return false;
    }

    if (this.utilitario.isFechaMenorOrIgual(this.getValorFechaInicial(), this.getValorFechaFinal()) == false) {
      this.calFechaFinal.setInvalid(true);
      this.calFechaInicial.setInvalid(true);
      this.utilitario.getMensaje().agregarMensajeError('Las Fecha Inicial debe ser menor o igual que la Fecha Final.');
      return false;
    }
    else {
      this.calFechaInicial.setInvalid(false);
      this.calFechaFinal.setInvalid(false);
    }

    return true;
  }

  setFechaInicio(fecha: Date) {
    this.calFechaInicial.setFecha(fecha);
  }

  setFechaFin(fecha: Date) {
    this.calFechaFinal.setFecha(fecha);
  }

  setFechaMinimaInicio(fecha: Date) {
    this.calFechaInicial.setFechaMinima(fecha);
  }

  setFechaMinimaFin(fecha: Date) {
    this.calFechaFinal.setFechaMinima(fecha);
  }

  setFechaMaximaInicio(fecha: Date) {
    this.calFechaInicial.setFechaMaxima(fecha);
  }

  setFechaMazimaFin(fecha: Date) {
    this.calFechaFinal.setFechaMaxima(fecha);
  }

  /**
   * Asigna las fechas Máximas a la fecha Actual
   */
  setControlarFechasMaximas() {
    this.calFechaInicial.setFechaMaxima(this.utilitario.getFechaActualDate());
    this.calFechaFinal.setFechaMaxima(this.utilitario.getFechaActualDate());
  }

  getValorFechaInicial(): string {
    return this.calFechaInicial.getValor();
  }

  getValorFechaFinal(): string {
    return this.calFechaFinal.getValor();
  }


  getValorDateFechaInicial(): Date {
    return this.calFechaInicial.getValorDate();
  }

  getValorDateFechaFinal(): Date {
    return this.calFechaFinal.getValorDate();
  }

  ngOnInit() { }

}
