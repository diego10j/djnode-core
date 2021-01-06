import { Component, OnInit, ViewChild } from '@angular/core';
import { Pantalla } from '../../../../framework/clases/pantalla';
import { TablaComponent } from '../../../../framework/componentes/tabla/tabla.component';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage extends Pantalla {

  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  async ionViewWillEnter() {

    // Configura la tabla
    await this.tabTabla1.setTabla('sis_sucursal', 'ide_sucu', 1);
    this.tabTabla1.setTitulo('Sucursales de la Empresa');
    this.tabTabla1.getColumna('ide_empr').setVisible(false);
    //valor por defecto ========
    this.tabTabla1.setLectura(false);
    this.tabTabla1.setTipoFormulario();
    this.tabTabla1.dibujar(); // última
  }

  async guardar() {
    if (await this.tabTabla1.isGuardar()) {
      this.utilitario.guardarPantalla(this.tabTabla1);
    }
  }

  insertar(): void {
    this.tabTabla1.insertar();

  }
  eliminar(): void {
    this.tabTabla1.eliminar();
  }




}
