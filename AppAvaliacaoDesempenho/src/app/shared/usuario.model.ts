export class Usuario {
    public ID: string
    public Nome: string
    public Email: String
    public Login: string
    public Senha: string
    public Perfil: string

    public Avaliador: boolean

    constructor(avaliador: boolean) {
        this.Avaliador = avaliador
    }
}