import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'moment'
})
export class MomentPipe implements PipeTransform {

    transform(date, format) {
        if(date){
            return moment(date).format(format);
        }
       return null;
    }

}
