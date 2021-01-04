import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {

  @Input() nombre: string;
  @Input() imagen: string;
  @Input() color: string;
  @Input() textColor: string;

  public firstLetters = "";
  public styles = {
    'background-color': "#fff",
    'color': "#fefefe"
  };


  colores: any[] = ['#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6',
    '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#aed581', '#ff8a65', '#1de157', '#673ab7',
    '#ffb74d', '#a1887f', '#90a4ae'];

  constructor(private utilitario: UtilitarioService) { }

  ngOnChanges(changes: SimpleChanges) {
    let nombre = changes['nombre'] ? changes['nombre'].currentValue : '';
    let color = changes['color'] ? changes['color'].currentValue : null;
    let textColor = changes['textColor'] ? changes['textColor'].currentValue : this.styles.color;
    this.firstLetters = this.extractFirstCharacters(nombre);
    this.styles = { ...this.styles, 'background-color': this.backgroundColorHexString(color, nombre), 'color': textColor }
  }

  private extractFirstCharacters(nombre: string): string {
    let letras = ''
    if (this.utilitario.isDefined(nombre)) {
      letras = nombre.charAt(0);
      if (nombre.indexOf(' ') !== -1) {
        nombre = nombre.substring(nombre.indexOf(' ') + 1, nombre.length);
        letras += nombre.charAt(0);
      }
    }
    return letras;
  }

  private backgroundColorHexString(color: string, nombre: string): string {
    return color || this.getColor(nombre);
  }


  public getColor(str: string): string {
    return this.colores[Math.abs(this.toNumber(str)) % this.colores.length];
  }

  private toNumber(str: string): number {
    let h = 0;

    for (let i = 0; i < str.length; i++) {
      h = 31 * h + str.charCodeAt(i);
      h |= 0; // Convert to 32bit integer
    }

    return h;
  };




}
