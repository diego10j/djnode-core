import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TablaComponent } from '../tabla/tabla.component';

@Component({
  selector: 'app-modal-tabla',
  templateUrl: './modal-tabla.component.html',
  styleUrls: ['./modal-tabla.component.scss'],
})
export class ModalTablaComponent {

  @Input() visible = false;
  @Input() titulo = 'Titulo';
  @Input() mostrarBotonCancelar = true;
  @Input() valorBotonCancelar = 'Cancelar';
  @Input() mostrarBotonAceptar = true;
  @Input() valorBotonAceptar = 'Aceptar';
  ejecutando = false;

  @ViewChild('tabTablaModal', { static: false }) tabTablaModal: TablaComponent;

  //Eventos
  public onClickAceptar?: (event?: any) => void;
  public onClickCancelar?: (event?: any) => void;

  constructor() {
  }

  ngOnInit() {
  }

  public setTitulo(titulo: string) {
    this.titulo = titulo;
  }

  public setModalFormulario(){
    this.tabla.setLectura(false);
    this.tabla.setTipoFormulario();
    this.tabla.setNumeroColumnasGrid(1);
    this.tabla.setUnico();
    this.tabla.ocultarBotones();
  }

  public abrir() {
    this.visible = true;
  }

  public cerrar() {
    this.ejecutando = false;
    this.visible = false;
    if (this.onClickCancelar) {
      this.onClickCancelar({
        originalEvent: null
      });
    }
  }

  aceptar() {
    this.ejecutando = true;
    if (this.onClickAceptar) {
      this.onClickAceptar({
        originalEvent: null
      });
    }
  }
  cancelar() {
    this.cerrar();
  }


  get tabla(): TablaComponent {
    return this.tabTablaModal;
  }
}
