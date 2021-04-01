import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-tabla-seleccion',
  templateUrl: './modal-tabla-seleccion.component.html',
  styleUrls: ['./modal-tabla-seleccion.component.scss'],
})
export class ModalTablaSeleccionComponent implements OnInit {

  @ViewChild('modalTabSelecccion', { static: false }) modalTabSelecccion: ModalComponent;

  constructor() { }

  ngOnInit() {}

  abrir(){
    this.modalTabSelecccion.abrir(); 
  }

}
