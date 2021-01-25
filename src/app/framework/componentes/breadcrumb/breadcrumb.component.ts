import { Component, OnDestroy } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnDestroy {

  rutas = [];
  items: MenuItem[];

  plataforma: string = 'desktop'; //defecto

  public tituloSubs$: Subscription;

  constructor(private utilitario: UtilitarioService, private route: ActivatedRoute, private router: Router) {
    this.plataforma = this.utilitario.getPlataforma();
    this.tituloSubs$ = this.getArgumentosRuta()
      .subscribe(({ titulo }) => {
        this.cargarRuta();
      });

  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {

    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      );
  }

  cargarRuta() {
    this.rutas = [];
    let ide_opci = this.utilitario.getIdeOpci();
    //Busqueda recursiva
    while (ide_opci !== null) {
      const encontro = this.busquedaPadre(ide_opci);
      if (this.utilitario.isDefined(encontro)) {
        ide_opci = encontro.padre;
      }
      else {
        ide_opci = null;
      }
    }

    this.items = [];
    let cont = 0;
    for (let opci of this.rutas) {
      cont++;
      if (cont === this.rutas.length) {
        this.items.push({
          label: opci.label,
          styleClass: 'active'
        });
      }
      else {
        if (this.plataforma === 'desktop') {
          this.items.push({
            label: opci.label, command: () => {
              this.abrirPagina(opci);
            }
          });
        }

      }

    }


  }

  private busquedaPadre(ide_opci: string): any {
    const menus = JSON.parse(localStorage.getItem('menu')) || [];
    for (const opciActual of menus) {
      const encontro = this.busquedaRecursivaOpcion(opciActual, ide_opci);
      if (encontro !== null) {
        return encontro;
      }
    }
  }


  private busquedaRecursivaOpcion(opcion: any, ide_opci: string): any {
    if (opcion.data === ide_opci) {
      this.rutas.unshift(opcion);
      return opcion;
    }
    if (opcion.items) {
      for (const opciActual of opcion.items) {
        const encontro = this.busquedaRecursivaOpcion(opciActual, ide_opci);
        if (encontro !== null) {
          return encontro;
        }
      }
    }
    return null;
  }

  private abrirPagina(opcion) {
    if (this.utilitario.isDefined(opcion)) {
      if (opcion.ruta) {
        if (this.utilitario.isDefined(opcion.ruta)) {
          var index = this.utilitario.getPantallasGenericas().indexOf(opcion.ruta);
          if (index === -1) {
            this.utilitario.abrirPagina(opcion.ruta);
          }
          else {
            this.utilitario.abrirPagina(opcion.ruta + '/' + 'generic_' + opcion.data);
          }
        }
      }
    }
  }
  private abrirInicio() {
    this.utilitario.abrirPagina('dashboard');
  }

}
