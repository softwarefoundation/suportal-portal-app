export class User {

    public id:number;
    public usuarioId: number;
    public username: string;
    public nome: string;
    public sobrenome: string;
    public email: string;
    public senha: string;
    public urlImagemPerfil: string;
    public dataUltimoLogin: Date;
    public dataUltimoLoginDisplay: Date;
    public dataCadastro: Date;
    public roles: string;
    public authorities: [];
    public ativo: boolean;
    public bloqueado: boolean;


    constructor() {
        this.id = 0;
        this.usuarioId = 0;
        this.username = '';
        this.nome = '';
        this.sobrenome = '';
        this.email = '';
        this.senha = '';
        this.urlImagemPerfil = '';
        this.dataUltimoLogin = new Date();
        this.dataUltimoLoginDisplay = new Date();
        this.dataCadastro = new Date();
        this.roles = '';
        this.authorities = [];
        this.ativo = false;
        this.bloqueado = true;
    }


}
