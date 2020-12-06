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
    await this.tabTabla1.setTabla('usuarios', 'CODIGO', 1);
    this.tabTabla1.setTitulo("Usuarios del Sistema");
    this.tabTabla1.getColumna('CODIGO').visible = false;
    this.tabTabla1.getColumna('NOMBRE').nombreVisual = 'NOMBRE COMPLETO';
    this.tabTabla1.getColumna('NOMBRE').unico = true;
    this.tabTabla1.getColumna('NOMBRE').mayusculas = true;
    this.tabTabla1.getColumna('NOMBRE').filtro = true;
    this.tabTabla1.setCampoOrden('NOMBRE');
    this.tabTabla1.getColumna('FECHA').valorDefecto = this.utilitario.getFechaActual();
    this.tabTabla1.getColumna('IMAGEN').setEtiqueta();
    this.tabTabla1.getColumna('FECHA_HORA').lectura = true;
    this.tabTabla1.getColumna('US_CODIGO').setCombo('USUARIOS', 'CODIGO', 'NOMBRE,FECHA');
    this.tabTabla1.getColumna('US_CODIGO').setAutocompletar();
    this.tabTabla1.getColumna('ENTERO').orden = 3;
    this.tabTabla1.setFilasPorPagina(5);
    this.tabTabla1.setLectura(false);
    //this.tabTabla1.setTipoFormulario();
    const condiciones: Condicion = { condicion: 'nombre LIKE ? AND cantidad >= ?', valores: ['%XXX%', 0] };
    this.tabTabla1.setCondiciones(condiciones);
    this.tabTabla1.agregarRelacion(this.tabTabla2);
    this.tabTabla1.dibujar(); // última


    // Configura la tabla 2
    await this.tabTabla2.setTabla('detalle', 'cod_deta', 2);
    this.tabTabla2.setTitulo('Detalles');
    this.tabTabla2.getColumna('cod_deta').visible = false;
    this.tabTabla2.setLectura(false);
    const condiciones2: Condicion = { condicion: 'cod_deta>= ?', valores: [0] };
    this.tabTabla2.setCondiciones(condiciones2);

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
