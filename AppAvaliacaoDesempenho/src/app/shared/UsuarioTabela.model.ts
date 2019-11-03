import { Usuario } from './usuario.model';

export class UsuarioTabela{
    Usuario: Usuario;
    QuantAvaliacoes: number;
    
    getStr(){
        return JSON.stringify(this);
    }
}