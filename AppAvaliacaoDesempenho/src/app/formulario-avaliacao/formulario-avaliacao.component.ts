import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-formulario-avaliacao',
  templateUrl: './formulario-avaliacao.component.html',
  styleUrls: ['./formulario-avaliacao.component.css']
})
export class FormularioAvaliacaoComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    'departamento': new FormControl(null),
    'vendedor': new FormControl(null),
    'metaVendas': new FormControl(null),
    'realizadoVendas': new FormControl(null),
    'pontuacaoVendas': new FormControl(null),
    'metaClientesPositivados': new FormControl(null),
    'realizadoClientesPositivados': new FormControl(null),
    'pontuacaoClientesPositivados': new FormControl(null),
    'metaClientesNovos': new FormControl(null),
    'realizadoClientesNovos': new FormControl(null),
    'pontuacaoClientesNovos': new FormControl(null),
  })

  constructor() { }

  ngOnInit() {
  }

  public salvarFormulario(): void{

  }
}
