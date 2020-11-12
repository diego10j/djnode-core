import { UtilitarioService } from '../../services/utilitario.service';
import { Component, ViewChild } from '@angular/core';
import { BarraComponent } from '../componentes/barra/barra.component';

@Component({
  selector: 'pantalla',
  template: ''
})
export abstract class Pantalla {

  @ViewChild('barra') barra: BarraComponent;



  constructor(public utilitario: UtilitarioService) {
  }

  ionViewDidEnter() {
    //Asigna los eventos a los botones
    if (this.utilitario.isDefined(this.barra)) {
      this.barra.onInsertar = () => { this.insertar(); };
      this.barra.onEliminar = () => { this.eliminar(); };
      this.barra.onGuardar = () => { this.guardar(); };
    }

  }


  abstract guardar(): void;
  abstract insertar(): void;
  abstract eliminar(): void;
}