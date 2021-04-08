import { Component, ViewChild } from '@angular/core';
import { Pantalla } from '@djnode/clases/pantalla';
import { ModalTablaSeleccionComponent } from '@djnode/componentes/modal-tabla-seleccion/modal-tabla-seleccion.component';
import { ModalTablaComponent } from '@djnode/componentes/modal-tabla/modal-tabla.component';
import { TablaComponent } from '@djnode/componentes/tabla/tabla.component';
import Condicion from '@djnode/interfaces/condicion';
import { BotonComponent } from '../../../../framework/componentes/boton/boton.component';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.page.html',
  styleUrls: ['./parametros.page.scss'],
})
export class ParametrosPage extends Pantalla {


  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('modTabla2', { static: false }) modTabla2: ModalTablaComponent;

  @ViewChild('botImportar', { static: false }) botImportar: BotonComponent;

  @ViewChild('modTabSeleccion', { static: false }) modTabSeleccion: ModalTablaSeleccionComponent;

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
    this.modTabla2.setWidth('40%');
    await this.modTabla2.tabla.setTabla('sis_parametros', 'ide_para', 2);
    this.modTabla2.tabla.getColumna('tabla_para').setVisible(false);
    this.modTabla2.tabla.getColumna('campo_codigo_para').setVisible(false);
    this.modTabla2.tabla.getColumna('campo_nombre_para').setVisible(false);
    this.modTabla2.tabla.getColumna('nom_para').setLectura(true);
    this.modTabla2.tabla.getColumna('ide_empr').setVisible(false);
    this.modTabla2.tabla.getColumna('valor_para').setIconoGrupo('pi pi-check-circle');
    this.modTabla2.tabla.getColumna('valor_para').setLabelGrupo('Modificar');
    this.modTabla2.tabla.getColumna('valor_para').onClickBoton = () => { this.abrirTablaSeleccion(); };
    this.modTabla2.tabla.onDibujar = () => { this.onDibujarTablaModal(); };
    // Para no hacer otra consulta ocupa el combo de la tabla1
    this.modTabla2.tabla.getColumna('ide_modu').setComboLista(this.tabTabla1.getColumna('ide_modu').listaCombo);
    this.modTabla2.tabla.setCondiciones(this.condicionTabla2);
    this.modTabla2.modal.onClickAceptar = () => { this.acpetarConfiguracion(); };
    this.modTabla2.tabla.dibujar(); // última

  }

  onDibujarTablaModal() {
    if (this.utilitario.isDefined(this.modTabla2.tabla.getValor('tabla_para'))) {
      this.modTabla2.tabla.getColumna('valor_para').isGrupo = true;
      this.modTabla2.tabla.getColumna('valor_para').setLectura(true);
    }
    else {
      this.modTabla2.tabla.getColumna('valor_para').setLectura(false);
      this.modTabla2.tabla.getColumna('valor_para').isGrupo = false;
    }
  }


  guardar(): void {

  }

  insertar(): void {

  }

  eliminar(): void {

  }

  acpetarConfiguracion() {

  }

  acpetarTablaSeleccion() {

  }

  abrirTablaSeleccion(): void {
    this.modTabSeleccion.setTablaSeleccion(this.modTabla2.tabla.getValor('tabla_para'), this.modTabla2.tabla.getValor('campo_codigo_para'), this.modTabla2.tabla.getValor('campo_nombre_para'), 3)
    this.modTabSeleccion.setTitulo( `Modificar ${this.modTabla2.tabla.getValor('nom_para')}`)
    this.modTabSeleccion.abrir();
  }

  async importar(): Promise<void> {
    this.botImportar.iniciarLoading();//Bloquea el botón 
    this.sistema.importarParametros().subscribe(resp => {
      const respuesta: any = resp;
      this.mensaje.agregarMensajeExito(respuesta.mensaje);
      this.tabTabla1.actualizar();      
      this.botImportar.completarLoading(); // Se activa al finalizar el proceso
    }, (err) => {
      this.utilitario.agregarMensajeErrorServicioWeb(err);
      this.botImportar.completarLoading(); // Se activa 
    }
    );
  }


  configurar(): void {
    if (this.utilitario.isDefined(this.tabTabla1.seleccionada)) {
      this.modTabla2.setTitulo( `Configurar ${this.modTabla2.tabla.getValor('nom_para')}`)
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
