import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../servicios/seguridad.service';
import { Usuario } from '../../clases/usuario';
import { UtilitarioService } from '../../../services/utilitario.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-usuario',
  templateUrl: './popover-usuario.component.html',
  styleUrls: ['./popover-usuario.component.scss'],
})
export class PopoverUsuarioComponent implements OnInit {

  public usuario: Usuario;
  constructor(private seguridad: SeguridadService,
    private utilitario: UtilitarioService,
    private currentPopover: PopoverController) {
    this.usuario = seguridad.usuario;
  }


  logout() {
    this.seguridad.logout(this.utilitario.getPlataforma());
  }

  abrirPerfil(){
    this.utilitario.abrirPagina('perfil');
    this.currentPopover.dismiss();
  }


  ngOnInit() { }

}
