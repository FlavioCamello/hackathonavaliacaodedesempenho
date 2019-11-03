import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { Autenticacao } from './autenticacao.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { FormularioAvaliacaoComponent } from './formulario-avaliacao/formulario-avaliacao.component';
import { HomeComponent } from './home/home.component';
import { AutenticacaoGuard } from './autenticacao-guard.service';
import { TopoComponent } from './topo/topo.component';
import { ConteudoComponent } from './conteudo/conteudo.component';
import { ProdutosComponent } from './produtos/produtos.component';


@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    FormularioAvaliacaoComponent,
    HomeComponent,
    TopoComponent,
    ConteudoComponent,
    ProdutosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()    
  ],
  providers: [ Autenticacao, AutenticacaoGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
