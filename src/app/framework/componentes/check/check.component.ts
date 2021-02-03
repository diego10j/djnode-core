import { Component, OnInit, Input } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
})
export class CheckComponent implements OnInit {

  @Input() lectura = false;
  @Input() label: string;
  plataforma: string = 'desktop'; //defecto
  invalid = false;
  valor= false;

  //Eventos
  onChange?: (event?: any) => void;


  constructor(private utilitario: UtilitarioService) {
    this.plataforma = this.utilitario.getPlataforma();
  }

  ngOnInit() { }

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

}
