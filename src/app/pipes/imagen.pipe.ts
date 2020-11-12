import { Pipe, PipeTransform } from '@angular/core';
import { UtilitarioService } from '../services/utilitario.service';
import { environment } from '../../environments/environment.prod';
//const URL = environment.rest_api;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): string {
    if (!img) {
      return `${environment.API_REST}/api/uploads/getImagen/no-img.jpg`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${environment.API_REST}/api/uploads/getImagen/${img}`;
    } 
  }

}
