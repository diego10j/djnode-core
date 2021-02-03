import { Component, OnInit, Input } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-hora',
  templateUrl: './hora.component.html',
  styleUrls: ['./hora.component.scss'],
})
export class HoraComponent implements OnInit {

  @Input() lectura = false;
  @Input() label: string;
  hora: Date;

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
    this.hora = new Date();
  }

  setFecha(hora: Date) {
    this.hora = hora;
  }


  /**
   * Retorna el Valor de la fecha en Formato YYYY-MM-DD
   */
  getValor(): string {
    return this.utilitario.getFormatoHora(this.hora, this.utilitario.FORMATO_HORA);
  }

  getValorDate(): Date {
    return this.utilitario.toDate(this.hora, this.utilitario.FORMATO_HORA);
  }


}
