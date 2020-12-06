import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../../framework/servicios/seguridad.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { Usuario } from '../../../../framework/clases/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public usuario: Usuario;
  public identificacion;
  public ultimaFecha;

   public imagenSubir: File;
   public imgTemp: any = null;

  constructor(private seguridad: SeguridadService,
    private utilitario: UtilitarioService) {
      this.usuario = seguridad.usuario;
      this.identificacion= this.utilitario.getVariableLocalStorage('identificacion');
      this.ultimaFecha= this.utilitario.getVariableLocalStorage('ultimaFecha');
   }

  ngOnInit() {
  }


  cambiarImagen( data: { files: File }) {
    this.imagenSubir = data.files[0];

    if ( !data.files[0] ) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( data.files[0] );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

}
