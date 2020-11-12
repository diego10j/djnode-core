import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import { SeguridadService } from '../../servicios/seguridad.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {

  public usuario: Usuario;

  constructor(private seguridad: SeguridadService) {
    this.usuario = seguridad.usuario;
  }

  logout() {
    this.seguridad.logout();
  }
  ngOnInit() { }

  async toggleMenu() {
    const splitPane = document.querySelector('ion-split-pane');
    const windowWidth = window.innerWidth;
    const splitPaneShownAt = 768;
    const when = `(min-width: ${splitPaneShownAt}px)`;
    if (windowWidth >= splitPaneShownAt) {
      splitPane.classList.toggle('split-pane-visible')
    } else {
      // split pane view is not visible
      // toggle menu open
      const menu = splitPane.querySelector('ion-menu');
      if (await menu.isOpen()) {
        menu.close();
      }
      else {
        menu.open();
      }
    }
  }


}
