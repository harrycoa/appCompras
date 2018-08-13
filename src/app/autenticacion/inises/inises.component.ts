import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.css']
})
export class InisesComponent implements OnInit {

  loginForm: FormGroup;
  userdata: any;
  mensaje = false;
  autenticando: any = false;

  constructor(private formBuilder: FormBuilder,
              private autenticacionService: AutenticacionService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // validando con corchetes, required -- requerido, validacion email
      'email': ['', [Validators.required, Validators.email]],
      // validacion requerida, que contenga letra y almenos un numero con la siguiente expresion regular, minimo 6 caracteres
      'password': ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.autenticando = true ;
    this.userdata = this.saveUserData();
    this.autenticacionService.inicioSesion(this.userdata);
    setTimeout(() => {
      if (this.isAuth() === false) {
        this.mensaje = true;
        this.autenticando = false;
      }
    }, 2000);
    // this.router.navigate(['/inicio']);
  }
  saveUserData() {
    const saveUserData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    return saveUserData;
  }
  isAuth() {
    return this.autenticacionService.isAutenticated();
  }
}
