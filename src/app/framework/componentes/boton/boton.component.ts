import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.scss'],
})
export class BotonComponent implements OnInit {

  @Input() texto: string;
  @Input() titulo: string;
  @Input() color?: 'primary' | 'secondary' | 'tertiary' | 'medium' | 'success' | 'danger' | 'dark' | 'warning' = 'secondary';
  @Input() class: string;
  @Input() icono: string;
  @Input() modo?: 'ionic' | 'prime' = 'ionic';  //ionic - prime
  @Input() disabled = false;

  @Input() soloBorde = false;
  @Output() onClick = new EventEmitter<any>();

  onClickButton(event) {
    this.onClick.emit(event);
  }

  get soloIcono(): boolean {
    if (this.texto) {
      return false;
    }
    return true;
  }

  constructor() { }

  ngOnInit() { }

}
