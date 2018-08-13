import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      // claves de api de comunicacion
      apiKey: 'AIzaSyAIUTSP9UVUbKlWErUC9eJoLao2CmRCyr4',
      authDomain: 'comprasapp-a9b62.firebaseapp.com',
      databaseURL: 'https://comprasapp-a9b62.firebaseio.com',
      projectId: 'comprasapp-a9b62',
      storageBucket: 'comprasapp-a9b62.appspot.com',
      messagingSenderId: '312085443138'
    });
  }
}
