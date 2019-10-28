import { Usuario } from './acesso/usuario.model'
import * as firebase from 'firebase'
export class Autenticacao{
    public cadastrarUsuario(usuario: Usuario): void {
        console.log("chegamos com o usuario: ",usuario)

        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((resposta: any) => {

            // delete usuario.senha

            // firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
            //     .set( usuario )
        })
        .catch((error: Error) => {
            console.log(error)
        })
    }
}