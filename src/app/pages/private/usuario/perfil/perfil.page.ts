import { Component, } from '@angular/core';
import { Usuario } from '@djnode/clases/usuario';
import Condicion from '@djnode/interfaces/condicion';
import { SeguridadService } from '@djnode/servicios/seguridad.service';
import { UploadService } from '@djnode/servicios/upload.service';
import { UtilitarioService } from '@servicios/utilitario.service';

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

  avatars = [
    {
      img: 'avatarh1.svg',
      seleccionado: false
    },
    {
      img: 'avatarh2.svg',
      seleccionado: false
    },
    {
      img: 'avatarh3.svg',
      seleccionado: false
    },
    {
      img: 'avatarh4.svg',
      seleccionado: false
    },
    {
      img: 'avatarh5.svg',
      seleccionado: false
    },
    {
      img: 'avatarh6.svg',
      seleccionado: false
    },
    {
      img: 'avatarh7.svg',
      seleccionado: false
    },
    {
      img: 'avatarm1.svg',
      seleccionado: false
    },
    {
      img: 'avatarm2.svg',
      seleccionado: false
    },
    {
      img: 'avatarm3.svg',
      seleccionado: false
    },
    {
      img: 'avatarm4.svg',
      seleccionado: false
    },
    {
      img: 'avatarm5.svg',
      seleccionado: false
    },
    {
      img: 'avatarm6.svg',
      seleccionado: false
    },
    {
      img: 'avatarm7.svg',
      seleccionado: false
    }
  ];




  constructor(private seguridad: SeguridadService,
    private utilitario: UtilitarioService,
    private uploadService: UploadService,) {
    this.usuario = this.seguridad.usuario;
    this.identificacion = this.utilitario.getVariableLocalStorage('identificacion');
    this.ultimaFecha = this.utilitario.getVariableLocalStorage('ultimaFecha');
  }

  ionViewWillEnter() {
  }

  seleccionarAvatar(avatar) {
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
  }

  async aceptarAvatar() {
    let avatar = this.avatars.find(avt => avt.seleccionado === true);
    this.actualizarAvatar(avatar.img);
  }

  /**Actualiza en la base de datos */
  private async actualizarAvatar(nombreImagen: string) {
    const valoresModifica = { avatar_usua: nombreImagen };
    const condicionUpdate: Condicion = { condicion: ' ide_usua= ?', valores: [this.usuario.uid] };
    let objModifica = this.utilitario.getObjSqlModificar('sis_usuario', valoresModifica, [condicionUpdate]);
    await this.utilitario.ejecutarListaSQL([objModifica]);
    //Llama al servicio de eliminar imagen
    if (this.utilitario.isDefined(this.usuario.img)) {
      if (this.usuario.img.startsWith('avatar') == false) {
        //Borra archivo de imagen en el servidor
        this.uploadService.eliminarArchivo(this.usuario.img).subscribe(resp => { });
      }
    }

    this.imagenSubir = null;
    this.imgTemp = null;
    this.usuario.img = nombreImagen;
    localStorage.setItem('avatar', nombreImagen);
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
    this.utilitario.abrirLoading();
    this.uploadService
      .subirFoto(this.imagenSubir)
      .then(async img => {
        this.actualizarAvatar(img);
        this.utilitario.cerrarLoading();
      }).catch(err => {
        this.utilitario.agregarMensajeErrorServicioWeb(err);
        this.utilitario.cerrarLoading();
      });
  }

}
