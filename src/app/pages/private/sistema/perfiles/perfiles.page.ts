import { Component, OnInit, ViewChild } from '@angular/core';
import { TablaComponent } from '@djnode/componentes/tabla/tabla.component';
import { Pantalla } from '@djnode/clases/pantalla';
import Condicion from '@djnode/interfaces/condicion';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.page.html',
  styleUrls: ['./perfiles.page.scss'],
})
export class PerfilesPage extends Pantalla {



  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;


  async ionViewWillEnter() {
    await this.tabTabla1.setTabla('sis_perfil', 'ide_perf', 1);
    this.tabTabla1.setLectura(true);
    this.tabTabla1.setTitulo('Perfiles del sistema');
    this.tabTabla1.setCampoOrden('nom_perf');
    this.tabTabla1.setFilasPorPagina(15);
    this.tabTabla1.mostrarBotonModificar();
    this.tabTabla1.mostrarBotonInsertar();
    this.tabTabla1.mostrarBotonEliminar();
    this.tabTabla1.onModificar = () => { this.modificar(); };
    this.tabTabla1.onEliminar = () => { this.eliminar(); };
    this.tabTabla1.onInsertar = () => { this.insertar(); };
    this.tabTabla1.dibujar(); // última
  }

  eliminar() {
    if (this.utilitario.isDefined(this.tabTabla1.seleccionada)) {
      const nombrePerfil = this.tabTabla1.getValor('nom_perf');
      const mensaje = 'Está seguro de que desea eliminar el perfil <strong> ' + nombrePerfil + ' </strong>?';
      this.utilitario.confirmar(mensaje, () => this.aceptarEliminar());
    }
    else {
      this.mensaje.agregarMensajeAdvertencia('No se encuentra seleccionado ningun registro');
    }
  }

  async aceptarEliminar() {
    let condicionEliminar: Condicion = { condicion: 'ide_perf = ?', valores: [this.tabTabla1.getValorSeleccionado()] };
    let objEliminar = this.utilitario.getObjSqlEliminar('sis_perfil', [condicionEliminar]);
    if (await this.utilitario.ejecutarListaSQL([objEliminar])) {
      this.tabTabla1.actualizar();
    }
  }

  modificar(): void {
    if (this.utilitario.isDefined(this.tabTabla1.seleccionada)) {
      this.utilitario.abrirPagina('detalle-perfil/' + this.tabTabla1.getValorSeleccionado());
    }
    else {
      this.mensaje.agregarMensajeAdvertencia('No se encuentra seleccionado ningun registro');
    }
    
  }

  guardar(): void {

  }
  insertar(): void {
    this.utilitario.abrirPagina('detalle-perfil');
  }


}
