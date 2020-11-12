import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-visualizador-imagen',
  templateUrl: './visualizador-imagen.component.html',
  styleUrls: ['./visualizador-imagen.component.scss'],
})
export class VisualizadorImagenComponent implements OnInit {

  @Input() src;
  @Input() titulo;
  @Input() descripcion;


  slideOpts = {
    centeredSlides: 'true',
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(private modalController: ModalController, private socialSharing: SocialSharing) { }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss();
  }

  compartir() {
    this.socialSharing.share(
      this.titulo,
      this.descripcion,
      this.src
    );
  }

  get imagen() {
    if (!this.src) {
      return `${environment.API_REST}/api/uploads/getImagen/no-img.jpg`;
    } else {
      return `${environment.API_REST}/api/uploads/getImagen/${this.src}`;
    }
  }


}
