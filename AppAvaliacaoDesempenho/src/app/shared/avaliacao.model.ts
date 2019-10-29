import { Usuario } from './usuario.model'

export class Avaliacao {
    public vendedor: Usuario
    public avaliador: Usuario

    public metaVendas: number
    public realizadoVendas: number
    public pontuacaoVendas: number
    
    public metaClientesPositivados: number
    public realizadoClientesPositivados: number
    public pontuacaoClientesPositivados: number
    
    public metaClientesNovos: number
    public realizadoClientesNovos: number
    public pontuacaoClientesNovos: number

    public pontuacaoTotal: number = this.pontuacaoVendas + this.pontuacaoClientesPositivados + this.pontuacaoClientesNovos
}