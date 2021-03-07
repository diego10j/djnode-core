import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class ServicioBase {

    constructor(public http: HttpClient) {
    }


    /**
     * Llama a un servicio web post
     * @param servicio
     * @param body
     */
    llamarServicioPost(servicio: string, body?: any) {
        const url = `${environment.API_REST}/${servicio}`;
        return this.http.post(url, body);
    }

}