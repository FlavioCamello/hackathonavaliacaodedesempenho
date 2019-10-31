import { Usuario } from './usuario.model'
import { HistoricoAvaliacao } from './historicoAvaliacao.model'

export class Avaliacao {
    ID: number
    DataInicio: Date
    DataTermino: Date
    Vendedor: Usuario
    Avaliador: Usuario

    MetaVenda: HistoricoAvaliacao

    constructor() {
        this.MetaVenda = new HistoricoAvaliacao()
        this.Vendedor = new Usuario(false)
        this.Avaliador = new Usuario(true)
    }
}