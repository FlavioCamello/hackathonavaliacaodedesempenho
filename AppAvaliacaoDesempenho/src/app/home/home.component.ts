import { Component, OnInit } from '@angular/core';
import { Avaliacao } from '../shared/avaliacao.model';
import { Usuario } from '../shared/usuario.model';
import { MetaAvaliacao } from '../shared/historicoAvaliacao.model';
import { BDService } from '../BD.service';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[
    BDService
  ]
})
export class HomeComponent implements OnInit {
  
  public Avaliacoes: Avaliacao[] = this.RecuperarDados();
 
  constructor(private BD: BDService) {
    
  }

  ngOnInit() {
    this.Avaliacoes = [];
    let aux = [];
    let dataAtual = new Date();
    
    this.BD.recuperarArrayAvaliacao().subscribe((resposta: Avaliacao[]) => {
      for(var i = 0; i < resposta.length; i++){
        let obj = resposta[i];
        obj.Data = new Date(obj.Data);
        aux.push(resposta[i]);
      }
      
      aux = aux.filter(x => x.Data.getFullYear() == dataAtual.getFullYear() && x.Data.getMonth() == dataAtual.getMonth());
      aux = [...aux, ...this.RecuperarDados()];

      // aux = aux.filter(x => x.Vendedor.ID == 2);
      
      aux = aux.sort(function(a, b){
        if(a.Vendedor.Nome < b.Vendedor.Nome) { return -1; }
        if(a.Vendedor.Nome > b.Vendedor.Nome) { return 1; }
        return 0;
      });
      
      this.Avaliacoes = aux;
   });
  }

  public RecuperarDados(): Avaliacao[]{

    //Colocar aqui lógica de recuperação de dados salvos feito pelo João
    let idAvaliacao = 6;
    let IdUser = 2;

    var retorno: Avaliacao[] = [];

    var User1 = new Usuario(false);
    User1.ID = (IdUser++)+"";
    User1.Nome = "Edward Elric";
    User1.Perfil = "Vendedor";
    User1.Avaliador = false;
    User1.Email = "Edward.Elric@gmail.com";

    var User2 = new Usuario(true);
    User2.ID = (IdUser++)+"";
    User2.Nome = "Alphonse Elric";
    User2.Perfil = "Avaliador";
    User2.Avaliador = true;
    User2.Email = "Alphonse.Elric@gmail.com";

    var Av1 = new Avaliacao();
    Av1.ID = idAvaliacao++;
    Av1.Data = new Date();
    Av1.Vendedor = User1;
    Av1.Avaliador = User2;

    
    var Meta = new MetaAvaliacao();
    // Meta.IDAvaliacao = Av1.ID;
    // Meta.DataHistorico = new Date(2018, 10, 28, 0, 0, 0, 0);

    Meta.MetaVendaBermuda = this.getRandom(0,15);
    Meta.MetaVendaCalca = this.getRandom(0,15);
    Meta.MetaVendaCamisa = this.getRandom(0,15);
    Meta.RealVendaBermuda = this.getRandom(0,15);
    Meta.RealVendaCalca = this.getRandom(0,15);
    Meta.RealVendaCamisa = this.getRandom(0,15);
    Av1.MetaVenda = Meta;

    //Av2
    var User3 = new Usuario(false);
    User3.ID = (IdUser++)+"";
    User3.Nome = "Sasuke Uchiha";
    User3.Perfil = "Vendedor";
    User3.Avaliador = false;
    User3.Email = "Edward.Uchiha@gmail.com";

    var User4 = new Usuario(true);
    User4.ID = (IdUser++)+"";
    User4.Nome = "Naruto Uzumaki";
    User4.Perfil = "Avaliador";
    User4.Avaliador = true;
    User4.Email = "Naruto.Uzumaki@gmail.com";

    var Av2 = new Avaliacao();
    Av2.ID = idAvaliacao++;
    Av2.Data = new Date();
   
    Av2.Vendedor = User3;
    Av2.Avaliador = User4;

    
    var Meta2 = new MetaAvaliacao();
    // Meta2.IDAvaliacao = Av2.ID;
    // Meta2.DataHistorico = new Date(2018, 10, 28, 0, 0, 0, 0);

    Meta2.MetaVendaBermuda = this.getRandom(0,15);
    Meta2.MetaVendaCalca = this.getRandom(0,15);
    Meta2.MetaVendaCamisa = this.getRandom(0,15);
    Meta2.RealVendaBermuda = this.getRandom(0,15);
    Meta2.RealVendaCalca = this.getRandom(0,15);
    Meta2.RealVendaCamisa = this.getRandom(0,15);
    Av2.MetaVenda = Meta2;

    //Av3
    var User5 = new Usuario(false);
    User5.ID = (IdUser++)+"";
    User5.Nome = "Okabe Rintarou";
    User5.Perfil = "Vendedor";
    User5.Avaliador = false;
    User5.Email = "Okabe.Rintarou@gmail.com";

    var User6 = new Usuario(true);
    User6.ID = (IdUser++)+"";
    User6.Nome = "Makise Kurisu";
    User6.Perfil = "Avaliador";
    User6.Avaliador = true;
    User6.Email = "Makise.Kurisu@gmail.com";

    var Av3 = new Avaliacao();
    Av3.ID = idAvaliacao++;
    Av3.Data = new Date();
    
    Av3.Vendedor = User5;
    Av3.Avaliador = User6;

    
    var Meta3 = new MetaAvaliacao();
    // Meta3.IDAvaliacao = Av3.ID;
    // Meta3.DataHistorico = new Date(2018, 10, 28, 0, 0, 0, 0);

    Meta3.MetaVendaBermuda = this.getRandom(0,15);
    Meta3.MetaVendaCalca = this.getRandom(0,15);
    Meta3.MetaVendaCamisa = this.getRandom(0,15);
    Meta3.RealVendaBermuda = this.getRandom(0,15);
    Meta3.RealVendaCalca = this.getRandom(0,15);
    Meta3.RealVendaCamisa = this.getRandom(0,15);
    Av3.MetaVenda = Meta3;

    //Av4
    var User7 = new Usuario(false);
    User7.ID = (IdUser++)+"";
    User7.Nome = "Heisenberg";
    User7.Perfil = "Vendedor";
    User7.Avaliador = false;
    User7.Email = "Heisenberg@gmail.com";

    var User8 = new Usuario(true);
    User8.ID = (IdUser++)+"";
    User8.Nome = "Jesse Pinkman";
    User8.Perfil = "Avaliador";
    User8.Avaliador = true;
    User8.Email = "Jesse.Pinkman@gmail.com";

    var Av4 = new Avaliacao();
    Av4.ID = idAvaliacao++;
    Av4.Data = new Date();
   
    Av4.Vendedor = User7;
    Av4.Avaliador = User8;

    
    var Meta4 = new MetaAvaliacao();
    
    Meta4.MetaVendaBermuda = this.getRandom(0,15);
    Meta4.MetaVendaCalca = this.getRandom(0,15);
    Meta4.MetaVendaCamisa = this.getRandom(0,15);
    Meta4.RealVendaBermuda = this.getRandom(0,15);
    Meta4.RealVendaCalca = this.getRandom(0,15);
    Meta4.RealVendaCamisa = this.getRandom(0,15);
    Av4.MetaVenda = Meta4;

    retorno.push(Av1);
    retorno.push(Av2);
    retorno.push(Av3);
    retorno.push(Av4);

    return retorno;
  }

  private getRandom(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

}





// import { Component, OnInit} from '@angular/core';
// import { Autenticacao } from '../autenticacao.service';
// import { Observable } from 'rxjs';
// import * as firebase from 'firebase';
// import { Usuario } from '../acesso/usuario.model';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {

//   constructor(private autenticacao: Autenticacao) { }
//   public email: string
//   public recuperarUsuario: Observable<Usuario>
//   public usuarioLogado: Usuario = new Usuario("","","","")
//   ngOnInit() {

//     this.autenticacao.retornaUsuarioLogado().then((usuario: any) => console.log("retornei para subscribe", usuario))
//     // this.autenticacao.retornaUsuarioLogado().subscribe((retorno: any) => console.log("retornei para subscribe"))
//     // // firebase.auth().onAuthStateChanged((user) => { 
//     // //   console.log("usuario1",user.email)      
//     // // })
//     // this.recuperarUsuario.subscribe((retorno: Usuario) =>
//     // console.log("retorno", retorno.email)
//     // //this.email = retorno.email
  

//   //this.email = this.autenticacao.retornaNomeUsuarioLogado()
  
//     //console.log("Retorna Nome",this.email)

    
//     //this.email = localStorage.getItem('email')
//    // this.autenticacao.recuperaUsuario
//     //console.log("email recuperado do storage ",this.email)
//     //this.verificaEmail.subscribe(localStorage.getItem('email'))
//   }


// }
