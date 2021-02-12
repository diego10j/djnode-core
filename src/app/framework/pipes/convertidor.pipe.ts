import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'convertidor'
})
export class ConvertidorPipe implements PipeTransform {

    transform(valor, listaCombo) {

        //console.log(nombreColumna, '   ', valor);
        if (listaCombo.length > 0 && valor !== null) {
            const obj = listaCombo.find(x => x.value === valor);
            return obj.label;
        }
        return valor;
    }

}
