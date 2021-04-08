import { Component, OnInit, Input, ContentChild, TemplateRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilitarioService } from '@servicios/utilitario.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() titulo = 'Título';
  @Input() mostrarBotonCancelar = true;
  @Input() labelBotonCancelar = 'Cancelar';
  @Input() mostrarBotonAceptar = true;
  @Input() labelBotonAceptar = 'Aceptar';
  @Input() visible = false;

  @Input() width = "65%";
  @Input() height = "55%";

  ejecutando = false;

  //Eventos
  public onClickAceptar?: (event?: any) => void;
  public onClickCancelar?: (event?: any) => void;

  constructor() {
    this.ejecutando = false;
  }

  ngOnInit() {
  }

  public setTitulo(titulo:string){
    this.titulo=titulo;
  }

  public abrir() {
    this.visible = true;
  }

  public cerrar() {
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

  ngOnDestroy() {
    this.ejecutando = false;
    this.visible = false;
  }

}
