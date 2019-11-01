import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Usuario } from '../shared/usuario.model';
import { Avaliacao } from '../shared/avaliacao.model';
import { BDService } from '../BD.service';
import { ActivatedRoute } from '@angular/router';

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
  public usuarioLogado: Usuario = new Usuario(false) // RECUPERAR USUARIO LOGADO
  public totalMoedas: number
  
  public form: FormGroup = new FormGroup({
    'metaCalca': new FormControl(this.avaliacao.MetaVenda.MetaVendaCalca),
    'realCalca': new FormControl(this.avaliacao.MetaVenda.RealVendaCalca),
    'metaCamisa': new FormControl(this.avaliacao.MetaVenda.MetaVendaCamisa),
    'realCamisa': new FormControl(this.avaliacao.MetaVenda.RealVendaCamisa),
    'metaBermuda': new FormControl(this.avaliacao.MetaVenda.MetaVendaBermuda),
    'realBermuda': new FormControl(this.avaliacao.MetaVenda.RealVendaBermuda),
  })

  constructor(
    private BD: BDService,
    route: ActivatedRoute
  ) { 
    this.route = route 
  }

  ngOnInit() {
    
    this.avaliacao.ID = this.route.snapshot.params["id"]
    this.usuarioLogado.Nome = "João José Rezende e Costa" 

    if(this.avaliacao.ID == undefined || this.avaliacao.ID == 0) {
      this.formReady = true
      this.avaliacao.Vendedor = this.usuarioLogado
    } else {
        this.BD.recuperarAvaliacao(this.avaliacao.ID)
        .subscribe((resposta: Avaliacao) => {
          this.avaliacao = resposta
          this.formReady = true
          this.form = new FormGroup({
            'metaCalca': new FormControl(this.avaliacao.MetaVenda.MetaVendaCalca),
            'realCalca': new FormControl(this.avaliacao.MetaVenda.RealVendaCalca),
            'metaCamisa': new FormControl(this.avaliacao.MetaVenda.MetaVendaCamisa),
            'realCamisa': new FormControl(this.avaliacao.MetaVenda.RealVendaCamisa),
            'metaBermuda': new FormControl(this.avaliacao.MetaVenda.MetaVendaBermuda),
            'realBermuda': new FormControl(this.avaliacao.MetaVenda.RealVendaBermuda),
          })
        },
        (error: any) => console.log(error))
        
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

  public atualizarMoedas(tipo: string): void{
    console.log(tipo)
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
      moedasCalca = (realCalca / metacalca) * 100  
      this.avaliacao.MetaVenda.MoedasVendaCalca = moedasCalca      
    }

    if(tipo == "camisa" && metaCamisa > 0){
      moedasCamisa = (realCamisa / metaCamisa) * 100
      this.avaliacao.MetaVenda.MoedasVendaCamisa = moedasCamisa
    }

    if(tipo == "bermuda" && metaBermuda > 0){
      moedasBermuda = (realBermuda / metaBermuda) * 100
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
