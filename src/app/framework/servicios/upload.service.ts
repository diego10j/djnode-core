import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { ServicioBase } from '../clases/servicio-base';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends ServicioBase {


  async subirFoto(
    archivo: File
  ) {

    try {
      const url = `${environment.API_REST}/api/uploads/subirImagen`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      const data = await resp.json();
      if (data.nombreImagen) {
        return data.nombreImagen;
      } else {
        console.log(data.mensaje);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }



  async subirArchivo(
    archivo: File
  ) {

    try {
      const url = `${environment.API_REST}/api/uploads/uploadArchivo`;
      const formData = new FormData();
      formData.append('archivo', archivo);

      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      if (data.datos) {
        return data.datos.NOMBRE_ARCHIVO;
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }


  eliminarArchivo(nombreArchivo: string) {
    if (nombreArchivo) {
      const body = {
        nombreArchivo
      };
      return this.llamarServicioPost('api/uploads/eliminarArchivo', body);
    }
  }


}
