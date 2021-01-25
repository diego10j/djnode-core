import { Component, OnInit, ViewChild } from '@angular/core';
import { Pantalla } from '../../../../framework/clases/pantalla';
import { CalendarioComponent } from '../../../../framework/componentes/calendario/calendario.component';
import { ComboComponent } from '../../../../framework/componentes/combo/combo.component';
import { RangoFechasComponent } from '../../../../framework/componentes/rango-fechas/rango-fechas.component';

@Component({
  selector: 'app-consulta-auditoria',
  templateUrl: './consulta-auditoria.page.html',
  styleUrls: ['./consulta-auditoria.page.scss'],
})
export class ConsultaAuditoriaPage extends Pantalla {

  @ViewChild('ranFechas', { static: false }) ranFechas: RangoFechasComponent;
  @ViewChild('comUsuarios', { static: false }) comUsuarios: ComboComponent;

  async ionViewWillEnter() {
    this.barra.ocultarBotonGuardar();
    this.comUsuarios.setLabel('Usuario');
    this.comUsuarios.setCombo('sis_usuario','ide_usua','nom_usua');
    this.ranFechas.setFechaInicio(this.utilitario.getFechaActualDate());
    this.ranFechas.setFechasMaximas();
    this.ranFechas.onBuscar= () => { this.buscar(); };

  }

  buscar(): void {
    console.log('FI '+this.ranFechas.getValorFechaInicial() +',,,,,,,,,,'+ this.ranFechas.getValorDateFechaInicial());
    console.log('FF '+this.ranFechas.getValorFechaFinal() +',,,,,,,,,,'+ this.ranFechas.getValorDateFechaFinal());
    this.comUsuarios.setInvalid(true);
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
