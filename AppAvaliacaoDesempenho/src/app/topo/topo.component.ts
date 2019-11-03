import { Component, OnInit } from '@angular/core';
import { BDService } from '../BD.service';
import { Autenticacao } from '../autenticacao.service';
import { AvaliacoesDAO } from '../shared/AvaliacoesDAO.model';
import { Avaliacao } from '../shared/avaliacao.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  public CounterCoin: number = 0;
  constructor(private BD: BDService, private autenticacao: Autenticacao) {
    
  }

  ngOnInit() {
    new AvaliacoesDAO(this.BD, this.autenticacao).GetDados(this.UpdateDados.bind(this), true);
  }

  UpdateDados(aval: Avaliacao[]){
    if(aval != undefined && aval.length > 0){
this.CounterCoin = parseFloat(aval.map(x => (x.MetaVenda.MoedasVendaBermuda
                        +x.MetaVenda.MoedasVendaCamisa
                        +x.MetaVenda.MoedasVendaCalca))
                        .reduce(function(total, num){
                          return total+num;
                        }).toFixed(2));
    }

  }
  Redirect(url){
  window.location.href = url;
  }

}
