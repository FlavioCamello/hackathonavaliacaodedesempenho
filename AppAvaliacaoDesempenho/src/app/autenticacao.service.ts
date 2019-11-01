import { Usuario } from './acesso/usuario.model'
import * as firebase from 'firebase'
import { Injectable } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router'
@Injectable()
export class Autenticacao{

    constructor(private route:ActivatedRoute,private router:Router){

    }

    public navigateTo(route: string): void {
        this.router.navigate([route])
        }

    public token_id: string

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        console.log("chegamos com o usuario: ",usuario)

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((resposta: any) => {

             delete usuario.senha

             firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                 .set( usuario )
        })
        .catch((error: Error) => {
            console.log(error)
        })
    }

    public autenticar(email: string, senha: string): void{
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => 
            firebase.auth().currentUser.getIdToken()
            .then((idToken: string) => {
                this.token_id = idToken
                localStorage.setItem('idToken', idToken)
                console.log(this.token_id)
                this.router.navigate(['/home'])
            }))
            .catch((error: Error) => console.log(error))
    }

    public autenticado(): boolean{
        if(this.token_id === undefined && localStorage.getItem('idToken') != null){
            this.token_id = localStorage.getItem('idToken')
        }
        return this.token_id !== undefined        
    }
}