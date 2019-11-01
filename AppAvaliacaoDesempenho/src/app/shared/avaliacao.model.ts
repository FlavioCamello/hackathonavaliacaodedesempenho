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
        this.MetaVenda.DataHistorico = new Date()
        this.DataInicio = new Date()
        this.DataTermino = new Date()
        this.DataTermino.setDate(this.DataInicio.getDate() + 20)
    }
}