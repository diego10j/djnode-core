import { environment } from '../../../environments/environment.prod';


export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public img?: string,
        public google?: boolean,
        public rol?: string,
        public uid?: string,
    ) { }

    get imagenUrl() {

        if (localStorage.getItem('avatar')) {
            this.img = localStorage.getItem('avatar');
        }

        if (!this.img) {
            return `${environment.API_REST}/api/uploads/getImagen/no-img.jpg`;
        } else if (this.img.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${environment.API_REST}/api/uploads/getImagen/${this.img}`;
        } else {
            return `${environment.API_REST}/api/uploads/getImagen/no-img.jpg`;
        }
    }
}

