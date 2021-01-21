import { Component, OnInit, Input } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { SistemaService } from '../../servicios/sistema.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss'],
})
export class ComboComponent implements OnInit {

  listaCombo: any[] = [];
  valor: any;
  @Input() lectura = false;
  @Input() nullCombo = true;
  plataforma: string = 'desktop'; //defecto



  constructor(private utilitario: UtilitarioService,
    private sistemaService: SistemaService) {
    this.plataforma = this.utilitario.getPlataforma();
  }

  ngOnInit() { }

  setCombo(nombreTabla: string, campoPrimario: string, campoNombre: string, condicion?: string) {
    this.sistemaService.getComboTabla(nombreTabla, campoPrimario,
      campoNombre, condicion).subscribe(resp => {
        const respuest: any = resp;
        if (respuest.datos) {
          this.listaCombo = respuest.datos;
          if (this.nullCombo) {
            //Agrega null a opcion
            this.listaCombo.unshift({ value: null, label: 'Seleccionar...' });
          }
        }
      }, (err) => {
        this.utilitario.agregarMensajeErrorServicioWeb(err);
      });
  }

  mostrarNull(nullCombo: boolean) {
    this.nullCombo = nullCombo;
  }

  setLectura(lectura: boolean) {
    this.lectura = lectura;
  }


  getValor() {
    return this.valor;
  }

}
