import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.scss'],
})
export class BotonComponent implements OnInit {

  @Input() valor: string;
  @Input() color = "secondary";
  @Input() class: string;
  @Input() icono: string;
  @Input() modo = 'ionic';  //ionic -prime
  @Input() disabled = false; 
  @Input() soloIcono = false;
  @Input() soloBorde = false;
  @Output() onClick = new EventEmitter<any>();

  onClickButton(event) {
    this.onClick.emit(event);
  }

  constructor() { }

  ngOnInit() { }

}
