import { UtilitarioService } from '../../services/utilitario.service';
import { Component, ViewChild } from '@angular/core';
import { BarraComponent } from '../componentes/barra/barra.component';
import { MensajeComponent } from '../componentes/mensaje/mensaje.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'pantalla',
  template: '',
})
export abstract class Pantalla {

  @ViewChild('barra') barra: BarraComponent;
  @ViewChild('mensaje') mensaje: MensajeComponent;



  constructor(public utilitario: UtilitarioService) {
    this.utilitario.abrirLoading();
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