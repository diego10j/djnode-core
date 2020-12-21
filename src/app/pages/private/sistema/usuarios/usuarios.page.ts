import { Component, OnInit, ViewChild } from '@angular/core';
import { TablaComponent } from '../../../../framework/componentes/tabla/tabla.component';
import { Pantalla } from '../../../../framework/clases/pantalla';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage extends Pantalla {


  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;


  async ionViewWillEnter() {

    // Configura Tabla opcion
    await this.tabTabla1.setTablaServicio('api/usuario/listaUsuarios', {}, 1);
    this.tabTabla1.setTitulo('Usuarios del Sistema');
    this.tabTabla1.getColumna('avatar_usua').setUpload();
    this.tabTabla1.getColumna('nick_usua').setFiltro(true);
    this.tabTabla1.getColumna('nom_usua').setFiltro(true);
    this.tabTabla1.getColumna('activo_usua').setFiltro(true);
    this.tabTabla1.setFilasPorPagina(20);
    this.tabTabla1.setExpandible('mail_usua,avatar_usua,fecha_reg_usua,nom_perf');
    this.tabTabla1.dibujar();
    this.utilitario.cerrarLoading(); //Cierra el loading

  }

  guardar(): void {
  }
  insertar(): void {

  }
  eliminar(): void {

  }

}
