import { Component, OnInit } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-rango-fechas',
  templateUrl: './rango-fechas.component.html',
  styleUrls: ['./rango-fechas.component.scss'],
})
export class RangoFechasComponent implements OnInit {


  plataforma: string = 'desktop'; //defecto

  constructor(private utilitario: UtilitarioService) {
    this.plataforma = this.utilitario.getPlataforma();
  }


  ngOnInit() {}

}
