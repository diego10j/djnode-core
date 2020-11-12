import { Component, OnInit, Input, TemplateRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss'],
})
export class DivisionComponent implements OnInit {


  @Input() tipo?: 'horizontal' | 'vertical' = 'vertical';
  @Input() porcentaje1 = 50; //Por defecto 
  @Input() porcentaje2=0;

  @ContentChild('division1') division1: TemplateRef<any>;
  @ContentChild('division2') division2: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() { }

}
