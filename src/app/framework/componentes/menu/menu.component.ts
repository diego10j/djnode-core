import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { SeguridadService } from '../../servicios/seguridad.service';
import { Usuario } from '../../clases/usuario';
import { LoadingController, MenuController } from '@ionic/angular';
import { createAnimation, Animation } from '@ionic/core';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {

  @Input() titulo = 'Menú de Opciones';
  @Input() tituloPaginaInicio = 'Dashboard';
  @Input() iconoPaginaInicio = 'home-outline';

  selected = '';

  public usuario: Usuario;
  menus: any[];
  constructor(private seguridad: SeguridadService,
    private menuCtrl: MenuController,
    private utilitario: UtilitarioService,) {
    this.cargarMenu();
  }

  ngOnInit() {
    this.cargarMenu();
  }
  ngOnDestroy() {
    this.menus = [];
    this.selected = '';
  }


  private cargarMenu() {
    this.menus = [];
    this.getMenuList();
    this.usuario = this.seguridad.usuario;
    //Agrega cabecera del menu y pagina principal
    const itemDashboard: any = {
      label: this.tituloPaginaInicio,
      icon: this.iconoPaginaInicio,
      badge: 'Inicio',
      ruta: 'dashboard',
      badgeStyleClass: 'success'
    }
    this.menus.unshift(itemDashboard);
    //this.selected = this.utilitario.getRuta();
  }

  abrirPagina(opcion) {
    if (opcion.ruta) {
      this.selected = opcion.data;
      if (this.utilitario.isDefined(opcion.ruta)) {

        var index = this.utilitario.getPantallasGenericas().indexOf(opcion.ruta);
        if (index === -1) {
          this.utilitario.abrirPagina(opcion.ruta);
        }
        else {
          this.utilitario.abrirPagina(opcion.ruta + '/' + 'generic_' + opcion.data);
        }



        if (this.utilitario.isDefined(opcion.data)) {
          this.seguridad.auditoriaAccesoPantalla(opcion.data, this.utilitario.getPlataforma());
        }
      }
      this.menuCtrl.close();
    }
  }


  logout() {
    this.seguridad.logout(this.utilitario.getPlataforma());
    this.menus = [];
  }


  getMenuList() {
    this.menus = JSON.parse(localStorage.getItem('menu')) || [];
  }


  toggleMenu(menu) {
    //Cierra todos los menus principales abiertos
    const menusP = this.menus.find(op => op.isOpen === true);
    if (this.utilitario.isDefined(menusP)) {
      if (menusP !== menu) {
        if (menusP.isOpen) {
          const from = '50px';
          const to = '0px';
          const fromRotate = 'rotate(90deg)';
          const toRotate = 'rotate(0deg)';
          const animation = createAnimation()
            .addElement(document.querySelectorAll('.' + menusP.tag))
            .duration(300)
            .fromTo('height', from, to);
          animation.play();
          const animation2 = createAnimation()
            .addElement(document.querySelectorAll('.chevron_' + menusP.tag))
            .duration(300)
            .fromTo('transform', fromRotate, toRotate);
          animation2.play();
          menusP.isOpen = false;
        }
      }
    }

    if (menu.ruta) {
      this.abrirPagina(menu);
    }
    else {
      const from = menu.isOpen ? '50px' : '0px';
      const to = menu.isOpen ? '0px' : '50px';
      const fromRotate = menu.isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
      const toRotate = menu.isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
      const animation = createAnimation()
        .addElement(document.querySelectorAll('.' + menu.tag))
        .duration(300)
        .fromTo('height', from, to);
      animation.play();
      const animation2 = createAnimation()
        .addElement(document.querySelectorAll('.chevron_' + menu.tag))
        .duration(300)
        .fromTo('transform', fromRotate, toRotate);
      animation2.play();
      menu.isOpen = !menu.isOpen;
    }

  }


}