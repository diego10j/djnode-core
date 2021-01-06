import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { ArbolComponent } from '../../../../framework/componentes/arbol/arbol.component';
import { Pantalla } from '../../../../framework/clases/pantalla';
import { TablaComponent } from '../../../../framework/componentes/tabla/tabla.component';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage extends Pantalla {

  @ViewChild('arbArbol', { static: false }) arbArbol: ArbolComponent;
  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('tabTabla2', { static: false }) tabTabla2: TablaComponent;
  @ViewChild('tabTabla3', { static: false }) tabTabla3: TablaComponent;
  @ViewChild('tabTabla4', { static: false }) tabTabla4: TablaComponent;

  async ionViewWillEnter() {
    //this.init(); //OBLIGATORIO
    // Configura Arbol
    this.arbArbol.setArbol('sis_opcion', 'ide_opci', 'nom_opci', 'sis_ide_opci');
    this.arbArbol.setTitulo('OPCIONES');
    this.arbArbol.dibujar(); // última

    // Configura Tabla opcion
    await this.tabTabla1.setTabla('sis_opcion', 'ide_opci', 1);
    this.tabTabla1.setCampoOrden('nom_opci');
    this.tabTabla1.setFilasPorPagina(10);
    //this.tabTabla1.getColumna('sis_ide_opci').setCombo('sis_opcion', 'ide_opci', 'nom_opci,tipo_opci');
    this.tabTabla1.agregarRelacion(this.tabTabla2);
    this.tabTabla1.agregarRelacion(this.tabTabla3);
    this.tabTabla1.agregarRelacion(this.tabTabla4);
    this.tabTabla1.setLectura(false);
    this.tabTabla1.agregarArbol(this.arbArbol);
    this.tabTabla1.dibujar(); // última
    //this.tabTabla1.getColumna('sis_ide_opci').setVisible(true);

    await this.tabTabla2.setTabla('sis_tabla', 'ide_tabl', 2);
    this.tabTabla2.setCampoOrden('numero_tabl');
    this.tabTabla2.setFilasPorPagina(5);
    this.tabTabla2.setLectura(false);
    this.tabTabla2.dibujar(); // última


    await this.tabTabla3.setTabla('sis_reporte', 'ide_repo', 3);
    this.tabTabla3.setCampoOrden('nom_repo');
    this.tabTabla3.setFilasPorPagina(5);
    this.tabTabla3.setLectura(false);
    this.tabTabla3.dibujar(); // última


    await this.tabTabla4.setTabla('sis_objeto_opcion', 'ide_obop', 4);
    this.tabTabla4.setCampoOrden('nom_obop');
    this.tabTabla4.setFilasPorPagina(5);
    this.tabTabla4.setLectura(false);
    this.tabTabla4.dibujar(); // última
  }

  insertar(): void {

    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.insertar();
    }
    else if (this.tabTabla2.isFocus()) {
      this.tabTabla2.insertar();
    }
    else if (this.tabTabla3.isFocus()) {
      this.tabTabla3.insertar();
    }
    else if (this.tabTabla4.isFocus()) {
      this.tabTabla4.insertar();
    }
  }

  eliminar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.eliminar();
    }
    else if (this.tabTabla2.isFocus()) {
      this.tabTabla2.eliminar();
    }
    else if (this.tabTabla3.isFocus()) {
      this.tabTabla3.eliminar();
    }
    else if (this.tabTabla4.isFocus()) {
      this.tabTabla4.eliminar();
    }
  }

  async guardar() {
    if (await this.tabTabla1.isGuardar()) {
      if (await this.tabTabla2.isGuardar()) {
        if (await this.tabTabla3.isGuardar()) {
          if (await this.tabTabla4.isGuardar()) {
            this.utilitario.guardarPantalla(this.tabTabla1, this.tabTabla2, this.tabTabla3, this.tabTabla4);
          }
        }
      }
    }

  }
}
