import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { TablaComponent } from '../tabla/tabla.component';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-modal-tabla-seleccion',
  templateUrl: './modal-tabla-seleccion.component.html',
  styleUrls: ['./modal-tabla-seleccion.component.scss'],
})
export class ModalTablaSeleccionComponent {

  @ViewChild('modalTabSelecccion', { static: false }) modalTabSelecccion: ModalComponent;
  @ViewChild('tablaSeleccion', { static: false }) tablaSeleccion: TablaComponent;

  private tipoSeleccion?: 'simple' | 'multiple' = 'multiple';

  private nombreTabla: string;
  private campoPrimario: string;
  private numeroTabla: number;
  private campoNombre: string;

  private metodoServicio: string;
  private parametrosServicio: any;

  public setTablaSeleccion(nombreTabla: string, campoPrimario: string, campoNombre: string, numeroTabla: number) {
    this.nombreTabla = nombreTabla;
    this.campoPrimario = campoPrimario;
    this.campoNombre = campoNombre;
    this.numeroTabla = numeroTabla;
  }

  public setTablaSeleccionServicio(metodoServicio: string, parametrosServicio: {}, campoPrimario: string, campoNombre: string, numeroTabla: number) {
    this.metodoServicio = metodoServicio;
    this.parametrosServicio = parametrosServicio;
    this.campoNombre = campoNombre;
    this.numeroTabla = numeroTabla;
  }

  public setTipoSeleccionSimple() {
    this.tipoSeleccion = 'simple';
  }


  constructor(public utilitario: UtilitarioService) {
  }



  async abrir() {
    this.modalTabSelecccion.abrir();
    if (this.utilitario.isDefined(this.nombreTabla)) {
      this.tablaSeleccion.isDibujar = false;
      await this.tablaSeleccion.setTabla(this.nombreTabla, this.campoPrimario, this.numeroTabla);
      this.configuracionesTabla();
    }

    if (this.utilitario.isDefined(this.metodoServicio)) {
      this.tablaSeleccion.isDibujar = false;
      await this.tablaSeleccion.setTablaServicio(this.metodoServicio, this.parametrosServicio, this.numeroTabla);
      this.configuracionesTabla();
    }
   
  }

  /**
   * Configuraciones dela tabla
   */
  private configuracionesTabla() {
    this.tablaSeleccion.setLectura(true);
    this.tablaSeleccion.tipoSeleccion = this.tipoSeleccion;
    this.tablaSeleccion.selectionMode = null;
    this.tablaSeleccion.ocultarColumnas();
    this.tablaSeleccion.getColumna(this.campoNombre).setVisible(true);
    this.tablaSeleccion.getColumna(this.campoNombre).setNombreVisual('NOMBRE');
    this.tablaSeleccion.dibujar(); // última
  }

  setTitulo(titulo: string) {
    this.modalTabSelecccion.titulo = titulo;
  }

}
