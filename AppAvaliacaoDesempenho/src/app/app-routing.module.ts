import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcessoComponent } from './acesso/acesso.component';
import { FormularioAvaliacaoComponent } from './formulario-avaliacao/formulario-avaliacao.component';


const routes: Routes = [
  { path: '', component: AcessoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'avaliacao', component: FormularioAvaliacaoComponent },
  { path: 'avaliacao/:id', component: FormularioAvaliacaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
