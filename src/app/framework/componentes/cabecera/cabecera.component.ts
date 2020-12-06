import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Usuario } from '../../clases/usuario';
import { SeguridadService } from '../../servicios/seguridad.service';
import { PopoverUsuarioComponent } from '../popover-usuario/popover-usuario.component';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {

  public usuario: Usuario;

  public firstLetter = "";

  constructor(private seguridad: SeguridadService,
    private popoverCtrl: PopoverController) {
    this.usuario = seguridad.usuario;
  }

  logout() {
    //this.seguridad.logout();
  }
  ngOnInit() {
    this.firstLetter = this.usuario.nombre.charAt(0) || '';
  }

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


  async abrirPopoverUsuario(ev: any) {

    const popover = await this.popoverCtrl.create({
      component: PopoverUsuarioComponent,
      event: ev,
      mode: 'ios',
      translucent: true,
      backdropDismiss: true,
      showBackdrop: true,
    });
    await popover.present();

  }


}
