import { Component, OnInit, Input } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.scss'],
})
export class TextoComponent implements OnInit {

  @Input() width = "200px"; //defecto
  @Input() lectura = false;
  @Input() label: string;
  @Input() type ?: 'text' | 'password' | 'password' | 'email' | 'number' | 'tel' | 'url' = 'text';
  valor: string;

  plataforma: string = 'desktop'; //defecto
  invalid = false;

  //Eventos
  onChange?: (event?: any) => void;


  constructor(private utilitario: UtilitarioService) {
    this.plataforma = this.utilitario.getPlataforma();
  }


  public changeEvent() {
    this.invalid = false;
    //Ejecuta callback method
    if (this.onChange) {
      this.onChange({
        originalEvent: null
      });
    }
  }

  setInvalid(invalid: boolean) {
    this.invalid = invalid;
  }

  setValor(valor: string) {
    this.valor = valor;
  }

  getValor():string {
    return this.valor;
  }
  ngOnInit() { }

}
