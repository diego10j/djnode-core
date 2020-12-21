import { Component, OnInit } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { SeguridadService } from '../../../framework/servicios/seguridad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  public formSubmitted = false;

  public registrarForm = this.fb.group({
    identificacion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required, Validators.minLength(6)]],
    clave2: ['', Validators.required],
    terminos: [true, Validators.required],
  }, {
    validators: this.clavesIguales('clave', 'clave2')
  });

  constructor(private fb: FormBuilder,
    private utilitario: UtilitarioService,
    private seguridad: SeguridadService) { }

  ngOnInit() {
  }
  abrirLogin() {
    this.utilitario.abrirPaginaPublica('login');
  }

  campoNoValido( campo: string ): boolean {
    if ( this.registrarForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  registrar() {
    this.formSubmitted = true;
    if (this.registrarForm.invalid) {
      return;
    }
    // Realizar el posteo
    this.utilitario.abrirLoading();
    this.seguridad.registrar(this.registrarForm.value)
      .subscribe(resp => {
        let respuesta:any=resp;
        // Navegar al Login
        this.utilitario.agregarMensajeExito(respuesta.mensaje);
        this.abrirLogin();
        this.utilitario.cerrarLoading();
      }, (err) => {
        // Si sucede un error
        this.utilitario.agregarMensajeError(err.error.mensaje);
        this.utilitario.cerrarLoading();
      });


  }


  contrasenasNoValidas() {
    const pass1 = this.registrarForm.get('clave').value;
    const pass2 = this.registrarForm.get('clave2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos() {
    return !this.registrarForm.get('terminos').value && this.formSubmitted;
  }

  clavesIguales(_clave: string, _clave2: string) {
    return (formGroup: FormGroup) => {
      const clave1Control = formGroup.get(_clave);
      const clave2Control = formGroup.get(_clave2);
      if (clave1Control.value === clave2Control.value) {
        clave2Control.setErrors(null)
      } else {
        clave2Control.setErrors({ noEsIgual: true })
      }
    };
  }

}
