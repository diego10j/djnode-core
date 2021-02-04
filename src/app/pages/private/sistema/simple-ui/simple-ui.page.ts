import { Component, OnInit, ViewChild } from '@angular/core';
import { Pantalla } from '../../../../framework/clases/pantalla';
import { TablaComponent } from '../../../../framework/componentes/tabla/tabla.component';
import { ModalTablaComponent } from '../../../../framework/componentes/modal-tabla/modal-tabla.component';
import Condicion from '../../../../framework/interfaces/condicion';

@Component({
  selector: 'app-simple-ui',
  templateUrl: './simple-ui.page.html',
  styleUrls: ['./simple-ui.page.scss'],
})
export class SimpleUiPage extends Pantalla {



  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('modTabla2', { static: false }) modTabla2: ModalTablaComponent;

  condicionTabla2: Condicion = { condicion: '?', valores: [-1] };


  async ionViewWillEnter() {
    await this.tabTabla1.setTablaConfiguracion(1);
    this.condicionTabla2.condicion = `${this.tabTabla1.campoPrimario} = ?`;
    this.tabTabla1.setLectura(false);
    this.tabTabla1.mostrarBotonModificar();
    this.tabTabla1.onModificar = () => { this.modificar(); };
    this.tabTabla1.onEliminar = () => { this.eliminar(); };
    this.tabTabla1.onInsertar = () => { this.insertar(); };
    this.tabTabla1.setTipoSeleccionSimple();
    this.tabTabla1.dibujar(); // última


        //ModalTabla
        this.modTabla2.setModalFormulario();
        await this.modTabla2.tabla.setTabla(this.tabTabla1.tabla.nombreTabla, this.tabTabla1.campoPrimario, 2);
        this.modTabla2.tabla.setCondiciones(this.condicionTabla2);
        this.modTabla2.onClickAceptar = () => { this.guardar(); };
        this.modTabla2.tabla.dibujar(); // última


  }

  eliminar() {
    if (this.utilitario.isDefined(this.tabTabla1.seleccionada)) {
      const mensaje = 'Está seguro de que desea eliminar el registro seleccionado?';
      this.utilitario.confirmar(mensaje, () => this.aceptarEliminar());
    }
    else {
      this.mensaje.agregarMensajeAdvertencia('No se encuentra seleccionado ningun registro');
    }
  }

  async aceptarEliminar() {
    this.condicionTabla2.valores = [this.tabTabla1.getValorSeleccionado()];
    let objEliminar = this.utilitario.getObjSqlEliminar(this.tabTabla1.tabla.nombreTabla, [this.condicionTabla2]);
    await this.utilitario.ejecutarListaSQL([objEliminar]);
    if (await this.tabTabla1.isGuardar()) {
      await this.utilitario.guardarPantalla(this.tabTabla1);
      this.tabTabla1.actualizar();
    }
  }

  modificar(): void {
    if (this.utilitario.isDefined(this.modTabla2.tabla.seleccionada)) {
      this.modTabla2.setTitulo('Modificar');
      this.condicionTabla2.valores = [this.tabTabla1.getValorSeleccionado()];
      this.modTabla2.tabla.setCondiciones(this.condicionTabla2);
      this.modTabla2.tabla.ejecutar();
      this.modTabla2.abrir();
    }
    else {
      this.mensaje.agregarMensajeAdvertencia('No se encuentra seleccionado ningun registro');
    }
  }

  async guardar() {
    if (await this.modTabla2.tabla.isGuardar()) {
      await this.utilitario.guardarPantalla(this.modTabla2.tabla);
      this.tabTabla1.actualizar();
      this.modTabla2.cerrar();
    }
    else{
      this.modTabla2.ejecutando = false;
    }
  }

  insertar(): void {
    this.modTabla2.setTitulo('Crear');
    this.condicionTabla2.valores = [-1];
    this.modTabla2.tabla.ejecutar();
    this.modTabla2.abrir();
  }


}
