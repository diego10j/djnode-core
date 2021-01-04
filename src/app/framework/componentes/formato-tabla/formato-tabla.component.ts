import { Component, OnInit, Input } from '@angular/core';
import Columna from '../../clases/columna';
import { ModalController } from '@ionic/angular';
import { UtilitarioService } from '../../../services/utilitario.service';
import { SistemaService } from '../../servicios/sistema.service';
import Tabla from '../../clases/tabla';

@Component({
  selector: 'app-formato-tabla',
  templateUrl: './formato-tabla.component.html',
  styleUrls: ['./formato-tabla.component.scss'],
})
export class FormatoTablaComponent implements OnInit {

  @Input() columnas: Columna[];
  @Input() tabla: Tabla;
  cargando=false;
  columnasVisibles: Columna[];

  isOrden = true;
  seleccionada: Columna = new Columna();

  constructor(private modalController: ModalController,
    private sistemaService: SistemaService,
    private utilitario: UtilitarioService) { }

  ngOnInit() {
    this.columnasVisibles = this.columnas.filter(col => col.visible === true);
    this.seleccionada = this.columnasVisibles[0];
  }

  closeModal() {
    this.modalController.dismiss();
  }

  cambiarSegmento(valor) {
    this.isOrden = valor;
  }

  guardar() {
    this.cargando=true;
    let ide_opci = this.utilitario.getIdeOpci();
    let orden = 1;
    //Ordena
    for (const columna of this.columnasVisibles) {
      const colV=this.columnas.find(col => col.nombre === columna.nombre);
      colV.orden = orden;
      orden++;
    }
    this.sistemaService.configurarTabla(ide_opci, this.tabla, this.columnas).subscribe(resp => {
      this.modalController.dismiss({
        columnas: this.columnas
      });
      this.cargando=false;
    }, (err) => {
      this.cargando=false;
      this.utilitario.agregarMensajeError(err.error.mensaje);
    });
  }

  ordenarColumnas() {
    this.columnas.sort((a, b) => (a.orden < b.orden ? -1 : 1));
  }

}
