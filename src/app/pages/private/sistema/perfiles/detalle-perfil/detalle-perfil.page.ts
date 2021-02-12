import { Component, ViewChild } from '@angular/core';
import { Pantalla } from '@djnode/clases/pantalla';
import { TablaComponent } from '@djnode/componentes/tabla/tabla.component';
import { Params } from '@angular/router';
import Condicion from '@djnode/interfaces/condicion';

@Component({
  selector: 'app-detalle-perfil',
  templateUrl: './detalle-perfil.page.html',
  styleUrls: ['./detalle-perfil.page.scss'],
})
export class DetallePerfilPage extends Pantalla {

  id: string;

  condicion: Condicion = { condicion: 'ide_perf = ?', valores: [-1] };

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('tabTabla2', { static: false }) tabTabla2: TablaComponent;
  @ViewChild('tabTabla3', { static: false }) tabTabla3: TablaComponent;
  @ViewChild('tabTabla4', { static: false }) tabTabla4: TablaComponent;
  @ViewChild('tabTabla5', { static: false }) tabTabla5: TablaComponent;

  async ionViewWillEnter() {
    //Recupera parametro id
    this.route.params.subscribe((params: Params) => this.id = params.id);
    if (this.utilitario.isDefined(this.id)) {
      //Modifica
      this.condicion.valores = [this.id];
    }
    this.tabTabla1.ocultarBotonEliminar();
    this.tabTabla1.ocultarBotonInsertar();
    this.tabTabla1.setFilasPorPagina(5);
    await this.tabTabla1.setTabla('sis_perfil', 'ide_perf', 1);
    //this.tabTabla1.setTitulo('Perfiles');
    this.tabTabla1.setCondiciones(this.condicion);
    this.tabTabla1.setCampoOrden('nom_perf');
    this.tabTabla1.setLectura(false);
    this.tabTabla1.setTipoFormulario();
    this.tabTabla1.setUnico();
    this.tabTabla1.agregarRelacion(this.tabTabla2);
    this.tabTabla1.agregarRelacion(this.tabTabla3);
    this.tabTabla1.agregarRelacion(this.tabTabla4);
    this.tabTabla1.agregarRelacion(this.tabTabla5);
    this.tabTabla1.dibujar(); // última

    await this.tabTabla2.setTabla('sis_perfil_opcion', 'ide_peop', 2);
    this.tabTabla2.getColumna('ide_opci').setComboSql('select a.ide_opci,a.NOM_OPCI,'
      + '( case when b.sis_ide_opci is null then "PANTALLA" else "MENU" end ) as nuevo '
      + 'from SIS_OPCION a left join ( '
      + 'select DISTINCT sis_ide_opci   from SIS_OPCION  where sis_ide_opci  in (  '
      + 'select ide_opci from SIS_OPCION ) ) b on a.IDE_OPCI=b.SIS_IDE_OPCI order by a.NOM_OPCI');
    this.tabTabla2.setFilasPorPagina(15);
    this.tabTabla2.getColumna('ide_opci').setAutocompletar();
    this.tabTabla2.setLectura(false);
    this.tabTabla2.dibujar(); // última

    await this.tabTabla3.setTabla('sis_perfil_reporte', 'ide_pere', 3);
    this.tabTabla3.setFilasPorPagina(15);
    this.tabTabla3.setLectura(false);
    this.tabTabla3.dibujar(); // última


    await this.tabTabla4.setTabla('sis_perfil_objeto', 'ide_peob', 4);
    this.tabTabla4.setFilasPorPagina(15);
    this.tabTabla4.setLectura(false);
    this.tabTabla4.dibujar(); // última


    await this.tabTabla5.setTabla('sis_perfil_campo', 'ide_peca', 5);
    this.tabTabla5.setFilasPorPagina(15);
    this.tabTabla5.setLectura(false);
    this.tabTabla5.dibujar(); // última
  }

  async guardar() {
    if (await this.tabTabla1.isGuardar()) {
      if (await this.tabTabla2.isGuardar()) {
        if (await this.tabTabla3.isGuardar()) {
          if (await this.tabTabla4.isGuardar()) {
            if (await this.tabTabla5.isGuardar()) {
              this.utilitario.guardarPantalla(this.tabTabla1, this.tabTabla2, this.tabTabla3, this.tabTabla4, this.tabTabla5);
            }
          }
        }
      }
    }
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
    else if (this.tabTabla5.isFocus()) {
      this.tabTabla5.insertar();
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
    else if (this.tabTabla5.isFocus()) {
      this.tabTabla5.eliminar();
    }
  }



}
