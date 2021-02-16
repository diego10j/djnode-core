import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '@djnode/servicios/seguridad.service';
import { Usuario } from '@djnode/clases/usuario';
import { UtilitarioService } from '@servicios/utilitario.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-usuario',
  templateUrl: './popover-usuario.component.html',
  styleUrls: ['./popover-usuario.component.scss'],
})
export class PopoverUsuarioComponent implements OnInit {

  public usuario: Usuario;

  darkMode: boolean = true;

  // Listen for changes to the prefers-color-scheme media query

  constructor(private seguridad: SeguridadService,
    private utilitario: UtilitarioService,
    private currentPopover: PopoverController) {
    this.usuario = seguridad.usuario;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  cambio() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }




  logout() {
    this.currentPopover.dismiss();
    this.seguridad.logout(this.utilitario.getPlataforma());
  }

  abrirPerfil() {
    this.utilitario.abrirPagina('perfil');
    this.currentPopover.dismiss();
  }


  ngOnInit() { }

}
