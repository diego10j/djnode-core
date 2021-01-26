import { Component, OnInit, ViewChild } from '@angular/core';
import { Pantalla } from '../../../../framework/clases/pantalla';
import { CalendarioComponent } from '../../../../framework/componentes/calendario/calendario.component';
import { ComboComponent } from '../../../../framework/componentes/combo/combo.component';
import { RangoFechasComponent } from '../../../../framework/componentes/rango-fechas/rango-fechas.component';
import { TextoComponent } from '../../../../framework/componentes/texto/texto.component';
import { AutocompletarComponent } from '../../../../framework/componentes/autocompletar/autocompletar.component';

@Component({
  selector: 'app-consulta-auditoria',
  templateUrl: './consulta-auditoria.page.html',
  styleUrls: ['./consulta-auditoria.page.scss'],
})
export class ConsultaAuditoriaPage extends Pantalla {

  @ViewChild('ranFechas', { static: false }) ranFechas: RangoFechasComponent;
  @ViewChild('comUsuarios', { static: false }) comUsuarios: ComboComponent;
  @ViewChild('autUsuarios', { static: false }) autUsuarios: AutocompletarComponent;

  

  async ionViewWillEnter() {
    this.barra.ocultarBotonGuardar();
    this.comUsuarios.onChange = () => { this.seleccionarUsuario(); };
    this.comUsuarios.setCombo('sis_usuario', 'ide_usua', 'nom_usua');
    this.ranFechas.setFechaInicio(this.utilitario.getFechaActualDate());
    this.ranFechas.setFechasMaximas();
    this.ranFechas.onBuscar = () => { this.seleccionarUsuario(); };


    this.autUsuarios.onChange = () => { this.guardar(); };
    this.autUsuarios.setAutocompletar('sis_usuario', 'ide_usua', 'nom_usua');

  }

  buscar(): void {
    console.log('FI ' + this.ranFechas.getValorFechaInicial() + ',,,,,,,,,,' + this.ranFechas.getValorDateFechaInicial());
    console.log('FF ' + this.ranFechas.getValorFechaFinal() + ',,,,,,,,,,' + this.ranFechas.getValorDateFechaFinal());
  }

  seleccionarUsuario(): void {
    this.comUsuarios.setInvalid(true);
    console.log(this.comUsuarios.getValor());
  }

  guardar(): void {
    this.autUsuarios.setInvalid(true);
    console.log(this.autUsuarios.getValor());
  }
  insertar(): void {

  }
  eliminar(): void {

  }

}
