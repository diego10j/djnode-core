import { Component, OnInit, ViewChild } from '@angular/core';
import { SistemaService } from '../../servicios/sistema.service';
import { UtilitarioService } from '../../../services/utilitario.service';
import { TreeNode, MenuItem } from 'primeng/api';
import Condicion from '../../interfaces/condicion';
import { TieredMenu } from 'primeng/tieredmenu';
import { Tree } from 'primeng/tree';

@Component({
  selector: 'app-arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.scss'],
})
export class ArbolComponent {

  @ViewChild('djArbol', { static: false }) djArbol: Tree;
  datos: TreeNode[];
  seleccionado: any;

  titulo = 'RAIZ';
  textoFiltro;

  nombreTabla: string;
  campoPrimario: string;
  campoNombre: string;
  campoPadre: string;
  campoOrden: string;
  condiciones: Condicion;
  isDibujar = false; //Sirve para controlar si se ejecuto el metodo consultar

  //Eventos
  onSeleccionar?: (event?: any) => void;

  // Ociones tabla
  @ViewChild('opcionesArbol', { static: false }) opcionesArbol: TieredMenu;
  public menuOpciones: MenuItem[];
  private itemExportarExcel: MenuItem;
  private itemExpandirTodo: MenuItem;
  private itemContraerTodo: MenuItem;
  private itemActualizar: MenuItem;


  constructor(private sistemaService: SistemaService, private utilitario: UtilitarioService) {
    this.datos = [];
    this.seleccionado = null;
    this.isDibujar = false;
    this.nombreTabla = null;
    this.campoPrimario = null;
    this.campoNombre = null;
    this.campoPadre = null;
    this.campoOrden = null;
    this.condiciones = null;

    //Menu de Opciones
    this.menuOpciones = [];
    this.itemExportarExcel = {
      label: 'Exportar Excel',
      icon: 'pi pi-fw pi-file-excel',
      command: () => {
        this.opcionesArbol.hide();
        this.exportExcel();
      }
    };

    this.itemExpandirTodo = {
      label: 'Expandir Todo',
      icon: 'pi pi-sort-amount-down',
      command: () => {
        this.opcionesArbol.hide();
        this.expandAll();
      }
    };

    this.itemContraerTodo = {
      label: 'Contrar Todo',
      icon: 'pi pi-sort-amount-up-alt',
      command: () => {
        this.opcionesArbol.hide();
        this.collapseAll();
      }
    };

    this.itemActualizar = {
      label: 'Actualizar',
      icon: 'pi pi-refresh',
      command: () => {
        this.opcionesArbol.hide();
        this.actualizar();
      }
    };


    this.menuOpciones.push(this.itemExpandirTodo);
    this.menuOpciones.push(this.itemContraerTodo);
    this.menuOpciones.push({ separator: true, });
    this.menuOpciones.push(this.itemActualizar);
    this.menuOpciones.push({ separator: true, });
    this.menuOpciones.push(this.itemExportarExcel);


  }



  setArbol(_nombreTabla: string, _campoPrimario: string, _campoNombre: string, _campoPadre: string) {
    this.nombreTabla = _nombreTabla;
    this.campoPrimario = _campoPrimario;
    this.campoNombre = _campoNombre;
    this.campoPadre = _campoPadre;
    this.campoOrden = _campoNombre;
  }

  setTitulo(_titulo: string) {
    this.titulo = _titulo.toUpperCase();
  }

  setCampoOrden(_campoOrden: string) {
    this.campoOrden = _campoOrden;
  }

  setCondiciones(_condiciones: Condicion) {
    this.condiciones = _condiciones;
  }

  public dibujar() {

    this.consultar();
    this.isDibujar = true;
  }

  private consultar() {
    this.datos = [];
    let condicionesArbol: Condicion[] = [];
    if (this.utilitario.isDefined(this.condiciones)) {
      condicionesArbol.push(this.condiciones);
    }

    let raiz = {
      'label': this.titulo,
      'data': null,
      'expandedIcon': 'pi pi-folder-open',
      'collapsedIcon': 'pi pi-folder'
    };
    this.datos.push(raiz);
    this.sistemaService.consultarArbol(this.nombreTabla, this.campoPrimario, this.campoNombre, this.campoPadre,
      this.campoOrden, condicionesArbol).subscribe(resp => {
        const respuest: any = resp;
        if (respuest.datos) {
          //Nodo raiz
          raiz['children'] = respuest.datos;
          //selecciona el primer elemento
          this.seleccionado = this.datos[0];
          this.seleccionado.expanded = true; //Expande el primer nivel
        }

      }, (err) => {
        this.utilitario.agregarMensajeError('<p>' + err.error.mensaje + '</p> <p><strong>Origen: </strong>' + err.message + '</p> ');
      }
      );

  }

  getValorSeleccionado(): string {
    return this.seleccionado.data;
  }


  nodeSelect(event) {
    this.seleccionado.expanded = true; //expande al seleccionar
    if (this.onSeleccionar) {
      this.onSeleccionar({
        originalEvent: event
      });
    }
  }
  actualizar() {
    this.seleccionado = this.datos[0];
    this.nodeSelect(null);
    this.consultar();

  }


  expandAll() {
    this.datos.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.datos.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  private addNodesRecursive(node: TreeNode, datos, nivel) {
    let espacios = '';
    if (nivel > 1) {
      for (var _i = 0; _i < nivel; _i++) {
        espacios += '  ';
      }
    }

    datos.push({
      'DESCRIPCION': espacios + '' + node.label,
      'NIVEL':nivel
    });
    if (node.children) {
      let subnivel = nivel + 1;
      node.children.forEach(childNode => {
        this.addNodesRecursive(childNode, datos, subnivel);
      });
    }
  }



  //Exportaciones
  exportExcel() {
    //Genera el arreglo a Exportar
    const datosExporta = [];

    this.datos.forEach(node => {
      let nivel = 1;
      this.addNodesRecursive(node, datosExporta, nivel);
    });

    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(datosExporta);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "archivo");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }


}
