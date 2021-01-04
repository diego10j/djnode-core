import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TablaComponent } from '../../../../framework/componentes/tabla/tabla.component';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { Pantalla } from '../../../../framework/clases/pantalla';
import Condicion from '../../../../framework/interfaces/condicion';

@Component({
  selector: 'app-doble',
  templateUrl: './doble.page.html',
  styleUrls: ['./doble.page.scss'],
})
export class DoblePage extends Pantalla {


  @ViewChild('tab_tabla1', { static: false }) tabTabla1: TablaComponent;
  @ViewChild('tab_tabla2', { static: false }) tabTabla2: TablaComponent;

  async ionViewWillEnter() {
    // Configura la tabla 1
    await this.tabTabla1.setTablaConfiguracion(1);
    this.tabTabla1.setLectura(false);
    this.tabTabla1.agregarRelacion(this.tabTabla2);
    this.tabTabla1.dibujar(); // última

    // Configura la tabla 2
    await this.tabTabla2.setTablaConfiguracion(2);
    this.tabTabla2.setLectura(false);
    //const condiciones2: Condicion = { condicion: 'cod_deta>= ?', valores: [0] };
    //this.tabTabla2.setCondiciones(condiciones2);
    this.tabTabla2.dibujar(); // última 
    this.utilitario.cerrarLoading(); //Cierra el loading
  }


  insertar(): void {

    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.insertar();
    }
    else if (this.tabTabla2.isFocus()) {
      this.tabTabla2.insertar();
    }
  }

  eliminar(): void {
    if (this.tabTabla1.isFocus()) {
      this.tabTabla1.eliminar();
    }
    else if (this.tabTabla2.isFocus()) {
      this.tabTabla2.eliminar();
    }
  }

  async guardar() {
    if (await this.tabTabla1.isGuardar()) {
      if (await this.tabTabla2.isGuardar()) {
        this.utilitario.guardarPantalla(this.tabTabla1, this.tabTabla2);
      }
    }

  }
  otro() {
    console.log('ccccc');
  }

}
