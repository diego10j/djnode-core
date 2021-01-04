import Columna from './columna';
import Condicion from '../interfaces/condicion';
export default class Tabla {
    columnas: Columna[];
    datos: any[];
    nombreTabla: string;
    campoPrimario: string;
    campoForanea: string;
    campoNombre: string;
    valorForanea: string;
    campoPadre: string;
    valorPadre: string;
    campoOrden: string;
    condiciones: Condicion;
    numeroFilas = 1000; // Número de filas que recupera del sw
    filasPorPagina = 10;
    pagina: number = 1;
    filaActual: number = 0;
    seleccionada: any;
    lectura = true;
    calculaPrimaria=true;
    ideTabla:string; //pk sis_tabla
    numeroTabla:string; //numero tabla sis_tabla
    tipoFormulario = false;
    titulo:string;
}