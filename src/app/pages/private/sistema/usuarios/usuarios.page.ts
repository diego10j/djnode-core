import { Component, ViewChild } from '@angular/core';
import { TablaComponent } from '../../../../framework/componentes/tabla/tabla.component';
import { Pantalla } from '../../../../framework/clases/pantalla';
import { ModalTablaComponent } from '../../../../framework/componentes/modal-tabla/modal-tabla.component';
import Condicion from '../../../../framework/interfaces/condicion';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage extends Pantalla {


  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  @ViewChild('modTabla2', { static: false }) modTabla2: ModalTablaComponent;

  condicionTabla2: Condicion = { condicion: 'ide_usua = ?', valores: [-1] };
  
  async ionViewWillEnter() {
    this.barra.ocultarBotonGuardar();
    // Configura Tabla opcion
    await this.tabTabla1.setTablaServicio('api/usuario/listaUsuarios', {}, 1);
    this.tabTabla1.setTitulo('Usuarios del Sistema');
    this.tabTabla1.getColumna('avatar_usua').setAvatar('nom_usua');
    this.tabTabla1.getColumna('nick_usua').setFiltro(true);
    this.tabTabla1.getColumna('nom_usua').setFiltro(true);
    this.tabTabla1.getColumna('activo_usua').setFiltro(true);
    this.tabTabla1.setFilasPorPagina(20);
    this.tabTabla1.mostrarBotonModificar();
    this.tabTabla1.mostrarBotonInsertar();
    this.tabTabla1.mostrarBotonEliminar();
    this.tabTabla1.onModificar = () => { this.modificar(); };
    this.tabTabla1.setExpandible('mail_usua,fecha_reg_usua,nom_perf');
    this.tabTabla1.dibujar();

    //ModalTabla
    this.modTabla2.setModalFormulario();
    await this.modTabla2.tabla.setTabla('sis_usuario', 'ide_usua', 2);
    this.modTabla2.tabla.getColumna('ide_empr').setVisible(false);
    this.modTabla2.tabla.getColumna('ide_perf').setCombo('sis_perfil', 'ide_perf', 'nom_perf');
    this.modTabla2.tabla.getColumna('fecha_reg_usua').setValorDefecto(this.utilitario.getFechaActual());
    this.modTabla2.tabla.getColumna('activo_usua').setValorDefecto(true);
    this.modTabla2.tabla.getColumna('avatar_usua').setUpload();
    this.modTabla2.tabla.setCondiciones(this.condicionTabla2);
    this.modTabla2.onClickAceptar = () => { this.guardar(); };
    this.modTabla2.tabla.dibujar(); // última

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
    this.modTabla2.setTitulo('Crear Usuario');
    this.condicionTabla2.valores = [-1];
    this.modTabla2.tabla.ejecutar();
    this.modTabla2.abrir();
  }

  eliminar() {
    if (this.utilitario.isDefined(this.modTabla2.tabla.seleccionada)) {
      const nombreUsuario = this.tabTabla1.getValor('nom_usua');
      const mensaje = 'Está seguro de que desea eliminar el usuario <strong> ' + nombreUsuario + ' </strong>?';
      this.utilitario.confirmar(mensaje, () => this.eliminarUsuario());
    }
    else {
      this.mensaje.agregarMensajeAdvertencia('No se encuentra seleccionado ningun registro');
    }
  }

  async eliminarUsuario() {
    this.condicionTabla2.valores = [this.tabTabla1.getValorSeleccionado()];
    let objEliminar = this.utilitario.getObjSqlEliminar('sis_usuario', [this.condicionTabla2]);
    await this.utilitario.ejecutarListaSQL([objEliminar]);
    if (await this.tabTabla1.isGuardar()) {
      await this.utilitario.guardarPantalla(this.tabTabla1);
      this.tabTabla1.actualizar();
    }
  }

  modificar(): void {
    if (this.utilitario.isDefined(this.modTabla2.tabla.seleccionada)) {
      this.modTabla2.setTitulo('Modificar Usuario');
      this.condicionTabla2.valores = [this.tabTabla1.getValorSeleccionado()];
      this.modTabla2.tabla.setCondiciones(this.condicionTabla2);
      this.modTabla2.tabla.ejecutar();
      this.modTabla2.abrir();
    }
    else {
      this.mensaje.agregarMensajeAdvertencia('No se encuentra seleccionado ningun registro');
    }
  }

  resetearClave() {

  }

}
