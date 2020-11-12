import { Component, OnInit, Input } from '@angular/core';
import Columna from '../../clases/columna';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-formato-tabla',
  templateUrl: './formato-tabla.component.html',
  styleUrls: ['./formato-tabla.component.scss'],
})
export class FormatoTablaComponent implements OnInit {

  @Input() columnas: Columna[];
  isOrden = true;
  seleccionada: Columna = new Columna();
  slideOpts = {
    centeredSlides: 'true',
    allowSlidePrev: false,
    allowSlideNext: false
  };


  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.seleccionada = this.columnas[0];
  }

  closeModal() {
    this.modalController.dismiss();
  }

  cambiarSegmento(valor) {
    this.isOrden = valor;
  }

  guardar() {
    let orden = 1;
    for (const columna of this.columnas) {
      columna.orden = orden;
      orden++;
    }
    this.modalController.dismiss({
      columnas: this.columnas
    });
  }


}
