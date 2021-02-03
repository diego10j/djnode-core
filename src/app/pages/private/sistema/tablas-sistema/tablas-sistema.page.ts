import { Component, ViewChild } from '@angular/core';
import { Pantalla } from '../../../../framework/clases/pantalla';
import { TablaComponent } from '../../../../framework/componentes/tabla/tabla.component';

@Component({
  selector: 'app-tablas-sistema',
  templateUrl: './tablas-sistema.page.html',
  styleUrls: ['./tablas-sistema.page.scss'],
})
export class TablasSistemaPage extends Pantalla {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('tabTabla2', { static: false }) tabTabla2: TablaComponent;
  @ViewChild('tabTabla3', { static: false }) tabTabla3: TablaComponent;

  async ionViewWillEnter() {

    // Configura Tabla opcion
    await this.tabTabla1.setTabla('sis_tabla', 'ide_tabl', 1);
    this.tabTabla1.ocultarColumnas();
    this.tabTabla1.setTitulo('Tablas del Sistema');
    this.tabTabla1.setCampoOrden('tabla_tabl');
    this.tabTabla1.setFilasPorPagina(10);
    this.tabTabla1.getColumna('ide_opci').setCombo('sis_opcion', 'ide_opci', 'nom_opci');
    this.tabTabla1.getColumna('ide_opci').setVisible(true);
    this.tabTabla1.getColumna('ide_opci').setFiltro(true);
    this.tabTabla1.getColumna('tabla_tabl').setOrden(0);
    this.tabTabla1.getColumna('tabla_tabl').setVisible(true);
    this.tabTabla1.getColumna('tabla_tabl').setFiltro(true);
    this.tabTabla1.getColumna('numero_tabl').setVisible(true);
    this.tabTabla1.getColumna('primaria_tabl').setVisible(true);
    this.tabTabla1.agregarRelacion(this.tabTabla2);
    this.tabTabla1.agregarRelacion(this.tabTabla3);
    this.tabTabla1.setTipoSeleccionSimple();
    this.tabTabla1.dibujar();


    await this.tabTabla2.setTabla('sis_campo', 'ide_camp', 2);
    this.tabTabla2.ocultarBotonInsertar();
    this.tabTabla2.ocultarBotonEliminar();
    this.tabTabla2.setCampoOrden('orden_camp');
    this.tabTabla2.getColumna('nom_camp').setLectura(true);
    this.tabTabla2.getColumna('nom_camp').setFiltro(true);
    this.tabTabla2.setFilasPorPagina(15);
    this.tabTabla2.setLectura(false);
    this.tabTabla2.dibujar(); // última
    this.tabTabla2.itemEliminar.disabled = true;
    this.tabTabla2.itemInsertar.disabled = true;

    await this.tabTabla3.setTabla('sis_combo', 'ide_comb', 3);
    this.tabTabla3.setFilasPorPagina(10);
    this.tabTabla3.setLectura(false);
    this.tabTabla3.dibujar(); // última
  }

  insertar(): void {
    if (this.tabTabla3.isFocus()) {
      this.tabTabla3.insertar();
    }
  }

  eliminar(): void {
    if (this.tabTabla3.isFocus()) {
      this.tabTabla3.eliminar();
    }
  }

  confirmarEliminar(): void {

    const nombreTabla = this.tabTabla1.getValor('tabla_tabl');
    if (!this.tabTabla2.isEmpty()) {
      const mensaje = 'Está seguro de que desea eliminar la configuración de la tabla <strong> ' + nombreTabla + ' </strong>?';
      this.utilitario.confirmar(mensaje, () => this.eliminarConfiguracion());
    }
    else {
      this.mensaje.agregarMensajeAdvertencia('No existen registos');
    }
  }

  eliminarConfiguracion(): void {
    const ide_tabl = this.tabTabla1.getValorSeleccionado();
    this.tabTabla1.buscando = true;
    //Configuracion inicial de la tabla
    this.utilitario.sistemaService.eliminarConfiguracionTabla(ide_tabl).subscribe(resp => {
      this.tabTabla1.seleccionada = null;
      this.tabTabla1.actualizar();
    }, (err) => {
      this.utilitario.agregarMensajeError('<p>' + err.error.mensaje + '</p> <p><strong>Origen: </strong>' + err.message + '</p> ');
    });
  }



  async guardar() {
    if (await this.tabTabla2.isGuardar()) {
      if (await this.tabTabla3.isGuardar()) {
        this.utilitario.guardarPantalla(this.tabTabla1, this.tabTabla2, this.tabTabla3);
      }
    }
  }
}
