import { Component, ViewChild } from '@angular/core';
import { Pantalla } from '@djnode/clases/pantalla';
import { ComboComponent } from '@djnode/componentes/combo/combo.component';
import { RangoFechasComponent } from '@djnode/componentes/rango-fechas/rango-fechas.component';
import { TablaComponent } from '@djnode/componentes/tabla/tabla.component';

@Component({
  selector: 'app-consulta-auditoria',
  templateUrl: './consulta-auditoria.page.html',
  styleUrls: ['./consulta-auditoria.page.scss'],
})
export class ConsultaAuditoriaPage extends Pantalla {

  @ViewChild('ranFechas', { static: false }) ranFechas: RangoFechasComponent;
  @ViewChild('comUsuarios', { static: false }) comUsuarios: ComboComponent;
  @ViewChild('tabTabla1', { static: false }) tabTabla1: TablaComponent;

  async ionViewWillEnter() {
    this.barra.ocultarBotonGuardar();
    this.comUsuarios.onChange = () => { this.buscar(); };
    this.comUsuarios.setCombo('sis_usuario', 'ide_usua', 'nom_usua', 'activo_usua = true');
    this.ranFechas.setFechaInicio(this.utilitario.getFechaActualDate());
    this.ranFechas.setFechaFin(this.utilitario.getFechaActualDate());
    this.ranFechas.setControlarFechasMaximas();
    this.ranFechas.onBuscar = () => { this.buscar(); };

    let parametrosServicio = {
      fecha_inicio: this.ranFechas.getValorFechaInicial(),
      fecha_fin: this.ranFechas.getValorFechaFinal(),
      ide_usua: null
    }

    await this.tabTabla1.setTablaServicio('api/seguridad/getConsultaAuditoria', parametrosServicio, 1);
    this.tabTabla1.setTitulo('Consulta Auditoria Usuarios');
    this.tabTabla1.getColumna('nom_usua').setFiltro(true);
    this.tabTabla1.getColumna('nom_acau').setFiltro(true);
    this.tabTabla1.getColumna('pantalla').setFiltro(true);
    this.tabTabla1.getColumna('pantalla').setLongitud(80);
    this.tabTabla1.getColumna('ip_auac').setFiltro(true);
    this.tabTabla1.setFilasPorPagina(20);
    this.tabTabla1.dibujar();
  }

  buscar(): void {
    let parametrosServicio = {
      fecha_inicio: this.ranFechas.getValorFechaInicial(),
      fecha_fin: this.ranFechas.getValorFechaFinal(),
      ide_usua: this.comUsuarios.getValor()
    };
    this.tabTabla1.ejecutarServicio(parametrosServicio);
  }

  confirmarEliminar(): void {


    if (!this.tabTabla1.isEmpty()) {
      const mensaje = 'Está seguro de que desea eliminar toda la Auditoria del sistema?';
      this.utilitario.confirmar(mensaje, () => this.eliminarAuditoria());
    }
    else {
      this.mensaje.agregarMensajeAdvertencia('No existen registos');
    }
  }

  eliminarAuditoria(): void {
  
    this.tabTabla1.buscando = true;
    //Configuracion inicial de la tabla
    this.seguridad.borrarAuditoria().subscribe(resp => {
      this.tabTabla1.seleccionada = null;
      this.tabTabla1.actualizar();
    }, (err) => {
      this.utilitario.agregarMensajeError('<p>' + err.error.mensaje + '</p> <p><strong>Origen: </strong>' + err.message + '</p> ');
    });
  }


  guardar(): void {
  }

  insertar(): void {

  }
  eliminar(): void {
  }

}
