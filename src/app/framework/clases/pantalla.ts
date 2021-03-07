import { UtilitarioService } from '@servicios/utilitario.service';
import { Component, ViewChild } from '@angular/core';
import { BarraComponent } from '@djnode/componentes/barra/barra.component';
import { MensajeComponent } from '@djnode/componentes/mensaje/mensaje.component';
import { ActivatedRoute } from '@angular/router';
import { SistemaService } from '../servicios/sistema.service';

@Component({
  selector: 'pantalla',
  template: '',
})
export abstract class Pantalla {

  @ViewChild('barra') barra: BarraComponent;
  @ViewChild('mensaje') mensaje: MensajeComponent;



  constructor(public utilitario: UtilitarioService, public route: ActivatedRoute,
    public sistema: SistemaService) {
  }

  ionViewDidEnter() {
    //Asigna los eventos a los botones
    if (this.utilitario.isDefined(this.barra)) {
      this.barra.onInsertar = () => { this.insertar(); };
      this.barra.onEliminar = () => { this.eliminar(); };
      this.barra.onGuardar = () => { this.guardar(); };
    }
    if (this.utilitario.isDefined(this.mensaje)) {
      this.utilitario.setMensaje(this.mensaje);
    }

  }


  abstract guardar(): void;
  abstract insertar(): void;
  abstract eliminar(): void;
}