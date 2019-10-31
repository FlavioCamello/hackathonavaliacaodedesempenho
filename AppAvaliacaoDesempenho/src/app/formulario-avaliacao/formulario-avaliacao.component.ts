import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Usuario } from '../shared/usuario.model';
import { Avaliacao } from '../shared/avaliacao.model';
import { BDService } from '../BD.service';

@Component({
  selector: 'app-formulario-avaliacao',
  templateUrl: './formulario-avaliacao.component.html',
  styleUrls: ['./formulario-avaliacao.component.css'],
  providers: [
    DatePipe,
    BDService
  ]
})

export class FormularioAvaliacaoComponent implements OnInit {
  
  public avaliacao: Avaliacao = new Avaliacao()
  public usuarioLogado: Usuario = new Usuario(false) // recuperar usuario logado
  
  public form: FormGroup = new FormGroup({
    'metaCalca': new FormControl(this.avaliacao.MetaVenda.MetaVendaCalca),
    'realCalca': new FormControl(this.avaliacao.MetaVenda.RealVendaCalca),
    'metaCamisa': new FormControl(this.avaliacao.MetaVenda.MetaVendaCamisa),
    'realCamisa': new FormControl(this.avaliacao.MetaVenda.RealVendaCamisa),
    'metaBermuda': new FormControl(this.avaliacao.MetaVenda.MetaVendaBermuda),
    'realBermuda': new FormControl(this.avaliacao.MetaVenda.RealVendaBermuda),
  })

  constructor(private BD: BDService) { }

  ngOnInit() {
    this.usuarioLogado.Nome = "João José Rezende e Costa"

    if(this.avaliacao.ID == undefined || this.avaliacao.ID == 0) {
      this.avaliacao.MetaVenda.DataHistorico = new Date()
      this.avaliacao.DataInicio = new Date()
      this.avaliacao.DataTermino = new Date()
      this.avaliacao.DataTermino.setDate(this.avaliacao.DataInicio.getDate() + 20)
      this.avaliacao.Vendedor = this.usuarioLogado
    }
  }

  public salvarFormulario(): void {
    console.log("entrou em salvarFormulario")
    this.BD.salvarAvaliacao(this.avaliacao)
        .subscribe(
          (idAvaliacao: number) => { 
            console.log(idAvaliacao)
            this.avaliacao.MetaVenda.IDAvaliacao = idAvaliacao
            this.BD.salvarHistorico(this.avaliacao.MetaVenda)
              .subscribe((idHistorico: number) => console.log(idHistorico))
          }
        )
  }

  public recuperarRecente(): void {
    //recuperar metas mais recentes
  }

  public atualizarMoedas(tipo: string): void{
    console.log(tipo)
    if(tipo == "calca" && this.form.controls.metaCalca.value > 0){
      this.avaliacao.MetaVenda.MetaVendaCalca = this.form.controls.metaCalca.value
      this.avaliacao.MetaVenda.RealVendaCalca = this.form.controls.realCalca.value

      this.avaliacao.MetaVenda.MoedasVendaCalca = 
        (this.avaliacao.MetaVenda.RealVendaCalca / this.avaliacao.MetaVenda.MetaVendaCalca) * 100
    }

    if(tipo == "camisa" && this.form.controls.metaCamisa.value > 0){
      this.avaliacao.MetaVenda.MetaVendaCamisa = this.form.controls.metaCamisa.value
      this.avaliacao.MetaVenda.RealVendaCamisa = this.form.controls.realCamisa.value

      this.avaliacao.MetaVenda.MoedasVendaCamisa = 
        (this.avaliacao.MetaVenda.RealVendaCamisa / this.avaliacao.MetaVenda.MetaVendaCamisa) * 100
    }

    if(tipo == "bermuda" && this.form.controls.metaBermuda.value > 0){
      this.avaliacao.MetaVenda.MetaVendaBermuda = this.form.controls.metaBermuda.value
      this.avaliacao.MetaVenda.RealVendaBermuda = this.form.controls.realBermuda.value

      this.avaliacao.MetaVenda.MoedasVendaBermuda = 
        (this.avaliacao.MetaVenda.RealVendaBermuda / this.avaliacao.MetaVenda.MetaVendaBermuda) * 100
    }
  }
}
