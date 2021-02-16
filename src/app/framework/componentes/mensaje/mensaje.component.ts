import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UtilitarioService } from '@servicios/utilitario.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss'],
  providers: [MessageService],
})
export class MensajeComponent {

  constructor(private messageService: MessageService,
    private utilitario: UtilitarioService) { }


  agregarMensaje($mensaje: string, $titulo?: string) {
    if (!this.utilitario.isDefined($titulo)) {
      $titulo = 'Información';
    }
    this.messageService.add({ severity: 'info', summary: $titulo, detail: $mensaje });
  }


  agregarMensajeExito($mensaje: string, $titulo?: string) {
    if (!this.utilitario.isDefined($titulo)) {
      $titulo = 'Éxito';
    }
    this.messageService.add({ severity: 'success', summary: $titulo, detail: $mensaje });
  }

  agregarMensajeError($mensaje: string, $titulo?: string) {
    if (!this.utilitario.isDefined($titulo)) {
      $titulo = 'Error';
    }
    this.messageService.add({ severity: 'error', summary: $titulo, detail: $mensaje });
  }

  agregarMensajeAdvertencia($mensaje: string, $titulo?: string) {
    if (!this.utilitario.isDefined($titulo)) {
      $titulo = 'Advertencia';
    }
    this.messageService.add({ severity: 'warn', summary: $titulo, detail: $mensaje });
  }


}
