import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { MomentPipe } from './moment.pipe';
import { ConvertidorPipe } from './convertidor.pipe';
@NgModule({
  declarations: [FiltroPipe, ImageSanitizerPipe, ImagenPipe, DomSanitizerPipe,MomentPipe,ConvertidorPipe],
  imports: [
    CommonModule
  ],
  exports: [ FiltroPipe, ImageSanitizerPipe,ImagenPipe,DomSanitizerPipe,MomentPipe,ConvertidorPipe]

})
export class PipesModule { }
