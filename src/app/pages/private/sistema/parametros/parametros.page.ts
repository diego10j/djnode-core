import { Component, OnInit, ViewChild } from '@angular/core';
import { Pantalla } from '@djnode/clases/pantalla';
import { ModalTablaComponent } from '@djnode/componentes/modal-tabla/modal-tabla.component';
import { TablaComponent } from '@djnode/componentes/tabla/tabla.component';
import Condicion from '@djnode/interfaces/condicion';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.page.html',
  styleUrls: ['./parametros.page.scss'],
})
export class ParametrosPage extends Pantalla {


  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('modTabla2', { static: false }) modTabla2: ModalTablaComponent;

  condicionTabla2: Condicion = { condicion: 'ide_para = ?', valores: [-1] };


  async ionViewWillEnter() {
    this.barra.ocultarBotonGuardar();
    // Configura Tabla opcion
    await this.tabTabla1.setTabla('sis_parametros', 'ide_para', 1);
    this.tabTabla1.setTitulo('Parámetros del Sistema');
    this.tabTabla1.getColumna('nom_para').setFiltro(true);
    this.tabTabla1.getColumna('valor_para').setFiltro(true);
    this.tabTabla1.getColumna('descripcion_para').setFiltro(true);
    //this.tabTabla1.getColumna('tabla_para').setVisible(false);
    //this.tabTabla1.getColumna('campo_codigo_para').setVisible(false);
    //this.tabTabla1.getColumna('campo_nombre_para').setVisible(false);
    this.tabTabla1.getColumna('ide_empr').setVisible(false);
    this.tabTabla1.getColumna('ide_modu').setCombo('sis_modulo', 'ide_modu', 'nom_modu');
    this.tabTabla1.getColumna('ide_modu').setFiltro(true);
    this.tabTabla1.setLectura(true);
    this.tabTabla1.setCampoOrden('nom_para');
    this.tabTabla1.setFilasPorPagina(20);
    this.tabTabla1.dibujar();

    //ModalTabla
    this.modTabla2.setModalFormulario();
    await this.modTabla2.tabla.setTabla('sis_parametros', 'ide_para', 2);
    this.modTabla2.tabla.getColumna('tabla_para').setVisible(false);
    this.modTabla2.tabla.getColumna('campo_codigo_para').setVisible(false);
    this.modTabla2.tabla.getColumna('campo_nombre_para').setVisible(false);
    this.modTabla2.tabla.getColumna('ide_empr').setVisible(false);
    // Para no hacer otra consulta ocupa el combo de la tabla1
    this.modTabla2.tabla.getColumna('ide_modu').listaCombo = this.tabTabla1.getColumna('ide_modu').listaCombo;
    this.modTabla2.tabla.setCondiciones(this.condicionTabla2);
    this.modTabla2.onClickAceptar = () => { this.guardar(); };
    this.modTabla2.tabla.dibujar(); // última

  }



  guardar(): void {

  }

  insertar(): void {

  }

  eliminar(): void {

  }

  importar(): void {

  }

  configurar(): void {
    if (this.utilitario.isDefined(this.tabTabla1.seleccionada)) {
      this.modTabla2.setTitulo('Modificar Parámetro');
      this.condicionTabla2.valores = [this.tabTabla1.getValorSeleccionado()];
      this.modTabla2.tabla.setCondiciones(this.condicionTabla2);
      this.modTabla2.tabla.ejecutar();
      this.modTabla2.abrir();
    }
    else {
      this.mensaje.agregarMensajeAdvertencia('No se encuentra seleccionado ningun registro');
    }
  }

}
