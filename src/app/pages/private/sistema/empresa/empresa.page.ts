import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Pantalla } from '../../../../framework/clases/pantalla';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { TablaComponent } from '../../../../framework/componentes/tabla/tabla.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage extends Pantalla{


  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  async ionViewWillEnter(){
    // Configura la tabla
    await this.tabTabla1.setTabla('sis_empresa', 'ide_empr', 1);
    this.tabTabla1.ocultarBotonInsertar();
    this.tabTabla1.ocultarBotonEliminar();
    this.tabTabla1.setTitulo('Datos de la Empresa');
    this.tabTabla1.getColumna('logo_empr').setUpload();
    this.tabTabla1.setLectura(false);
    this.tabTabla1.setTipoFormulario();
    this.tabTabla1.setUnico();
    this.tabTabla1.dibujar(); // última
    this.utilitario.cerrarLoading(); //Cierra el loading
  }

 async guardar() {
    if (await this.tabTabla1.isGuardar()) {
      this.utilitario.guardarPantalla(this.tabTabla1);
    }
  }

  insertar(): void {
  }
  eliminar(): void {
  }

}
