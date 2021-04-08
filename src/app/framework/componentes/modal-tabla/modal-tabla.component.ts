import { Component, Input, OnDestroy, OnInit, ViewChild, TemplateRef, ContentChild } from '@angular/core';
import { TablaComponent } from '../tabla/tabla.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-tabla',
  templateUrl: './modal-tabla.component.html',
  styleUrls: ['./modal-tabla.component.scss'],
})
export class ModalTablaComponent{


  @ViewChild('modalTabla', { static: false }) modalTabla: ModalComponent;
  @ViewChild('tabTablaModal', { static: false }) tabTablaModal: TablaComponent;

  

  constructor() {

  }

  ngOnInit() {
  }


  public setModalFormulario() {
    this.tabla.setLectura(false);
    this.tabla.setTipoFormulario();
    this.tabla.setNumeroColumnasGrid(1);
    this.tabla.setUnico();
    this.tabla.ocultarBotones();
  }

  public abrir() {
    this.modalTabla.abrir();
  }

  public cerrar() {
    this.modalTabla.cerrar();
  }

  aceptar() {
    this.modalTabla.aceptar();
  }

  cancelar() {
    this.modalTabla.cerrar();
  }


  completarLoading() {
    this.modal.ejecutando = false;
  }


  get tabla(): TablaComponent {
    return this.tabTablaModal;
  }

  get modal(): ModalComponent {
    return this.modalTabla;
  }

  setWidth(width: string) {
    this.modalTabla.width = width;
  }

  setHeight(height: string) {
    this.modalTabla.height = height
  }

  public setTitulo(titulo: string) {
    this.modalTabla.titulo = titulo;
  }


}
