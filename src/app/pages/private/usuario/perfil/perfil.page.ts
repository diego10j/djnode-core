import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../../framework/servicios/seguridad.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { Usuario } from '../../../../framework/clases/usuario';
import { UploadService } from '../../../../framework/servicios/upload.service';
import Condicion from '../../../../framework/interfaces/condicion';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  public usuario: Usuario;
  public identificacion;
  public ultimaFecha;

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private seguridad: SeguridadService,
    private utilitario: UtilitarioService,
    private uploadService: UploadService,) {
    this.usuario = this.seguridad.usuario;
    this.identificacion = this.utilitario.getVariableLocalStorage('identificacion');
    this.ultimaFecha = this.utilitario.getVariableLocalStorage('ultimaFecha');
  }

  ionViewWillEnter() {
  }


  cambiarImagen(data: { files: File }, fileUpload) {
    this.imagenSubir = data.files[0];
    if (!data.files[0]) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(data.files[0]);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    fileUpload.clear();
  }

  actualizarImagen() {
    //sube
    this.uploadService
      .subirFoto(this.imagenSubir)
      .then(img => {
        const valoresModifica = { avatar_usua: img };
        const condicionUpdate: Condicion = { condicion: ' ide_usua= ?', valores: [this.usuario.uid] };
        let objModifica = this.utilitario.getObjSqlModificar('sis_usuario', valoresModifica, [condicionUpdate]);
        this.utilitario.ejecutarListaSQL([objModifica]);
        //Llama al servicio de eliminar imagen
        if (this.utilitario.isDefined(this.usuario.img)) {
          this.uploadService.eliminarArchivo(this.usuario.img);
        }
        this.imagenSubir =null;
        this.usuario.img=img;
        localStorage.setItem('avatar', img);
        this.imgTemp =null;
      }).catch(err => {
        this.utilitario.agregarMensajeError('<p>' + err.error.mensaje + '</p> <p><strong>Origen: </strong>' + err.message + '</p> ');
      });
  }

}
