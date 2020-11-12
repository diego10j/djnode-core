
import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})
export class BarraComponent {

  @ContentChild(TemplateRef) derecha;

  isBotonInsertar = true;
  isBotonEliminar = true;
  isBotonGuardar = true;

  get botonInsertar(): HTMLButtonElement {
    return (document.getElementById('botInsertar') as HTMLButtonElement);
  }
  get botonEliminar(): HTMLButtonElement {
    return (document.getElementById('botEliminar') as HTMLButtonElement);
  }
  get botonGuardar(): HTMLButtonElement {
    return (document.getElementById('botGuardar') as HTMLButtonElement);
  }

  //Eventos
  onInsertar?: (event?: any) => void;
  onEliminar?: (event?: any) => void;
  onGuardar?: (event?: any) => void;

  constructor() {
    this.isBotonInsertar = true;
    this.isBotonEliminar = true;
    this.isBotonGuardar = true;
  }


  onClickInsertar(event) {
    if (this.onInsertar) {
      this.onInsertar({
        originalEvent: event
      });
    }
  }

  onClickEliminar(event) {
    if (this.onEliminar) {
      this.onEliminar({
        originalEvent: event
      });
    }
  }

  onClickGuardar(event) {
    if (this.onGuardar) {
      this.onGuardar({
        originalEvent: event
      });
    }
  }

  ocultarBotonInsertar() {
    this.botonInsertar.hidden = true;
    this.isBotonInsertar = false;
  }

  ocultarBotonGuardar() {
    this.botonGuardar.hidden = true;
    this.isBotonGuardar = false;
  }

  ocultarBotonEliminar() {
    this.botonEliminar.hidden = true;
    this.isBotonEliminar = false;
  }

  ocultarBotones() {
    this.botonInsertar.hidden = true;
    this.botonGuardar.hidden = true;
    this.botonEliminar.hidden = true;
    this.isBotonInsertar = false;
    this.isBotonGuardar = false;
    this.isBotonEliminar = false;
  }



}
