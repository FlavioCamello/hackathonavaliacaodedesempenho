import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Autenticacao } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()
  public mensagemErroLogin: string
  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(),
    'senha': new FormControl()
  }) 
  
  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void{
    this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void{
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha).then((valido: boolean) => 
      this.mensagemErroLogin = valido ? "" : "O nome de usuário inserido não pertence a uma conta. Verifique seu nome de usuário e tente novamente." 
      )}
}
