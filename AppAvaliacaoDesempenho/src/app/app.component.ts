import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyAloiOFTgRphOzL6FwnUGf7vTYC03LnPLE",
      authDomain: "jta-avaliacaodesempenho.firebaseapp.com",
      databaseURL: "https://jta-avaliacaodesempenho.firebaseio.com",
      projectId: "jta-avaliacaodesempenho",
      storageBucket: "jta-avaliacaodesempenho.appspot.com",
      messagingSenderId: "65283323997",
      appId: "1:65283323997:web:e06914d0f79c248fb0b5b4",
      measurementId: "G-SCMLDCMNPH"
    };

    firebase.initializeApp(firebaseConfig)
  }
  title = 'avaliacaodesempenho';



}

