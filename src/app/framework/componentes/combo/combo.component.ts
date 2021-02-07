import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { SistemaService } from '../../servicios/sistema.service';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss'],
})
export class ComboComponent implements OnInit {


  listaCombo: any[] = [];
  valor: any;
  @Input() lectura = false;
  @Input() label: string;
  @Input() nullCombo = true;
  @Input() width = "250px"; //defecto
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

  setInvalid(invalid: boolean) {
    this.invalid = invalid;

    if (this.plataforma === 'desktop') {
      const dr = document.querySelector('p-dropdown');
      if (invalid) {
        dr.classList.add('ng-invalid');
        dr.classList.add('ng-dirty');
      }
      else {
        dr.classList.remove('ng-invalid');
        dr.classList.remove('ng-dirty');
      }
    }

  }

  setLabel(label: string) {
    this.label = label;
  }

  setCombo(nombreTabla: string, campoPrimario: string, campoNombre: string, condicion?: string) {
    this.sistemaService.getComboTabla(nombreTabla, campoPrimario,
      campoNombre, condicion).subscribe(resp => {
        const respuest: any = resp;
        if (respuest.datos) {
          this.listaCombo = respuest.datos;
          if (this.nullCombo) {
            //Agrega null a opcion
            this.listaCombo.unshift({ value: null, label: '  ' });
          }
        }
      }, (err) => {
        this.utilitario.agregarMensajeErrorServicioWeb(err);
      });
  }

  mostrarNull(nullCombo: boolean) {
    this.nullCombo = nullCombo;
  }

  setLectura(lectura: boolean) {
    this.lectura = lectura;
  }


  getValor() {
    return this.valor;
  }

}
