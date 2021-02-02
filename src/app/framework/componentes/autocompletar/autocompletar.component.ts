import { Component, OnInit, Input } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { SistemaService } from '../../servicios/sistema.service';

@Component({
  selector: 'app-autocompletar',
  templateUrl: './autocompletar.component.html',
  styleUrls: ['./autocompletar.component.scss'],
})
export class AutocompletarComponent implements OnInit {

  public resultadoAutocompletar: any[];

  listaCombo: any[] = [];
  valor: any;
  @Input() width = "250px"; //defecto
  @Input() lectura = false;
  @Input() label: string;

  plataforma = 'desktop'; //defecto
  invalid = false;
  //Eventos
  onChange?: (event?: any) => void;

  constructor(private utilitario: UtilitarioService,
    private sistemaService: SistemaService) {
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

  public borrarEvent() {
    this.invalid = false;
    this.valor = null;
    //Ejecuta callback method
    if (this.onChange) {
      this.onChange({
        originalEvent: null
      });
    }
  }

  setInvalid(invalid: boolean) {
    this.invalid = invalid;

    const dr = document.querySelector('p-autocomplete');
    if (invalid) {
      dr.classList.add('ng-invalid');
      dr.classList.add('ng-dirty');
    }
    else {
      dr.classList.remove('ng-invalid');
      dr.classList.remove('ng-dirty');
    }


  }

  setLabel(label: string) {
    this.label = label;
  }

  setAutocompletar(nombreTabla: string, campoPrimario: string, campoNombre: string, condicion?: string) {
    this.sistemaService.getComboTabla(nombreTabla, campoPrimario,
      campoNombre, condicion).subscribe(resp => {
        const respuest: any = resp;
        if (respuest.datos) {
          this.listaCombo = respuest.datos;
        }
      }, (err) => {
        this.utilitario.agregarMensajeErrorServicioWeb(err);
      });
  }



  setLectura(lectura: boolean) {
    this.lectura = lectura;
  }


  getValor() {
    if (this.utilitario.isDefined(this.valor)) {
      return this.valor.value;
    }
    return null;
  }

  getValorLabel() {
    if (this.utilitario.isDefined(this.valor)) {
      return this.valor.label;
    }
    return null;
  }

  /**
 * Se ejecuta al escribir en el autocompletar
 */
  onAutocompletar(event) {
    this.resultadoAutocompletar = this.listaCombo.filter(fila => fila.label.toLowerCase().search(event.query.toLowerCase()) !== -1);
    //console.log(this.resultadoAutocompletar);
  }

}
