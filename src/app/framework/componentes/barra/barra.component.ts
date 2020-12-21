
import { Component, ContentChild, TemplateRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})
export class BarraComponent implements OnInit {

  @ContentChild(TemplateRef) derecha;

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
    this.isBotonGuardar = true;
  }

  ngOnInit() {
    this.botonInsertar.hidden = true;
    this.botonEliminar.hidden = true;
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

 
  ocultarBotonGuardar() {
    this.botonGuardar.hidden = true;
    this.isBotonGuardar = false;
  }


}
