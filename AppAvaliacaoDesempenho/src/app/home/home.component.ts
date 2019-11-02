import { Component, OnInit} from '@angular/core';
import { Autenticacao } from '../autenticacao.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Usuario } from '../acesso/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private autenticacao: Autenticacao) { }
  public email: string
  public recuperarUsuario: Observable<Usuario>
  public usuarioLogado: Usuario = new Usuario("","","","")
  ngOnInit() {

    this.autenticacao.retornaUsuarioLogado().then((usuario: any) => console.log("retornei para subscribe", usuario))
    // this.autenticacao.retornaUsuarioLogado().subscribe((retorno: any) => console.log("retornei para subscribe"))
    // // firebase.auth().onAuthStateChanged((user) => { 
    // //   console.log("usuario1",user.email)      
    // // })
    // this.recuperarUsuario.subscribe((retorno: Usuario) =>
    // console.log("retorno", retorno.email)
    // //this.email = retorno.email
  

  //this.email = this.autenticacao.retornaNomeUsuarioLogado()
  
    //console.log("Retorna Nome",this.email)

    
    //this.email = localStorage.getItem('email')
   // this.autenticacao.recuperaUsuario
    //console.log("email recuperado do storage ",this.email)
    //this.verificaEmail.subscribe(localStorage.getItem('email'))
  }


}
