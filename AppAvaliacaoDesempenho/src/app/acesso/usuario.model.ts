export class Usuario{
    constructor(
        public email: string,
        public nome_completo: string,
        public nome_usuario: string,
        public senha: string
    )
    {}
}

export class UsuarioLogado{
    public static usuarioLogado: Usuario   
    constructor(
        public email: string,
        public nome_completo: string,
        public nome_usuario: string,
        )
    {}

    // public static recuperaUsuarioLogado(): Usuario{
    //     //return this.UsuarioLogado;
    // }
}
