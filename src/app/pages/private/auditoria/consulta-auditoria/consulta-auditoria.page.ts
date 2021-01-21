import { Component, OnInit, ViewChild } from '@angular/core';
import { Pantalla } from '../../../../framework/clases/pantalla';
import { CalendarioComponent } from '../../../../framework/componentes/calendario/calendario.component';
import { ComboComponent } from '../../../../framework/componentes/combo/combo.component';

@Component({
  selector: 'app-consulta-auditoria',
  templateUrl: './consulta-auditoria.page.html',
  styleUrls: ['./consulta-auditoria.page.scss'],
})
export class ConsultaAuditoriaPage extends Pantalla {

  @ViewChild('ranFechas', { static: false }) ranFechas: CalendarioComponent;
  @ViewChild('comUsuarios', { static: false }) comUsuarios: ComboComponent;

  async ionViewWillEnter() {
    this.barra.ocultarBotonGuardar();
    this.comUsuarios.setCombo('sis_usuario','ide_usua','nom_usua');
  }

  actualizar(): void {
  }

  guardar(): void {

  }
  insertar(): void {

  }
  eliminar(): void {

  }

}
