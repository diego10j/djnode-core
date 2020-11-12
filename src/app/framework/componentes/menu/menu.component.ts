import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from './menu.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UtilitarioService } from '../../../services/utilitario.service';
import { SeguridadService } from '../../servicios/seguridad.service';
import { Usuario } from '../../clases/usuario';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class MenuComponent implements OnInit {

  @Input() titulo = "Menú de Opciones";

  @Input() tituloPaginaInicio = "Dashboard";
  @Input() iconoPaginaInicio = "fa fa-tachometer-alt";

  public usuario: Usuario;
  menus = [];
  constructor(private sidebarservice: MenuService,
    private seguridad: SeguridadService,
    private menuCtrl: MenuController,
    private utilitario: UtilitarioService) {
    this.menus = [];
    this.menus = sidebarservice.getMenuList();
    this.usuario = seguridad.usuario;
    //Agrega cabecera del menu y pagina principal
    this.menus.unshift(
      {
        title: this.tituloPaginaInicio,
        icon: this.iconoPaginaInicio,
        active: false,
        type: 'simple',
        url: 'dashboard',
      }
    );
    this.menus.unshift(
      {
        title: this.titulo,
        type: 'header'
      }
    );



  }

  ngOnInit() {
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown' || currentMenu.type === 'simple') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  abrirPagina(currentMenu) {
    this.toggle(currentMenu);
    currentMenu.active=true;
    this.menuCtrl.close();
    if (this.utilitario.isDefined(currentMenu.url)) {
      this.utilitario.abrirPagina(currentMenu.url);
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  logout() {
    this.seguridad.logout();
    this.sidebarservice.menus = [];
  }

}