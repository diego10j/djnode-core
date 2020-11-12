import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor() { }

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
      const url = `${environment.API_REST}/api/upload/uploadArchivo`;
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


}
