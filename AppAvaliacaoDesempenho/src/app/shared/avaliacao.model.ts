import { Usuario } from './usuario.model'
import { MetaAvaliacao } from './historicoAvaliacao.model'

export class Avaliacao {
    ID: number
    Data: Date
    Vendedor: Usuario
    Avaliador: Usuario

    MetaVenda: MetaAvaliacao

    constructor() {
        this.MetaVenda = new MetaAvaliacao()
        this.Data = new Date()
    }
}