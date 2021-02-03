import { Component, OnInit, QueryList, ViewChild, ViewChildren, ContentChild, TemplateRef } from '@angular/core';
import Tabla from '../../clases/tabla';
import { SistemaService } from '../../servicios/sistema.service';
import Columna from '../../clases/columna';
import { LazyLoadEvent, MenuItem, SortEvent } from 'primeng/api';
import { UtilitarioService } from '../../../services/utilitario.service';
import { environment } from '../../../../environments/environment.prod';
import { ColumnFilter, Table } from 'primeng/table';
import { TieredMenu } from 'primeng/tieredmenu';
import Condicion from '../../interfaces/condicion';
import { UploadService } from '../../servicios/upload.service';
import { ModalController } from '@ionic/angular';
import { VisualizadorImagenComponent } from '../visualizador-imagen/visualizador-imagen.component';
import { FormatoTablaComponent } from '../formato-tabla/formato-tabla.component';
import { ArbolComponent } from '../arbol/arbol.component';
import { MensajeComponent } from '../mensaje/mensaje.component';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {

  constructor(private utilitario: UtilitarioService,
    private sistemaService: SistemaService,
    private uploadService: UploadService,
    private modalController: ModalController,) {
    this.tabla = new Tabla();
    this.isDibujar = false;
    this.plataforma = this.utilitario.getPlataforma();

  }

  get columnas(): Columna[] {
    return this.tabla.columnas;
  }

  get datos(): Columna[] {
    return this.tabla.datos;
  }

  set lectura(_lectura: boolean) {
    this.tabla.lectura = _lectura;
  }

  get lectura(): boolean {
    if (this.tabla) {
      return this.tabla.lectura;
    }
    return false;
  }

  get seleccionada(): any {
    return this.tabla.seleccionada;
  }

  set seleccionada(_seleccionada: any) {
    this.tabla.seleccionada = _seleccionada;
  }

  get campoOrden(): string {
    return this.tabla.campoOrden;
  }

  set campoOrden(_campoOrden: string) {
    this.tabla.campoOrden = _campoOrden.toLowerCase();
  }

  set filasPorPagina(_filasPorPagina: number) {
    this.tabla.filasPorPagina = _filasPorPagina;
  }

  get campoPrimario(): string {
    return this.tabla.campoPrimario;
  }

  set campoPrimario(_campoPrimario: string) {
    this.tabla.campoPrimario = _campoPrimario;
  }

  get numeroFilas(): number {
    return this.tabla.numeroFilas;
  }

  set numeroFilas(_numeroFilas: number) {
    this.tabla.numeroFilas = _numeroFilas;
  }

  get tipoFormulario(): boolean {
    return this.tabla.tipoFormulario;
  }

  set tipoFormulario(_tipoFormulario: boolean) {
    this.tabla.tipoFormulario = _tipoFormulario;
  }

  get titulo(): string {
    return this.tabla.titulo;
  }

  set titulo(_titulo: string) {
    this.tabla.titulo = _titulo;
  }

  get paginacion(): boolean {
    if (this.datos) {
      if (this.tabla.filasPorPagina >= this.datos.length) {
        return false;
      }
    }
    return true;
  }

  get numeroTabla() {
    return this.tabla.numeroTabla;
  }

  //Templates
  @ContentChild('barra') barra: TemplateRef<any>;

  @ViewChild('djtabla', { static: false }) djtabla: Table;
  @ViewChild('opcionesTabla', { static: false }) opcionesTabla: TieredMenu;
  @ViewChildren(ColumnFilter) colFiltro: QueryList<ColumnFilter>;

  public tabla: Tabla;
  indiceFilaActual = 0;
  plataforma = "desktop"; //por defecto
  //por defecto tabla 1
  public buscando = false;
  public textoFiltroGlobal = '';
  public filtroGlobal = false;
  public resultadoAutocompletar: any[];
  public eliminadas: any[] = []; //almacena filas eliminadas
  public validarInsertar = false; // validacion para permitir insertar varios registros
  public relaciones: TablaComponent[] = []; //Agrega relación, guarda el número de tabla de la relacion
  public arbol: ArbolComponent;
  //Para formularios
  public mostrarPaginadorFormulario = true;
  public modoFormulario = 'web';//controles tipo web
  // Menu contextual
  public menuContextual: MenuItem[];
  public itemInsertar: MenuItem;
  public itemEliminar: MenuItem;
  public itemGuardar: MenuItem;
  // Ociones tabla
  public menuOpciones: MenuItem[];
  private itemActualizar: MenuItem;
  private itemExportarExcel: MenuItem;
  private itemFormatoTabla: MenuItem;
  private itemVistaTabla: MenuItem;
  private itemVistaFormulario: MenuItem;
  private itemSeparadorVista: MenuItem;
  //Servicio
  private metodoServicio: string;
  private bodyServicio: any;
  //Seleccion single / multiple se
  tipoSeleccion?: 'simple' | 'multiple';
  selectionMode= 'single';
  //Botones Tabla
  isBotonInsertar = true;
  isBotonEliminar = true;
  isBotonFiltro = true;
  isBotonOpciones = true;
  isBotonModificar = false;
  //Filas Row Expansion
  expandible = false;
  numColumnasExpansibles = 0;
  //Calendario - Fechas

  formatoFecha: string;
  formatoFechaHora: string;
  mascaraFecha: string;
  mascaraFechaHora: string;

  public isDibujar = false; //Sirve para controlar si se ejecuto el metodo consultar

  fechaPickerConfig = {
    allowMultiSelect: false,
    appendTo: document.body,
    format: environment.FORMATO_FECHA,
    locale: 'es',
    closeOnSelectDelay: 0,
    displayDate: '',
    //min:'2019-08-29 15:50',
    // minTime:'2017-08-29 15:50'
  };

  horaPickerConfig = {
    allowMultiSelect: false,
    appendTo: document.body,
    format: "HH:mm:ss",
    locale: 'es',
    hours24Format: 'HH',
    showSeconds: true,
    showTwentyFourHours: true,
    closeOnSelectDelay: 0,
    openOnClick: false,
    openOnFocus: false,
    displayDate: null
  };

  fechaHoraPickerConfig = {
    allowMultiSelect: false,
    appendTo: document.body,
    format: environment.FORMATO_FECHAHORA,
    locale: 'es',
    hours24Format: 'HH',
    showSeconds: true,
    showTwentyFourHours: true,
    closeOnSelectDelay: 0,
    displayDate: null
  };

  //Tamaño de las columnas por defecto defecto

  sizeColumnas = 0;

  public get numeroColumnasGrid(): string {
    let size = 'auto';
    let anchoPantalla = this.utilitario.getWidhtPantalla();
    if (this.sizeColumnas === 0) {
      if (anchoPantalla < 540) {
        size = '12'; //xm 
      }
      else if (anchoPantalla >= 540 && anchoPantalla < 720) {
        size = '6'; //sm
      }
      else if (anchoPantalla >= 720 && anchoPantalla < 960) {
        size = '6'; //md
      }
      else if (anchoPantalla >= 960 && anchoPantalla < 1140) {
        size = '6'; //lg
      }
      else if (anchoPantalla >= 1140) {
        size = '4'; //xl
      }
    }
    else if (this.sizeColumnas === 1) {
      size = '12';
    }
    else if (this.sizeColumnas === 2) {
      size = '6';
    }
    else if (this.sizeColumnas === 3) {
      size = '4';
    }
    //Para telefono
    if (anchoPantalla < 540) {
      size = '12'; //xm 
    }
    return size;
  }

  //Eventos
  onModificar?: (event?: any) => void;
  onEliminar?: (event?: any) => void;
  onInsertar?: (event?: any) => void;


  setNumeroColumnasGrid(numeroColumnas: number) {
    this.sizeColumnas = numeroColumnas;
  }



  public insertarClick() {

    if (this.onInsertar) {
      this.onInsertar({
        originalEvent: null
      });
    }
    else {
      const botInsertar = document.getElementById('botInsertar');
      botInsertar.click();
    }
  }

  public eliminarClick() {
    if (this.onEliminar) {
      this.onEliminar({
        originalEvent: null
      });
    }
    else {
      const botEliminar = document.getElementById('botEliminar');
      botEliminar.click();
    }

  }
  private guardarClick() {
    const botGuardar = document.getElementById('botGuardar');
    botGuardar.click();
  }

  public modificarClick() {
    if (this.onModificar) {
      this.onModificar({
        originalEvent: null
      });
    }
  }

  ngOnInit() {

    this.formatoFecha = environment.FORMATO_FECHA;
    this.formatoFechaHora = environment.FORMATO_FECHAHORA;
    this.mascaraFecha = environment.MASCARA_FECHA;
    this.mascaraFechaHora = environment.MASCARA_FECHAHORA;

    //Menu de Opciones
    this.menuOpciones = [];

    this.itemActualizar = {
      label: 'Actualizar',
      icon: 'pi pi-refresh',
      command: () => {
        this.opcionesTabla.hide();
        this.actualizar();
      }
    };

    this.itemExportarExcel = {
      label: 'Exportar Excel',
      icon: 'pi pi-fw pi-file-excel',
      command: () => {
        this.opcionesTabla.hide();
        this.exportExcel();
      }
    };

    this.itemFormatoTabla = {
      label: 'Personalizar',
      icon: 'pi pi-user-edit',
      command: () => {
        this.opcionesTabla.hide();
        this.abrirFormatoTabla();
      }
    };
    this.itemVistaTabla = {
      label: 'Vista Tabla',
      icon: 'pi pi-table',
      command: () => {
        this.opcionesTabla.hide();
        this.setTipoTabla();
        //this.setFocus();
      }
    };
    this.itemVistaFormulario = {
      label: 'Vista Formulario',
      icon: 'pi pi-id-card',
      command: () => {
        this.opcionesTabla.hide();
        this.setTipoFormulario();
        //this.setFocus();
      }
    };

    this.itemSeparadorVista = {
      separator: true
    }
    this.menuOpciones.push(this.itemActualizar);
    this.menuOpciones.push(this.itemExportarExcel);
    this.menuOpciones.push({ separator: true, });
    this.menuOpciones.push(this.itemVistaTabla);
    this.menuOpciones.push(this.itemVistaFormulario);
    this.menuOpciones.push(this.itemSeparadorVista);
    this.menuOpciones.push(this.itemFormatoTabla);

  }

  //Forma el menu contextual
  formarMenuContextual() {
    this.menuContextual = [];
    let disBotGuardar = true;
    const botGuardar = (document.getElementById('botGuardar') as HTMLButtonElement);

    this.itemInsertar = {
      label: 'Insertar',
      icon: 'pi pi-plus-circle',
      visible: this.isBotonInsertar,
      command: () => {
        this.insertarClick();
      }
    };
    this.menuContextual.push(this.itemInsertar);

    this.itemEliminar = {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      visible: this.isBotonEliminar,
      command: () => {
        this.eliminarClick();
      }
    };
    this.menuContextual.push(this.itemEliminar);

    if (botGuardar && !botGuardar.hidden) {
      disBotGuardar = botGuardar.disabled;
      this.itemGuardar = {
        label: 'Guardar',
        icon: 'pi pi-save',
        disabled: disBotGuardar,
        command: () => {
          this.guardarClick();
        }
      };
      this.menuContextual.push(this.itemGuardar);
      this.menuContextual.push({ separator: true });
      this.menuContextual.push(this.itemActualizar);
    }


    //Menu Opciones
    this.itemSeparadorVista.visible = !this.lectura;
    this.itemVistaFormulario.visible = !this.lectura;
    this.itemVistaTabla.visible = !this.lectura;


  }

  public async setTablaConfiguracion(numeroTabla: number): Promise<Columna[]> {
    this.tabla.numeroTabla = numeroTabla + '';
    this.tabla.columnas = new Array<Columna>();
    this.tabla.datos = [];
    const ide_opci = this.utilitario.getIdeOpci();
    //Configuración de la tabla
    await new Promise(resolve => {
      // Si es obj autocompletar
      this.sistemaService.getConfiguracion(ide_opci, this.tabla.numeroTabla).subscribe(resp => {
        const respuesta: any = resp;
        if (this.utilitario.isDefined(respuesta.datos)) {
          this.tabla.nombreTabla = respuesta.datos.tabla_tabl.toLowerCase();
          this.tabla.campoPrimario = respuesta.datos.primaria_tabl.toLowerCase();
          this.tabla.campoOrden = respuesta.datos.primaria_tabl.toLowerCase();// por defecto
          this.tipoFormulario = false; // por defecto
          if (this.utilitario.isDefined(respuesta.datos.nombre_tabl)) {
            this.tabla.campoNombre = respuesta.datos.nombre_tabl.toLowerCase();
          }
          if (this.utilitario.isDefined(respuesta.datos.foranea_tabl)) {
            this.tabla.campoForanea = respuesta.datos.foranea_tabl.toLowerCase();
          }
          if (this.utilitario.isDefined(respuesta.datos.padre_tabl)) {
            this.tabla.campoPadre = respuesta.datos.padre_tabl.toLowerCase();
          }
          if (this.utilitario.isDefined(respuesta.datos.orden_tabl)) {
            this.tabla.campoOrden = respuesta.datos.orden_tabl.toLowerCase();
          }
          if (this.utilitario.isDefined(respuesta.datos.formulario_tabl)) {
            this.tipoFormulario = respuesta.datos.formulario_tabl;
          }
          if (this.utilitario.isDefined(respuesta.datos.filas_tabl)) {
            this.tabla.filasPorPagina = respuesta.datos.filas_tabl;
          }
          if (this.utilitario.isDefined(respuesta.datos.titulo_tabl)) {
            this.tabla.titulo = respuesta.datos.titulo_tabl;
          }
        }
        else {
          this.utilitario.agregarMensajeError('No existe configuración'); return
        }
        resolve(true);
      }, (err) => {
        this.utilitario.agregarMensajeErrorServicioWeb(err);
        this.buscando = false;
        resolve(false);
      });
    });
    //Forma Columnas
    return this.formarColumnas();


  }

  public setTablaServicio(metodoServicio: string, bodyServicio: {}, numeroTabla: number): Promise<Columna[]> {
    this.tabla.numeroTabla = numeroTabla + '';
    this.metodoServicio = metodoServicio;
    this.bodyServicio = bodyServicio;
    this.tabla.columnas = new Array<Columna>();
    this.tabla.datos = [];
    this.lectura = true;
    if (this.utilitario.isDefined(bodyServicio)) {
      this.bodyServicio = bodyServicio;
    }
    else {
      this.bodyServicio = {};
    }
    this.bodyServicio['ide_opci'] = this.utilitario.getIdeOpci();
    this.bodyServicio['numero_tabl'] = this.numeroTabla;
    this.bodyServicio['soloColumnas'] = true;
    //Forma Columnas
    return new Promise(resolve => {
      this.sistemaService.llamarServicioPost(this.metodoServicio, this.bodyServicio).subscribe(async resp => {
        const respuesta: any = resp;
        if (respuesta.datos) {
          for (const colActual of respuesta.datos) {
            const col: Columna = new Columna();
            col.nombre = colActual.nombre;
            col.nombreVisual = colActual.nombrevisual;
            col.orden = colActual.orden;
            col.anchoColumna = colActual.anchocolumna;
            col.tipo = colActual.tipo;
            col.visible = colActual.visible;
            col.lectura = true;
            col.componente = colActual.componente;
            col.filtro = colActual.filtro;
            col.comentario = colActual.comentario;
            col.mayusculas = colActual.mayusculas;
            if (this.utilitario.isDefined(this.campoPrimario) === false) {

            }
            this.tabla.columnas.push(col);
          }
          //console.log(this.tabla.columnas);
          //El campo primario va a ser simepre el de la columna 0
          //Oculta y hace lectura campo primario
          this.campoPrimario = respuesta.campoPrimario;
          this.getColumna(this.tabla.campoPrimario).visible = false;
          //console.log( this.campoPrimario );
        }
        resolve(this.tabla.columnas);
      }, (err) => {
        this.utilitario.agregarMensajeErrorServicioWeb(err);
        this.buscando = false;
      });
    });



  }

  /**
   * Inicializa la tabla 
   * @param nombreTabla 
   * @param campoPrimario 
   * @param numeroTabla 
   */
  public setTabla(nombreTabla: string, campoPrimario: string, numeroTabla: number): Promise<Columna[]> {
    //this.tabla = new Tabla();
    // this.utilitario.abrirLoading();
    this.tabla.numeroTabla = numeroTabla + '';
    this.tabla.nombreTabla = nombreTabla.toLowerCase();
    this.tabla.campoPrimario = campoPrimario.toLowerCase();;
    this.campoOrden = campoPrimario.toLowerCase();//Por defecto ordena por campo primario
    this.tabla.columnas = new Array<Columna>();
    this.tabla.datos = [];
    //Forma Columnas
    return this.formarColumnas();

  }

  private formarColumnas(): Promise<Columna[]> {
    const ide_opci = this.utilitario.getIdeOpci();
    return new Promise(resolve => {
      this.sistemaService.getColumnasTabla(this.tabla.nombreTabla, ide_opci, this.numeroTabla).subscribe(async resp => {
        const respuesta: any = resp;
        if (respuesta.datos) {
          for (const colActual of respuesta.datos) {
            const col: Columna = new Columna();
            col.nombre = colActual.nombre;
            col.nombreVisual = colActual.nombrevisual.toUpperCase();
            col.orden = colActual.orden;
            col.requerida = colActual.requerida;
            col.tipo = colActual.tipo;
            col.longitud = colActual.longitud;
            col.decimales = colActual.decimales;
            col.anchoColumna = colActual.anchocolumna;
            col.componente = colActual.componente;
            col.visible = colActual.visible;
            col.lectura = colActual.lectura;
            col.valorDefecto = colActual.valordefecto;
            col.mascara = colActual.mascara;
            col.filtro = colActual.filtro;
            col.comentario = colActual.comentario;
            col.mayusculas = colActual.mayusculas;
            col.unico = colActual.unico;
            this.tabla.columnas.push(col);
          }
          //console.log(this.tabla.columnas);
          //Oculta campo Foraneo por defecto
          if (this.utilitario.isDefined(this.tabla.campoForanea)) {
            this.getColumna(this.tabla.campoForanea).visible = false;
          }
          //Oculta y hace lectura campo primario
          this.getColumna(this.tabla.campoPrimario).visible = false;
          this.getColumna(this.tabla.campoPrimario).lectura = true;
        }
        resolve(this.tabla.columnas);
      }, (err) => {
        this.utilitario.agregarMensajeErrorServicioWeb(err);
        this.buscando = false;
      });
    });
  }

  /**
   * Retorna un objeto columna 
   * @param nombreColumna 
   */
  public getColumna(nombreColumna: string): Columna {
    nombreColumna = nombreColumna.toLowerCase();
    const col = this.tabla.columnas.find(col => col.nombre === nombreColumna);
    if (this.utilitario.isDefined(col) === false) {
      this.utilitario.agregarMensajeError('La columna <strong>' + nombreColumna + '</strong> no existe en la tabla ' + this.tabla.nombreTabla);
    }
    return col;
  }

  /**
   * Oculta todas las columnas
   */
  ocultarColumnas() {
    for (const colActual of this.columnas) {
      colActual.setVisible(false);
    }
  }


  /**
   * Consultaren el servicio web
   */
  public dibujar() {
    //Carga los combos
    if (this.isDibujar === false) {
      // solo si aun no consulta se cargan los combos
      this.formarCombos();
      this.ordenarColumnas();
      this.formarMenuContextual();
    }
    //this.getSize();
    this.consultar();
    this.isDibujar = true;
  }


  public consultar() {

    if (this.utilitario.isDefined(this.metodoServicio)) {
      this.consultarServicio();
    }
    else if (this.utilitario.isDefined(this.tabla.nombreTabla)) {
      this.consultarTabla();
    }
  }

  /**
   * Forma los combos de las columnas configuradas
   */
  private formarCombos() {
    //Forma objetos a las columnas combo en tabla editable
    const columnasCombo = this.columnas.filter(col => col.isCombo === true);
    for (const colActual of columnasCombo) {
      colActual.listaCombo = [];
      if (this.utilitario.isDefined(colActual.configCombo.sql)) {
        //es combo sql
        this.sistemaService.getComboSql(colActual.configCombo.sql).subscribe(resp => {
          const respuest: any = resp;
          if (respuest.datos) {
            colActual.listaCombo = respuest.datos;
            if (colActual.nullCombo) {
              //Agrega null a opcion
              colActual.listaCombo.unshift({ value: null, label: '|' });
            }
          }
        }, (err) => {
          this.utilitario.agregarMensajeErrorServicioWeb(err);
        });
      }
      else {
        //es combo tabla
        this.sistemaService.getComboTabla(colActual.configCombo.nombreTabla, colActual.configCombo.campoPrimario,
          colActual.configCombo.campoNombre, colActual.configCombo.condicion).subscribe(resp => {
            const respuest: any = resp;
            if (respuest.datos) {
              colActual.listaCombo = respuest.datos;
              if (colActual.nullCombo) {
                //Agrega null a opcion
                colActual.listaCombo.unshift({ value: null, label: '|' });
              }
            }
          }, (err) => {
            this.utilitario.agregarMensajeErrorServicioWeb(err);
          });
      }

    }
  }


  /**
   * Retorna el valor a mostrarse en una columna de tipo Combo
   * @param nombreColumna 
   * @param value 
   */
  public getCampoNombreCombo(nombreColumna, value): string {
    //console.log(nombreColumna, '   ', value);
    if (this.getColumna(nombreColumna).listaCombo.length > 0 && value !== null) {
      const obj = this.getColumna(nombreColumna).listaCombo.find(x => x.value === value);
      return obj.label;
    }
    return value;
  }

  /**
   * Retorna objeto del Combo
   * @param nombreColumna 
   * @param value 
   */
  public getObjetoCombo(nombreColumna: string, value): any {
    if (this.utilitario.isDefined(this.getColumna(nombreColumna).listaCombo)) {
      if (this.getColumna(nombreColumna).listaCombo.length > 0 && value !== null) {
        const obj = this.getColumna(nombreColumna).listaCombo.find(x => x.value === value);
        return obj;
      }
    }
    // return { value: null, label: '' };
    return null;
  }

  /**
   * Consulta cuando se recibe el nombre de la tabla y campoPrimario
   */
  private consultarTabla() {
    this.buscando = true;
    let condicionesTabla: Condicion[] = [];
    //Condicion foranea
    if (this.utilitario.isDefined(this.tabla.campoForanea)) {
      let condicionForanea = this.tabla.campoForanea + ' = ?';
      let valorForanea = "-1";
      let valoresCondicion = [];
      if (this.utilitario.isDefined(this.tabla.valorForanea)) {
        condicionForanea = this.tabla.campoForanea + ' = ?';
        valorForanea = this.tabla.valorForanea;
      }
      valoresCondicion.push(valorForanea);
      const condFora: Condicion = { condicion: condicionForanea, valores: valoresCondicion };
      condicionesTabla.push(condFora);
    }
    //Condicion Padre
    if (this.utilitario.isDefined(this.tabla.campoPadre)) {
      let condicionPadre = this.tabla.campoPadre + ' IS NULL';
      let valorPadre = '-1';
      let valoresCondicion = [];
      if (this.utilitario.isDefined(this.tabla.valorPadre)) {
        condicionPadre = this.tabla.campoPadre + ' = ?';
        valorPadre = this.tabla.valorPadre;
      }
      if (valorPadre !== '-1') {
        valoresCondicion.push(valorPadre);
      }

      const condPad: Condicion = { condicion: condicionPadre, valores: valoresCondicion };
      condicionesTabla.push(condPad);
    }
    //Condicion de la tabla
    if (this.utilitario.isDefined(this.tabla.condiciones)) {
      condicionesTabla.push(this.tabla.condiciones);
    }

    //Guarda valor fila seleccionada si no es fila insertada
    let valorPrimariaSelec = null;
    if (this.isDibujar) {
      if (this.seleccionada != null) {
        if (!this.isFilaInserrtada(this.getIndiceFilaActual())) {
          valorPrimariaSelec = this.getValorSeleccionado();
        }
      }
    }
    // this.tabla.datos=[];

    this.seleccionada = null;
    this.sistemaService.consultarTabla(this.tabla.nombreTabla, this.tabla.campoOrden, condicionesTabla,
      this.tabla.numeroFilas, this.tabla.pagina).subscribe(resp => {
        const respuest: any = resp;
        if (respuest.datos) {
          this.tabla.datos = respuest.datos;
          if (!this.lectura) {
            //Forma objetos a las columnas combo en tabla editable
            const columnasAutocompletar = this.columnas.filter(col => col.componente === 'Autocompletar');
            if (columnasAutocompletar.length > 0) {
              this.datos.forEach((fila) => {
                for (const colActual of columnasAutocompletar) {
                  const valorAnterior = fila[colActual.nombre];
                  if (this.utilitario.isDefined(valorAnterior)) {
                    fila[colActual.nombre] = this.getObjetoCombo(colActual.nombre, valorAnterior);
                  }
                }
              });
            }
          }
          //Si no hay fila seleccionada
          if (this.utilitario.isDefined(valorPrimariaSelec) === false) {
            this.indiceFilaActual = 0;
            //selecciona la primera fila
            if (this.datos.length > 0) {
              this.seleccionada = this.datos[0];
            }
            else {
              //si es tipo formulario y no hay datos inserta una fila 
              if (this.tipoFormulario) {
                if (this.lectura === false) {
                  this.crearFila();
                }
              }
            }
          }
          else {
            //selecciona fila marcada antes de consultar
            if (this.utilitario.isDefined(valorPrimariaSelec)) {
              this.seleccionarFilaValorPrimario(valorPrimariaSelec);
            }
          }

          this.buscando = false;

          for (let relacion of this.relaciones) {
            relacion.seleccionada = null;
            relacion.ejecutarValorForanea(this.getValorSeleccionado());
          }

          //Asigna el foco a la tabla 1  si la tabla es editable
          if (this.lectura === false) {
            if (this.tabla.numeroTabla === '1') {
              this.setFocus();
            }
          }

        }
      }, (err) => {
        this.utilitario.agregarMensajeErrorServicioWeb(err);
        this.buscando = false;
      }
      );
  }




  private consultarServicio() {
    this.buscando = true;

    //Guarda valor fila seleccionada si no es fila insertada
    let valorPrimariaSelec = null;
    if (this.isDibujar) {
      if (this.seleccionada != null) {
        if (!this.isFilaInserrtada(this.getIndiceFilaActual())) {
          valorPrimariaSelec = this.getValorSeleccionado();
        }
      }
    }
    // this.tabla.datos=[];
    this.bodyServicio['soloColumnas'] = false;
    this.seleccionada = null;
    this.sistemaService.llamarServicioPost(this.metodoServicio, this.bodyServicio).subscribe(resp => {
      const respuest: any = resp;
      if (respuest.datos) {
        this.tabla.datos = respuest.datos;

        //Si no hay fila seleccionada
        if (this.utilitario.isDefined(valorPrimariaSelec) === false) {
          this.indiceFilaActual = 0;
          //selecciona la primera fila
          if (this.datos.length > 0) {
            this.seleccionada = this.datos[0];
          }
        }
        else {
          //selecciona fila marcada antes de consultar
          if (this.utilitario.isDefined(valorPrimariaSelec)) {
            this.seleccionarFilaValorPrimario(valorPrimariaSelec);
          }
        }
        this.buscando = false;
        for (let relacion of this.relaciones) {
          relacion.seleccionada = null;
          relacion.ejecutarValorForanea(this.getValorSeleccionado());
        }
      }
    }, (err) => {
      this.utilitario.agregarMensajeErrorServicioWeb(err);
      this.buscando = false;
    }
    );
  }


  private isValorValido(fila: any, columna: Columna): boolean {

    //Valida tipos de datos
    let valor = fila[columna.nombre];
    //console.log(' -----  ' + columna.nombre + '   ' + valor);
    if (valor === '') {
      valor = null;
    }

    if (this.utilitario.isDefined(valor)) {
      if (columna.componente === 'Calendario') {
        if (typeof valor === 'object') {
          fila[columna.nombre] = this.utilitario.getFormatoFecha(valor);
        }
        //valida que sea una fecha valida
        valor = fila[columna.nombre];
        const d = new Date(valor);
        if (isNaN(d.getTime())) {
          this.utilitario.agregarMensajeAdvertencia('Fecha no válida '
            + '<strong>' + valor + '</strong> en la columna "' + columna.nombreVisual.toUpperCase() + '"');
          return false;
        }
      }
      else if (columna.componente === 'Hora') {
        //valida que sea una hora valida
        if (typeof valor !== 'object') {
          const d = new Date(this.utilitario.toDate('2020-01-01 ' + valor));
          if (isNaN(d.getTime())) {
            this.utilitario.agregarMensajeAdvertencia('Hora no válida '
              + '<strong>' + valor + '</strong> en la columna "' + columna.nombreVisual.toUpperCase() + '"');
            return false;
          }
          fila[columna.nombre] = d;
        }
        valor = fila[columna.nombre];
        const d = new Date(valor);
        fila[columna.nombre] = this.utilitario.getFormatoHora(d);
      }
      else if (columna.componente === 'CalendarioHora') {
        if (typeof valor === 'object') {
          fila[columna.nombre] = this.utilitario.getFormatoFechaHora(valor);
        }
        //valida que sea una fecha valida
        valor = fila[columna.nombre];
        const d = new Date(valor);
        if (isNaN(d.getTime())) {
          this.utilitario.agregarMensajeAdvertencia('Fecha no válida '
            + '<strong>' + valor + '</strong> en la columna "' + columna.nombreVisual.toUpperCase() + '"');
          return false;
        }
      }
    }
    return true;

  }

  /**
   * Asigna el foco a la tabla actual y quita el foco a todas la tablas
   */
  onFocusTabla() {
    //quita el foco a todos los objetos tabla o formulario que son editables
    const elements: Element[] = Array.from(document.getElementsByName('djtablaEditable'));
    const numTablasEditablre = elements.length;
    for (let el of elements) {
      const numTabla = el.getAttribute('dir');
      // si solo hay una tabla por defecto le asigna el foco
      if (numTablasEditablre === 1) {
        el.setAttribute('focus', 'true');
        return;
      }

      if (numTabla === this.tabla.numeroTabla) {
        el.setAttribute('focus', 'true');
      }
      else {
        el.setAttribute('focus', 'false');
      }

    }
    //   this.formarMenuContextual();
  }

  /**
   * Retorna si la tabla tiene el foco del menu contextual
   */
  isFocus(): boolean {
    //Si es de lectura no tiene focus
    if (this.lectura) {
      return false;
    }
    const elements: Element[] = Array.from(document.getElementsByName('djtablaEditable'));
    const numTablasEditablre = elements.length;
    if (numTablasEditablre === 1) {
      return true;
    }
    for (let el of elements) {
      const numTabla = el.getAttribute('dir');
      if (numTabla === this.tabla.numeroTabla) {
        const valorFocus = el.getAttribute('focus');
        if (valorFocus === 'true') {
          return true;
        }
      }
    }
    return false;
  }

  // Asigna el foco a la tabla 
  private setFocus() {
    const elements: Element[] = Array.from(document.getElementsByName('djtablaEditable'));
    for (let el of elements) {
      const numTabla = el.getAttribute('dir');
      if (numTabla === this.tabla.numeroTabla) {
        el.setAttribute('focus', 'true');
      }
      else {
        el.setAttribute('focus', 'false');
      }
    };
  }
  /**
   * Se ejcuta cuando se guarda exitosamente
   */
  onCommit() {
    //Quita elemento filas insertadas, modificadas
    if (this.utilitario.isDefined(this.arbol)) {
      for (let filaActual of this.getEliminadas()) {
        let auxBoraa = this.arbol.seleccionado.children.find(fila => fila.data === filaActual[this.campoPrimario]);
        if (auxBoraa) {
          const index = this.arbol.seleccionado.children.indexOf(auxBoraa);
          this.arbol.seleccionado.children.splice(index, 1);
        }
      }
    }

    this.eliminadas = [];

    for (let filaActual of this.getInsertadas()) {
      //Si tiene arbol, agrega al nodo seleccionado
      if (this.utilitario.isDefined(this.arbol)) {

        let nuevoHijo = {
          "label": filaActual[this.arbol.campoNombre],
          "data": filaActual[this.arbol.campoPrimario],
          "padre": filaActual[this.arbol.campoPadre],
          "icon": "pi pi-file"
        };

        if (this.utilitario.isDefined(this.arbol.seleccionado.children)) {
          //ya tiene hijos solo agrega
          this.arbol.seleccionado.children.push(
            nuevoHijo
          );
        }
        else {
          //agrega y cambia el iconos
          this.arbol.seleccionado['children'] = [
            nuevoHijo
          ];
          this.arbol.seleccionado.expandedIcon = 'pi pi-folder';
          this.arbol.seleccionado.collapsedIcon = 'pi pi-folder-open';
        }

      }
      delete filaActual['insertada'];
    }
    for (let filaActual of this.getModificadas()) {
      delete filaActual['modificada'];
    }

  }

  onSeleccionarFila(fila) {
    const rowIndex = this.tabla.datos.indexOf(fila);

    if (this.indiceFilaActual !== rowIndex) {
      this.seleccionada = null;
      this.indiceFilaActual = rowIndex;
      this.seleccionada = this.datos[this.indiceFilaActual];
      for (let relacion of this.relaciones) {
        relacion.seleccionada = null;
        relacion.ejecutarValorForanea(this.getValorSeleccionado());
      }
    }
  }


  /**
   * Carga bajo demanda los registros
   * @param event 
   */
  onCargarLazy(event: LazyLoadEvent) {
    //console.log(event.first + event.rows);
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    //imitate db connection over a network
    const pagina = (event.first + event.rows) / this.tabla.filasPorPagina;
    if (this.tabla.pagina !== pagina) {
      this.tabla.pagina = pagina;
      //this.consultar();
    }
  }

  /**
   * Ejecuta el método on Change de la columna
   * @param event 
   * @param columna 
   * @param rowIndex 
   */
  onMetodoChange(event, nombreColumna, fila) {
    const columna = this.getColumna(nombreColumna);
    this.seleccionada = fila;
    if (this.utilitario.isDefined(this.seleccionada['insertada']) === false) {
      this.seleccionada['modificada'] = true;
      let colModificadas = [];
      if (this.utilitario.isDefined(this.seleccionada['colModificadas'])) {
        colModificadas = this.seleccionada['colModificadas'];
      }
      colModificadas.indexOf(columna.nombre) === -1 ? colModificadas.push(columna.nombre) : colModificadas;
      this.seleccionada['colModificadas'] = colModificadas;
    }
    if (columna.onMetodoChange) {
      columna.onMetodoChange({
        originalEvent: event
      });
    }
  }



  /**
   * Ejecuta al dar click sobre algun componente
   * @param event 
   * @param columna 
   * @param rowIndex 
   */
  onClickComponente(fila): void {
    //selecciona la fila
    //this.seleccionada = fila;
    this.onSeleccionarFila(fila);
  }

  onClickComponenteDropDown(fila): void {
    //selecciona la fila
    this.onSeleccionarFila(fila);
    this.seleccionada = null;
    //Ejecuta nuevamnete ya que ni pinta al cambiar a otro componente
    this.onSeleccionarFila(fila);
  }


  /**
   * Ejecuta filtro global
   * @param value 
   */
  onFiltroGlobal(value: any): void {
    if (!this.utilitario.isDefined(this.djtabla.globalFilterFields)) {
      //filtroGlobal
      this.djtabla.globalFilterFields = [];
      for (const colActual of this.columnas) {
        this.djtabla.globalFilterFields.push(colActual.nombre);
      }
    }
    this.djtabla.filterGlobal(value, 'contains');
    if (value !== '') {
      this.filtroGlobal = true;
    }
  }

  onClearFiltroGlobal() {
    this.textoFiltroGlobal = '';
    this.onFiltroGlobal('');
    this.filtroGlobal = false;
  }

  /**
   * Se ejecuta al escribir en el autocompletar
   */
  onAutocompletar(event, nombreColumna) {
    this.resultadoAutocompletar = this.getColumna(nombreColumna).listaCombo.filter(fila => fila.label.toLowerCase().search(event.query.toLowerCase()) !== -1);
    //console.log(this.resultadoAutocompletar);
  }

  onPaginadorFormulario(event) {
    this.seleccionada = this.datos[event.first];
    this.onSeleccionarFila(this.seleccionada);
  }

  /**
   * Retorna la fila seleccionada
   */
  getFilaSeleccionada(): any {
    return this.seleccionada;
  }

  getIndiceFilaActual(): number {
    return this.indiceFilaActual;
  }
  /**
   * Para tabla selección multiple
   */
  getFilasSeleccionadas(): any[] {
    return this.tabla.seleccionadas;
  }


  /**
   * Selecciona Fila por campo primario
   */
  seleccionarFilaValorPrimario(_valorCampoPrimario): void {
    let fila = this.tabla.datos.find(fila => fila[this.tabla.campoPrimario].toString() === _valorCampoPrimario.toString());
    this.seleccionada = fila;
    this.onSeleccionarFila(fila);
  }

  /**
   * Retorna el valor del campo primario de la fila seleccionada
   */
  getValorSeleccionado(): string {
    let valor = null;
    try {
      valor = this.datos[this.indiceFilaActual][this.campoPrimario];
    } catch (e) {
    }
    return valor;
  }

  /**
   * Asigna el valor a la clave foranea
   */
  setValorForanea(_valorForanea) {
    this.tabla.valorForanea = _valorForanea;
  }

  setValorPadre(_valorPadre) {
    this.tabla.valorPadre = _valorPadre;
  }


  ejecutarValorForanea(_valorForanea) {
    this.tabla.valorForanea = _valorForanea;
    this.consultar();
  }

  ejecutarValorPadre(_valorPadre) {
    this.tabla.valorPadre = _valorPadre;
    this.consultar();
  }

  ejecutar() {
    this.seleccionada = null;
    this.consultar();
  }

  /**
   * Retorna el valor de una columna de la fila seleccionada 
   * @param nombreColumna 
   */
  getValor(_nombreColumna: string): any {
    if (this.tabla.datos) {
      if (this.seleccionada) {
        const col = this.getColumna(_nombreColumna);
        if (col) {
          let valor = this.seleccionada[_nombreColumna.toLowerCase()];
          if (col.componente === 'Calendario') {
            if (typeof valor === 'object') {
              valor = this.utilitario.getFormatoFecha(valor);
            }
          }
          else if (col.componente === 'Autocompletar') {
            if (typeof valor === 'object') {
              valor = valor.value;
            }
          }
          else if (col.componente === 'Hora') {
            if (typeof valor === 'object') {
              valor = this.utilitario.getFormatoHora(valor);
            }
          }
          return valor;
        }
        else {
          this.utilitario.agregarMensajeError('La columna ' + _nombreColumna + ' no existe');
        }
      }
    }
    return null;
  }

  /**
   * Retorna el valor de una columna de la una fila determinada
   * @param fila 
   * @param nombreColumna 
   */
  getValorFila(_fila: number, _nombreColumna: string): any {
    if (this.tabla.datos) {
      const filaActual = this.datos[_fila];
      if (filaActual) {
        const col = this.getColumna(_nombreColumna);
        if (col) {
          let valor = this.seleccionada[_nombreColumna.toLowerCase()];
          if (col.componente === 'Calendario') {
            if (typeof valor === 'object') {
              valor = this.utilitario.getFormatoFecha(valor);
            }
          }
          else if (col.componente === 'Autocompletar') {
            if (typeof valor === 'object') {
              valor = valor.value;
            }
          }

          return valor;
        }
        else {
          this.utilitario.agregarMensajeError('La columna ' + _nombreColumna + ' no existe');
        }
      }
    }
    return null;
  }

  /**
   * Retorna si la tabla tiene registros o no
   */
  isEmpty(): boolean {
    if (this.datos.length === 0) {
      return true;
    }
    return false;
  }

  /**
   * Inserta una fila nueva
   */
  insertar() {
    if (this.lectura === false) {
      if (this.isDibujar) {
        this.borrarFiltros(); //????
        if (this.validarInsertar && this.getInsertadas().length > 0 && this.getTotalFilas() > 0) {
          this.utilitario.agregarMensajeAdvertencia('Ya existe un registro insertado',
            'No se puede insertar');
        }
        else {
          this.crearFila();
        }
      }
    }
  }

  /**
   * Se ejecuta al ordenar una columna en tabla editable
   * @param event 
   */
  onOrdenarTablaEditable(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) {
        result = -1;
      }
      else if (value1 != null && value2 == null) {
        result = 1;
      }
      else if (value1 == null && value2 == null) {
        result = 0;
      }
      else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      }
      else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (event.order * result);
    });
  }

  /**
   * Se ejecuta cuando filtra en un Combo
   * @param event 
   * @param nombreColumna 
   */
  onFiltrarColumnaCombo(event, nombreColumna) {
    if (this.getColumna(nombreColumna).componente === 'Autocompletar') {
      //Si es autocompletar convierte en objetos los filtros
      const value = event.value;
      const objValF = [];
      for (const vafActual of value) {
        objValF.push(this.getObjetoCombo(nombreColumna, vafActual));
      }
      this.djtabla.filter(objValF, nombreColumna, 'in');
    }
    else {
      this.djtabla.filter(event.value, nombreColumna, 'in');
    }

  }


  /**
   * Crea una fila, con los columnas de la tabla
   */
  private crearFila(): void {
    // PK temporal negativa
    const tmpPK = 0 - (this.getInsertadas().length + 1);
    const filaNueva: any = {};
    for (const colActual of this.columnas) {
      const nombre = colActual.nombre;
      const valorDefecto = colActual.valorDefecto;
      filaNueva[nombre] = valorDefecto;
      if (nombre === this.tabla.campoPrimario) {
        filaNueva[nombre] = tmpPK;
      }
    }
    //Asigna valor a las relaciones
    for (const relacion of this.relaciones) {
      relacion.setValorForanea(this.getValorSeleccionado());
      relacion.limpiar();
    }
    //Asigna valor si tiene campoPadre
    if (this.utilitario.isDefined(this.tabla.campoPadre)) {
      filaNueva[this.tabla.campoPadre] = this.tabla.valorPadre;
    }

    filaNueva['insertada'] = true;
    this.datos.unshift(filaNueva);
    this.seleccionada = this.datos[0]; //selecciona fila insertada
  }

  public limpiar(): void {
    this.tabla.datos = [];
    this.seleccionada = null;
    //limpia tambien las relaciones 
    for (const relacion of this.relaciones) {
      relacion.limpiar();
    }
  }

  private seleccionarAnterior(index: number) {
    if (this.datos.length == 0) {
      this.seleccionada = null;
      return;
    }
    index = index - 1 < 0 ? 0 : index - 1;
    this.seleccionada = this.datos[index];
  }

  /**
   * Retorna el indice de la fila seleccionada
   */
  getRowIndex(): number {
    return this.tabla.datos.indexOf(this.seleccionada);
  }

  public eliminar() {

    if (this.lectura === false) {
      if (this.isDibujar && this.utilitario.isDefined(this.seleccionada)) {
        const index: number = this.getRowIndex();
        if (this.seleccionada.insertada) {
          this.tabla.datos.splice(index, 1);
          this.seleccionarAnterior(index);
        }
        else {
          this.buscando = true;
          //Valida si es posible eliminar la fila seleccionada
          this.sistemaService.isEliminar(this.tabla.nombreTabla, this.tabla.campoPrimario,
            this.getValor(this.tabla.campoPrimario)).subscribe(resp => {
              const respuesta: any = resp;
              if (respuesta.datos) {
                this.utilitario.agregarMensajeAdvertencia('El registro tiene relación con otras tablas del sistema',
                  'No se puede eliminar');
              }
              else {
                // agrega a filas eliminadas 
                if (this.eliminadas.indexOf(this.datos[index]) === -1) {
                  this.eliminadas.push(this.datos[index]);
                }
                this.tabla.datos.splice(index, 1);
                //this.datos[index]['eliminada'] = true;
                //this.datos[index]['visible'] = false; pendiente funcionalidad filas visibles
                this.seleccionarAnterior(index);
              }
              this.buscando = false;
            }, (err) => {
              this.utilitario.agregarMensajeAdvertencia('El registro tiene relación con otras tablas del sistema',
                'No se puede eliminar');
              this.buscando = false;
            });
        }
      }
    }
  }
  /**
   * Valida campos únicos,requeridas, valores en campos Hora,Fecha, FechaHora
   * y calcula claves primarias
   */
  public async isGuardar(): Promise<boolean> {
    // 1 en filas nuevas
    const lisInsertadas = this.getInsertadas();
    const lisModificadas = this.getModificadas();
    const colObligatorias = this.columnas.filter(col => col.requerida === true);
    const colUnicas = this.tabla.columnas.filter(col => col.unico === true);
    for (let filaActual of lisInsertadas) {

      //Validacion de valores que sean válidos
      for (const colActual of this.columnas) {
        filaActual = this.validarFila(colActual, filaActual);
        if (this.isValorValido(filaActual, colActual) === false) {
          return false;
        }
      }


      // Valores Obligatorios
      for (const colActual of colObligatorias) {
        const valor = filaActual[colActual.nombre];
        if (this.utilitario.isDefined(valor) === false) {
          this.utilitario.agregarMensajeAdvertencia('Los valores de la columna "' + colActual.nombreVisual + '" son obligatorios');
          return false;
        }
      }


      // Valores Unicos
      let booUnico = true;
      for (const colActual of colUnicas) {
        const valor = filaActual[colActual.nombre];
        if (this.utilitario.isDefined(valor)) {
          this.buscando = true;
          // Valida si es posible eliminar la fila seleccionada
          booUnico = await await this.isValidarUnico(this.tabla.nombreTabla, colActual, valor);
          if (!booUnico) {
            return false;
          }
        }
      }
    }
    // 2 en filas modificadas
    for (let filaActual of lisModificadas) {
      // Valores Obligatorios solo columnas modificadas
      const colModificadas = filaActual.colModificadas;
      for (const colNombreActual of colModificadas) { // solo nombres de columnas modificadas
        const colActual = this.getColumna(colNombreActual);
        //Validacion de valores que sean válidos
        filaActual = this.validarFila(colActual, filaActual);
        if (this.isValorValido(filaActual, colActual) === false) {
          return false;
        }


        if (colActual.requerida) {
          //filaActual = this.validarFila(colActual, filaActual);
          const valor = filaActual[colNombreActual];
          if (this.utilitario.isDefined(valor) === false) {
            this.utilitario.agregarMensajeAdvertencia('Los valores de la columna "' +
              colActual.nombreVisual + '" son obligatorios');
            return false;
          }
        }
      }
    }

    //Calcula valores claves primarias en filas insertadas
    let maximoTabla = 0;
    if (this.tabla.calculaPrimaria) {
      //Calcula valores claves primarias
      if (lisInsertadas.length > 0) {
        maximoTabla = await new Promise(resolve => {
          this.sistemaService.getMaximo(this.tabla.nombreTabla, this.tabla.campoPrimario,
            lisInsertadas.length).subscribe(resp => {
              const respuesta: any = resp;
              resolve(respuesta.datos);
            }, (err) => {
              this.utilitario.agregarMensajeErrorServicioWeb(err);
              this.buscando = false;
            });
        });
        //console.log(maximoTabla);
      }
    }
    for (const filaActual of lisInsertadas) {
      //Asigna valores primario calculado
      if (this.tabla.calculaPrimaria) {
        filaActual[this.campoPrimario] = maximoTabla;
        maximoTabla++;
      }
    }
    this.actualizarForaneaRelaciones(this.getValorSeleccionado());
    return true;

  }

  /**
   * Actualiza los valores de las claves foraneas en las tablas relacionadas
   */
  private actualizarForaneaRelaciones(_valor) {
    for (const relacion of this.relaciones) {
      for (const filaActual of relacion.getInsertadas()) {
        filaActual[relacion.tabla.campoForanea] = _valor;
      }
    }
  }

  private validarFila(_colActual: Columna, _filaActual: any[]): any[] {
    //Recupera el valor a validad
    let valor = _filaActual[_colActual.nombre];
    if (this.utilitario.isDefined(valor) === false) {
      _filaActual[_colActual.nombre] = null;
    }
    if (valor === '') {
      _filaActual[_colActual.nombre] = null;
    }
    valor = _filaActual[_colActual.nombre];
    if (this.utilitario.isDefined(valor)) {
      if (typeof valor === 'object') {
        if (_colActual.componente === 'Autocompletar') {
          valor = valor.value;
          _filaActual[_colActual.nombre] = valor;
        }
      }
    }
    return _filaActual;
  }

  /**
   * Valida si el valor de una columna es único
   * @param nombreTabla 
   * @param columna 
   * @param valor 
   */
  private isValidarUnico(nombreTabla: string, columna: Columna, valor): Promise<boolean> {
    return new Promise(resolve => {
      // Si es obj autocompletar
      if (typeof valor === 'object') {
        valor = valor.value;
      }
      this.sistemaService.isUnico(nombreTabla, columna.nombre, valor).subscribe(resp => {
        const respuesta: any = resp;
        this.buscando = false;
        if (respuesta.datos) {
          this.utilitario.agregarMensajeAdvertencia('Restricción única, ya existe  un registro con el valor '
            + '<strong>' + valor + '</strong> en la columna "' + columna.nombreVisual.toUpperCase() + '"');
          resolve(false);
        }
        else {
          resolve(true);
        }
      }, (err) => {
        this.utilitario.agregarMensajeErrorServicioWeb(err);
        this.buscando = false;
        resolve(false);
      });
    });
  }

  public actualizar() {
    this.borrarFiltros();
    this.eliminadas = [];
    this.textoFiltroGlobal = '';
    this.filtroGlobal = false;
    this.consultar();
    this.formarCombos();
  }


  public guardar(): any[] {
    const listaSQL = [];
    const lisInsertadas = this.getInsertadas();
    const colMayusculas = this.tabla.columnas.filter(col => col.mayusculas === true);
    const colCombo = this.tabla.columnas.filter(col => col.isCombo === true);
    const colFecha = this.tabla.columnas.filter(col => col.componente.includes('Calendario'));
    for (let filaActual of lisInsertadas) {
      const objInsert = {};

      const columnasInsert = this.columnas.map(function (colActual) {
        const rObj = {
          nombre: colActual.nombre
        };
        return rObj;
      });

      objInsert['tipo'] = 'insertar';
      objInsert['nombreTabla'] = this.tabla.nombreTabla.toLowerCase();
      objInsert['campoPrimario'] = this.tabla.campoPrimario.toLowerCase();
      objInsert['columnas'] = columnasInsert,
        objInsert['serial'] = this.tabla.calculaPrimaria;
      if (!this.tabla.calculaPrimaria) {
        //elimina campo primario cuando es serial
        //objInsert['key'] = filaActual[this.tabla.campoPrimario];
        delete filaActual[this.tabla.campoPrimario];
      }
      //valores en blanco to null Fechas
      for (const colActual of colFecha) {
        filaActual = this.validarFila(colActual, filaActual);
      }
      // Valores Mayusculas
      for (const colActual of colMayusculas) {
        filaActual = this.validarFila(colActual, filaActual);
        const valor = filaActual[colActual.nombre];
        if (this.utilitario.isDefined(valor)) {
          filaActual[colActual.nombre] = valor.toUpperCase();
        }
      }
      // Valores Autocompletar obj
      for (const colActual of colCombo) {
        filaActual = this.validarFila(colActual, filaActual);
      }

      objInsert['valores'] = filaActual;
      listaSQL.push(objInsert);
    }
    const lisModificadas = this.getModificadas();
    for (let filaActual of lisModificadas) {
      const objModifica = {};
      objModifica['tipo'] = 'modificar';
      objModifica['nombreTabla'] = this.tabla.nombreTabla.toLowerCase();
      //valores en blanco to null Fechas
      for (const colActual of colFecha) {
        filaActual = this.validarFila(colActual, filaActual);
      }
      // Valores Mayusculas
      for (const colActual of colMayusculas) {
        filaActual = this.validarFila(colActual, filaActual);
        const valor = filaActual[colActual.nombre];
        if (this.utilitario.isDefined(valor)) {
          filaActual[colActual.nombre] = valor.toUpperCase();
        }
      }
      // Valores Autocompletar obj
      for (const colActual of colCombo) {
        filaActual = this.validarFila(colActual, filaActual);
      }
      // Columnas modificadas
      const colModificadas = filaActual.colModificadas;
      const valoresModifica = {};
      for (const colM of colModificadas) {
        valoresModifica[colM] = filaActual[colM.toLowerCase()];
      }
      objModifica['valores'] = valoresModifica;
      const condicionModifica: Condicion = { condicion: this.campoPrimario + ' = ?', valores: [filaActual[this.tabla.campoPrimario.toLowerCase()]] };
      objModifica['condiciones'] = [condicionModifica];
      listaSQL.push(objModifica);
    }

    const lisEliminadas = this.getEliminadas();
    for (const filaActual of lisEliminadas) {
      const objElimina = {};
      objElimina['tipo'] = 'eliminar';
      objElimina['nombreTabla'] = this.tabla.nombreTabla.toLowerCase();
      const condicionElimina: Condicion = { condicion: this.campoPrimario + ' = ?', valores: [filaActual[this.tabla.campoPrimario.toLowerCase()]] };
      objElimina['condiciones'] = [condicionElimina];
      listaSQL.push(objElimina);
    }
    //console.log(listaSQL);
    return listaSQL;
  }

  agregarRelacion(_tabla: TablaComponent) {
    this.relaciones.push(_tabla);
    _tabla.setCampoForanea(this.campoPrimario);
  }

  agregarArbol(_arbol: ArbolComponent) {
    this.arbol = _arbol;
    this.arbol.onSeleccionar = () => { this.onSeleccionarArbol(); };
    this.tabla.campoPadre = this.arbol.campoPadre;
    this.getColumna(this.tabla.campoPadre).visible = false; //Por defecto oculta 
  }

  /**
   * Se ejecuta cuando selecciona un node del Arbol
   */
  private onSeleccionarArbol() {
    if (this.arbol.getValorSeleccionado() !== this.tabla.valorPadre) {
      this.seleccionada = null;
      this.ejecutarValorPadre(this.arbol.getValorSeleccionado());
    }
  }

  ordenarColumnas() {
    this.columnas.sort((a, b) => (a.orden < b.orden ? -1 : 1));
  }

  isFilaInserrtada(_numeroFila: number) {
    try {
      let insert = this.datos[_numeroFila]['insertada'];
      if (this.utilitario.isDefined(insert)) {
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  /**
   * Retorna filas insertadas
   */
  getInsertadas(): any[] {
    return this.tabla.datos.filter(fila => fila.insertada === true);
  }

  /**
   * Retorna filas modificadas
   */
  getModificadas(): any[] {
    return this.tabla.datos.filter(fila => fila.modificada === true);
  }

  /**
   * Retorna filas eliminadas
   */
  getEliminadas(): any[] {
    return this.eliminadas;
  }

  /**
   * Retorna el total de filas 
   */
  getTotalFilas() {
    return this.datos.length;
  }

  /**
   * Tipo Formulario
   */
  setTipoFormulario() {
    this.tipoFormulario = true;
    this.validarInsertar = true;
  }


  setExpandible(nombresColumnas: string) {
    let colArray = nombresColumnas.split(',');
    let cont = 0;
    for (let colActual of colArray) {
      this.getColumna(colActual).expandible = true;
      cont++;
    }
    this.numColumnasExpansibles = cont;
    this.expandible = true;
  }

  /**
   * Tipo Formulario Ionic
   */
  setTipoFormularioIonic() {
    this.tipoFormulario = true;
    this.validarInsertar = true;
    this.modoFormulario = 'ionic';
  }

  private setTipoTabla() {
    this.tipoFormulario = false;
    this.validarInsertar = false;
  }
  /**
   * Cuando el campo primario es de tipo serial
   */
  setSerialCampoPrimario() {
    this.tabla.calculaPrimaria = false;
  }

  setFilaActual(numeroFila: number) {
    let nuevaFila = this.datos[numeroFila];
    if (this.utilitario.isDefined(nuevaFila)) {
      this.onSeleccionarFila(nuevaFila);
    }
    else {
      this.utilitario.agregarMensajeError('No existe la fila ' + numeroFila);
    }

  }

  setLectura(_lectura: boolean) {
    this.tabla.lectura = _lectura;
    if (_lectura === true) {
      this.isBotonEliminar = false;
      this.isBotonInsertar = false;
    }
  }

  setCampoOrden(_campoOrden: string) {
    this.campoOrden = _campoOrden;
  }

  setFilasPorPagina(_filasPorPagina: number) {
    this.tabla.filasPorPagina = _filasPorPagina;
  }

  setTitulo(_titulo: string) {
    this.tabla.titulo = _titulo;
  }

  setCondiciones(_condiciones: Condicion) {
    this.tabla.condiciones = _condiciones;
  }

  setCampoForanea(_campoForanea: string) {
    this.tabla.campoForanea = _campoForanea.toLowerCase();
  }


  setCampoPadre(_campoPadre: string) {
    this.tabla.campoPadre = _campoPadre.toLowerCase();
  }

  //Solo muestra un registro
  setUnico() {
    this.tabla.numeroFilas = 1;
  }

  //retorna si es solo un registro
  isUnico(): boolean {
    if (this.tabla.numeroFilas === 1) {
      return true;
    }
    return false;
  }

  /**Hace de tipo seleccion simple con radio */
  setTipoSeleccionSimple() {
    this.tipoSeleccion = 'simple';
    this.lectura = true;
    this.selectionMode=null;
  }
  /**
   * Hace de tipo seleccion multiple con check
   */
  setTipoSeleccionMultiple() {
    this.tipoSeleccion = 'multiple';
    this.lectura = true;
    this.selectionMode=null;
  }


  //Exportaciones
  exportExcel() {
    //Genera el arreglo a Exportar
    const datosExporta = [];
    const colVisibles = this.columnas.filter(col => col.visible === true);
    for (const filaActual of this.datos) {
      let filaNueva = {};
      for (const colActual of colVisibles) {
        let valor = filaActual[colActual.nombre];
        const nombreColumna = colActual.nombreVisual.toUpperCase();
        if (colActual.isCombo) {
          if (typeof valor === 'object') {
            const obj = valor;
            if (this.utilitario.isDefined(obj)) {
              valor = obj.label;
            }
          }
          else {
            valor = this.getCampoNombreCombo(colActual.nombre, valor);
          }
        }
        filaNueva[nombreColumna] = valor;
      }
      datosExporta.push(filaNueva);
    }
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

  //Upload


  seleccionarImagen(data: { files: File }, nombreColumna, rowIndex, fileUpload) {
    let imagenSubir: File = data.files[0]; //solo una imagen
    //sube
    this.uploadService
      .subirFoto(imagenSubir)
      .then(img => {
        this.datos[rowIndex][nombreColumna] = img;
        //si es fila modificadas
        if (this.utilitario.isDefined(this.seleccionada['insertada']) == false) {
          this.seleccionada['modificada'] = true;
          let colModificadas = [];
          if (this.utilitario.isDefined(this.seleccionada['colModificadas'])) {
            colModificadas = this.seleccionada['colModificadas'];
          }
          colModificadas.indexOf(nombreColumna) === -1 ? colModificadas.push(nombreColumna) : colModificadas.indexOf(nombreColumna);
          this.seleccionada['colModificadas'] = colModificadas;
        }
        if (this.utilitario.isDefined(fileUpload)) {
          fileUpload.clear();
        }

      }).catch(err => {
        if (this.utilitario.isDefined(fileUpload)) {
          fileUpload.clear();
        }
        this.utilitario.agregarMensajeErrorServicioWeb(err);
      });
  }

  async abrirVisualizarImagen(nombreColumna, rowIndex) {
    const src = this.datos[rowIndex][nombreColumna];
    const titulo = this.getColumna(nombreColumna).nombreVisual.toUpperCase();
    const modal = await this.modalController.create({
      component: VisualizadorImagenComponent,
      componentProps: {
        src,
        titulo
      },
      cssClass: 'modal-fullscreen',
      keyboardClose: true,
      showBackdrop: true,
      mode: 'md'
    });
    await modal.present();
  }


  async abrirFormatoTabla() {

    const modal = await this.modalController.create({
      component: FormatoTablaComponent,

      componentProps: {
        columnas: this.columnas,
        tabla: this.tabla
      },
      cssClass: 'modal-fullscreen',
      //cssClass: 'my-custom-modal-class',
      keyboardClose: true,
      showBackdrop: true,
      mode: 'md'
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (this.utilitario.isDefined(data)) {
      this.tabla.columnas = (data.columnas as Columna[]);
      this.ordenarColumnas();
    }

  }

  borrarFiltros() {
    if (!this.tipoFormulario) {
      this.djtabla.clear();
      this.colFiltro.forEach(function (colF) {
        colF.clearFilter();
      });
    }
    this.textoFiltroGlobal = '';
    this.filtroGlobal = false;
  }

  mostrarBotonInsertar() {
    this.isBotonInsertar = true;
  }

  mostrarBotonEliminar() {
    this.isBotonEliminar = true;
  }

  mostrarBotonModificar() {
    this.isBotonModificar = true;
  }

  mostrarBotonFiltro() {
    this.isBotonFiltro = true;
  }

  ocultarBotonInsertar() {
    this.isBotonInsertar = false;
  }

  ocultarBotonEliminar() {
    this.isBotonEliminar = false;
  }

  ocultarBotonModificar() {
    this.isBotonModificar = false;
  }

  ocultarBotonFiltro() {
    this.isBotonFiltro = false;
  }

  ocultarBotonOpciones() {
    this.isBotonOpciones = false;
  }

  ocultarBotones() {
    this.isBotonInsertar = false;
    this.isBotonEliminar = false;
    this.isBotonFiltro = false;
    this.isBotonModificar = false;
    //this.isBotonOpciones = false;
  }
}
