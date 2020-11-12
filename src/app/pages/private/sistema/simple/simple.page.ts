import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { TablaComponent } from '../../../../framework/componentes/tabla/tabla.component';
import { Pantalla } from '../../../../framework/clases/pantalla';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.page.html',
  styleUrls: ['./simple.page.scss'],
})
export class SimplePage extends Pantalla{


  @ViewChild('tab_tabla1', { static: false }) tabTabla1: TablaComponent;


  constructor(public utilitario: UtilitarioService) {
    super(utilitario);
  }


  async ionViewWillEnter(){
    // Configura la tabla
    await this.tabTabla1.setTabla('sri_microempresas', 'ruc', 1);
    this.tabTabla1.setTitulo('Microempresas');
    this.tabTabla1.setCampoOrden('razon_social');
    this.tabTabla1.setFilasPorPagina(15);
    this.tabTabla1.setLectura(true);
    //this.tabTabla1.setTipoFormularioIonic();
    this.tabTabla1.dibujar(); // última
  }

  insertar(): void {
    this.tabTabla1.insertar();
  }
  eliminar(): void {
    this.tabTabla1.eliminar();
  }

  async guardar() {
    if (await this.tabTabla1.isGuardar()) {
      this.utilitario.guardarPantalla(this.tabTabla1);
    }
  }

}
