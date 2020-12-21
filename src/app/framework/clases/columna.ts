export default class Columna {

    nombre: string;
    orden: number;
    requerida = false;
    tipo: string;
    longitud: number;
    anchoColumna: number;
    configCombo: any;
    decimales: number;
    //campoPrimario = false;
    visible = true;
    lectura = false;
    nombreVisual: string;
    componente?: 'Texto' | 'Calendario' | 'Hora' | 'CalendarioHora' | 'Check' | 'Combo' |
        'TextoEntero' | 'TextoNumero' | 'TextoMoneda' | 'Autocompletar' | 'Radio' | 'Etiqueta' | 'Upload';
    valorDefecto: any = null;
    mascara: string;
    listaCombo: any[];
    listaRadio: any[];
    filtro = false;
    comentario: string;
    mayusculas = false;
    unico = false;
    suma = false;
    total: number;
    alinear?: 'izquierda' | 'derecha' | 'centro' = 'izquierda';
    nullCombo = true;
    textoFiltro: string;
    tipoFiltro?: 'text' | 'numeric' | 'date' | 'boolean' = 'text';
    ordenable=true;
    expandible=false;

    //Eventos
    onMetodoChange?: (event?: any) => void;

    setLongitud(_longitud: number) {


        if (_longitud === null) {
            _longitud = 10;
        }
        this.longitud = _longitud;
        //Calcula la longitud 
        //console.log(this.nombreVisual + '  ' +_longitud);
        if (_longitud > 0 && _longitud < 20) {
            _longitud = 10;
        }
        else if (_longitud >= 20 && _longitud < 30) {
            _longitud = 12;
        }
        else if (_longitud >= 30 && _longitud < 40) {
            _longitud = 15;
        }
        else if (_longitud >= 40 && _longitud < 50) {
            _longitud = 18;
        }
        else if (_longitud >= 50 && _longitud < 60) {
            _longitud = 21;
        }
        else if (_longitud >= 60 && _longitud < 70) {
            _longitud = 24;
        }
        else if (_longitud >= 70 && _longitud < 80) {
            _longitud = 27;
        }
        else if (_longitud >= 80 && _longitud < 90) {
            _longitud = 30;
        }
        else if (_longitud >= 90 && _longitud < 100) {
            _longitud = 33;
        }
        else if (_longitud >= 100 && _longitud < 200) {
            _longitud = 36;
        }
        else if (_longitud >= 200) {
            _longitud = 39;
        }
        this.anchoColumna = _longitud;
    }


    setAlinerar(_alinear: 'izquierda' | 'derecha' | 'centro') {
        this.alinear = _alinear;
    }

    setEtiqueta() {
        this.componente = 'Etiqueta';
    }

    setCombo(nombreTabla: string, campoPrimario: string, campoNombre: string, condicion?: string) {
        this.configCombo = {
            nombreTabla,
            campoPrimario,
            campoNombre,
            condicion
        };
        this.componente = "Combo";
        this.longitud = 50; // ancho por defecto de una columna que se hace combo
    }

    setComboSql(sql: string) {
        this.configCombo = {
            sql
        };
        this.componente = "Combo";
        this.longitud = 50; // ancho por defecto de una columna que se hace combo
    }

    setAutocompletar() {
        if (this.componente === 'Combo') {
            this.componente = 'Autocompletar';
        }
    }

    setUpload() {
        this.componente = 'Upload';
        this.ordenable=false;
        if(this.lectura){
            this.anchoColumna = 10;
        }
        else{
            this.anchoColumna = 20;
        }
    }

    get isCombo(): boolean {
        if (this.configCombo) {
            return true;
        }
        return false;
    }

    setNombreVisual(_nombre: string) {
        this.nombreVisual = _nombre.toUpperCase();
    }

    setVisible(_visible: boolean) {
        this.visible = _visible;
    }

    setFiltro(_filtro: boolean) {
        this.filtro = true;
        this.tipoFiltro='text';
        if(_filtro){
            if(this.tipo === 'numeric' || this.tipo ===  'decimal' || this.tipo === 'int' || this.tipo === 'bigint' || this.tipo === 'integer' || this.tipo === 'money'){
                this.tipoFiltro='numeric';
            }
            else if(this.tipo === 'date'){
                this.tipoFiltro='date';
            }
            else if(this.tipo === 'boolean'){
                this.tipoFiltro='boolean';
            }
        }
    }

    setOrden(_orden: number) {
        this.orden = _orden;
    }

    setLectura(_lectura: boolean) {
        this.lectura = _lectura;
        this.componente='Etiqueta';
    }

}