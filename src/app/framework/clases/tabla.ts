import Columna from './columna';
import Condicion from '../interfaces/condicion';
export default class Tabla {
    columnas: Columna[];
    datos: any[];
    nombreTabla: string;
    campoPrimario: string;
    campoForanea: string;
    valorForanea: string;
    campoPadre: string;
    valorPadre: string;
    campoOrden: string;
    condiciones: Condicion;
    numeroFilas = 1000; // Número de filas que recupera del sw
    filasPorPagina = 15;
    pagina: number = 1;
    filaActual: number = 0;
    seleccionada: any;
    lectura = true;
    calculaPrimaria=true;
}