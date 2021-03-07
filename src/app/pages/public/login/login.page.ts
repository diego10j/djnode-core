import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilitarioService } from '@servicios/utilitario.service';
import { SeguridadService } from '@djnode/servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {



  public loginForm = this.fb.group({
    identificacion: ['', Validators.required],
    clave: ['', Validators.required],
    recordar: [false],
  });

  constructor(private fb: FormBuilder,
    private utilitario: UtilitarioService,
    private router: Router,
    private seguridad: SeguridadService) { }

    ionViewWillEnter() { 
    this.loginForm.reset();
  }

  abrirRegistrar() {
    this.utilitario.abrirPaginaPublica('registro');
  }

  validarLogin() {
    this.utilitario.abrirLoading();
    this.seguridad.login(this.loginForm.value)
      .subscribe(resp => {
        if (this.loginForm.get('recordar').value) {
          localStorage.setItem('identificacion', this.loginForm.get('identificacion').value);
        } else {
          localStorage.removeItem('identificacion');
        }
        // Navegar al Dashboard
        this.router.navigateByUrl('/private/dashboard');
       // this.utilitario.abrirPagina('dashboard');
       this.utilitario.cerrarLoading();
      }, (err) => {
        // Si sucede un error
        this.utilitario.cerrarLoading();
        if(this.utilitario.isDefined(err.error)){
          this.utilitario.agregarMensajeError(err.error.mensaje);
        }
      });

  }

}
