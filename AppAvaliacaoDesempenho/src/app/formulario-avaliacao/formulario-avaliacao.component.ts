import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Usuario } from '../shared/usuario.model';
import { Avaliacao } from '../shared/avaliacao.model';
import { BDService } from '../BD.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Autenticacao } from '../autenticacao.service';

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
  
  public formReady: boolean = false
  public route: ActivatedRoute
  public avaliacao: Avaliacao = new Avaliacao()
  public usuarioLogado: Usuario = new Usuario(false)
  public totalMoedas: number
  
  public form: FormGroup = new FormGroup({
    'metaCalca': new FormControl(this.avaliacao.MetaVenda.MetaVendaCalca),
    'metaCamisa': new FormControl(this.avaliacao.MetaVenda.MetaVendaCamisa),
    'metaBermuda': new FormControl(this.avaliacao.MetaVenda.MetaVendaBermuda),
    'realCalca': new FormControl(this.avaliacao.MetaVenda.RealVendaCalca),
    'realCamisa': new FormControl(this.avaliacao.MetaVenda.RealVendaCamisa),
    'realBermuda': new FormControl(this.avaliacao.MetaVenda.RealVendaBermuda)
  })

  constructor(
    private BD: BDService,
    route: ActivatedRoute,
    private toast: ToastrService,
    private autenticacao: Autenticacao
  ) { 
    this.route = route 
  }

  async ngOnInit() {

    await this.autenticacao.retornaUsuarioLogado()
      .then((usuario: any) => {
        this.usuarioLogado.Nome = usuario.nome_completo
        this.usuarioLogado.Email = usuario.email
        this.usuarioLogado.ID = usuario.email
      })

    this.avaliacao.ID = this.route.snapshot.params["id"] 

    if(this.avaliacao.ID == undefined || this.avaliacao.ID == 0) {
      this.formReady = true
      this.avaliacao.Vendedor = this.usuarioLogado
    } else {
        this.BD.recuperarAvaliacao(this.avaliacao.ID)
        .subscribe((resposta: Avaliacao) => {
          this.avaliacao = resposta
          this.avaliacao.ID = this.route.snapshot.params["id"]
          this.formReady = true
          this.form.controls.metaCalca.setValue(this.avaliacao.MetaVenda.MetaVendaCalca)
          this.form.controls.metaCamisa.setValue(this.avaliacao.MetaVenda.MetaVendaCamisa)
          this.form.controls.metaBermuda.setValue(this.avaliacao.MetaVenda.MetaVendaBermuda)
          this.form.controls.realCalca.setValue(this.avaliacao.MetaVenda.RealVendaCalca)
          this.form.controls.realCamisa.setValue(this.avaliacao.MetaVenda.RealVendaCamisa)
          this.form.controls.realBermuda.setValue(this.avaliacao.MetaVenda.RealVendaBermuda)
        },
        (error: any) => console.log(error))
        
    }
  }

  public showSuccess(mensagem: string) {
  }

  public showError(mensagem: string){    
    this.toast.error(mensagem)
  }

  public salvarFormulario(): void {

    if(this.avaliacao.ID == undefined || this.avaliacao.ID == 0){
      this.BD.criarAvaliacao(this.avaliacao)
        .subscribe(
          (idAvaliacao: number) => {
            this.avaliacao.ID = idAvaliacao
            this.toast.success("Avaliação salva com sucesso")
          },
          (err: any) => {
            this.toast.error(err) 
          }
        )
        
    } else {
      this.BD.editarAvaliacao(this.avaliacao)
        .subscribe(() => this.toast.success("Avaliação salva com sucesso"),
          (err: any) => {
            this.toast.error(err) 
          }
        )
    }
  }

  public atualizarMoedas(tipo: string): void{
    let metacalca: number = this.form.controls.metaCalca.value
    let realCalca: number = this.form.controls.realCalca.value

    let metaCamisa: number = this.form.controls.metaCamisa.value
    let realCamisa: number = this.form.controls.realCamisa.value

    let metaBermuda: number = this.form.controls.metaBermuda.value
    let realBermuda: number = this.form.controls.realBermuda.value

    let moedasCalca: number
    let moedasCamisa: number
    let moedasBermuda: number

    if(tipo == "calca" && metacalca > 0) {
      moedasCalca = (realCalca / metacalca) //* 100  
      this.avaliacao.MetaVenda.MoedasVendaCalca = moedasCalca      
    }

    if(tipo == "camisa" && metaCamisa > 0){
      moedasCamisa = (realCamisa / metaCamisa) //* 100
      this.avaliacao.MetaVenda.MoedasVendaCamisa = moedasCamisa
    }

    if(tipo == "bermuda" && metaBermuda > 0){
      moedasBermuda = (realBermuda / metaBermuda) //* 100
      this.avaliacao.MetaVenda.MoedasVendaBermuda = moedasBermuda
    }

    this.avaliacao.MetaVenda.MetaVendaCalca = metacalca
    this.avaliacao.MetaVenda.RealVendaCalca = realCalca
    this.avaliacao.MetaVenda.MetaVendaCamisa = metaCamisa
    this.avaliacao.MetaVenda.RealVendaCamisa = realCamisa
    this.avaliacao.MetaVenda.MetaVendaBermuda = metaBermuda
    this.avaliacao.MetaVenda.RealVendaBermuda = realBermuda
    this.avaliacao.MetaVenda.TotalMoedas =  moedasCalca + moedasCamisa + moedasBermuda
  }
}
