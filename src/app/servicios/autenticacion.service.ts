import { Injectable } from '@angular/core';
// importando todo de firebase
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AutenticacionService {

  constructor(private router: Router,
              private activatedRouter: ActivatedRoute) { }

  registroUsuario (userdata) {
    firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password)
      .catch( error => {
        console.log(error);
      });
  }
  inicioSesion(userdata) {
    firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password)
      .then( response => {
        console.log(response);
        this.router.navigate(['/inicio']);
      })
      .catch(error => {
        console.log(error);
      });
  }
  isAutenticated() {
    const user = firebase.auth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  // cerrar sesion
  logout () {
    firebase.auth().signOut();
  }
}
