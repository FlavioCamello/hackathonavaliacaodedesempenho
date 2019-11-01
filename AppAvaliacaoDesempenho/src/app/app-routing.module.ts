import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcessoComponent } from './acesso/acesso.component';
import { FormularioAvaliacaoComponent } from './formulario-avaliacao/formulario-avaliacao.component';
import { AutenticacaoGuard } from './autenticacao-guard.service';


const routes: Routes = [
  { path: '', component: AcessoComponent },
  { path: 'home', component: HomeComponent, canActivate: [ AutenticacaoGuard ] },
  { path: 'avaliacao', component: FormularioAvaliacaoComponent, canActivate: [ AutenticacaoGuard ]},
  { path: 'avaliacao/:id', component: FormularioAvaliacaoComponent, canActivate: [ AutenticacaoGuard ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// public getContacts(): any{    
//   return this.http.get('contacts')
//  }
//  getContact(contactId){
//   return this.http.get(`${this.API_URL + 'contacts'}/${contactId}`) 
//  }
export class AppRoutingModule { }
