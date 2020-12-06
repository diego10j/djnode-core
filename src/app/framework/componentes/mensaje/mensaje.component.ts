import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss'],
  providers: [MessageService],
})
export class MensajeComponent{

  constructor(private messageService: MessageService) { }


  agregarMensaje($mensaje: string, $titulo?: string) {
    this.messageService.add({ severity: 'info', summary: $titulo, detail: $mensaje });
  }

  agregarMensajeError($mensaje: string, $titulo?: string) {
    this.messageService.add({ severity: 'error', summary: $titulo, detail: $mensaje });
  }

  agregarMensajeAdvertencia($mensaje: string, $titulo?: string) {
    this.messageService.add({ severity: 'warn', summary: $titulo, detail: $mensaje });
  }


}
