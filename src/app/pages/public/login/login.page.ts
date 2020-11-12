import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilitarioService } from '../../../services/utilitario.service';
import { SeguridadService } from '../../../framework/servicios/seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    identificacion: ['', Validators.required],
    clave: ['', Validators.required],
    recordar: [true],
  });

  constructor(private fb: FormBuilder,
    private utilitario: UtilitarioService,
    private seguridad: SeguridadService) { }

  ngOnInit() { 
  }

  abrirRegistrar() {
    this.utilitario.abrirPaginaPublica('registro');
  }

  validarLogin() {
    this.seguridad.login(this.loginForm.value)
      .subscribe(resp => {

        if (this.loginForm.get('recordar').value) {
          localStorage.setItem('identificacion', this.loginForm.get('identificacion').value);
        } else {
          localStorage.removeItem('identificacion');
        }
        // Navegar al Dashboard
        //this.router.navigateByUrl('/');
        this.utilitario.abrirPagina('dashboard');


      }, (err) => {
        // Si sucede un error
        this.utilitario.agregarMensajeError(err.error.mensaje);
      });

  }

}
