import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges
} from "@angular/core";
import { Avaliacao } from "../shared/avaliacao.model";
import Chart from "chart.js";
import { UsuarioTabela } from "../shared/UsuarioTabela.model";
import { Autenticacao } from '../autenticacao.service';
import { Usuario } from '../acesso/usuario.model';


@Component({
  selector: "app-conteudo",
  templateUrl: "./conteudo.component.html",
  inputs: ["Avaliacoes"],
  styleUrls: ["./conteudo.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConteudoComponent implements OnChanges {
  @Input() public Avaliacoes: Avaliacao[];
  public Vendedores: UsuarioTabela[];
  public Days: number[];
  public UsuarioLogado: Usuario;

  private ch: Chart;
  private lineCh: Chart;
 
  public day = -1;
  public idPessoa;
  

  constructor(private autenticacao: Autenticacao) {
    this.Vendedores = [];
    this.autenticacao.retornaUsuarioLogado().then((usuario: any) => {
      this.UsuarioLogado = usuario;
    });
   
    var d = new Date();
    this.Days = [];
    for (var i = 1; i <= d.getDate(); i++) {
      this.Days.push(i);
    }
  }

  RedirectCriar(){
    var id = '';
    if(this.Avaliacoes != null){
      var d = new Date();
      var filtro = this.Avaliacoes.filter(x => (
        x.Vendedor.ID == this.UsuarioLogado.email
        && x.Data.getDate() == d.getDate()
        && x.Data.getMonth() == d.getMonth()
        && x.Data.getFullYear() == d.getFullYear()
      ));
      if(filtro != undefined && filtro.length > 0){
        window.location.href = '/avaliacao/'+filtro[0].ID;
      } else{
        window.location.href = '/avaliacao';
      }
    }
  }

  ngOnChanges() {
    if (this.Avaliacoes != undefined && this.Avaliacoes.length > 0) {
    for (var i = 0; i < this.Avaliacoes.length; i++) {
      if (
          this.Vendedores.some(
            x => x.Usuario.ID == this.Avaliacoes[i].Vendedor.ID
        )
      ) {
        this.Vendedores.find(
          x => x.Usuario.ID == this.Avaliacoes[i].Vendedor.ID
        ).QuantAvaliacoes++;
      } else {
        var obj = new UsuarioTabela();
        obj.QuantAvaliacoes = 1;
        obj.Usuario = this.Avaliacoes[i].Vendedor;
        this.Vendedores.push(obj);
      }
    }
   

      this.idPessoa = this.Vendedores[0].Usuario.ID;

      this.MontarGrafico(this.Vendedores[0].Usuario.ID);
      this.AppendRow(this.Vendedores[0].Usuario.ID);
    }
  }

  public onChangePessoa(id) {
    this.idPessoa = id;
    this.MontarGrafico(id);
    this.AppendRow(id);
  }

  public ChangeSelect(day) {
    this.day = day;
    this.MontarGrafico(this.idPessoa);
  }
  public GetDate(data){
       return (
          (data.getDate() < 9 ? "0"+data.getDate() : data.getDate()) +
          "-" +
          ("0" + (data.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + data.getFullYear()).slice(-2)
        );
  }
  public GetHtmlRowVendas(vendas): string{
    return vendas
        .map(
          x => `
      <tr class="row-venda" >
        <td style="text-align: right;">${x.Vendedor.Nome}</td>
        <td style="text-align: center;">${this.GetDate(x.Data)}</td>
        <td style="text-align: center;">${x.MetaVenda.MetaVendaBermuda +
          x.MetaVenda.MetaVendaCalca +
          x.MetaVenda.MetaVendaCamisa}</td>
        <td style="text-align: center;">${x.MetaVenda.RealVendaBermuda +
          x.MetaVenda.RealVendaCalca +
          x.MetaVenda.RealVendaCamisa}</td>
        <td style="text-align: center;">
              <label class="container-check">
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
				</td>
          <td style="text-align: right;">
            <a href="/avaliacao/${x.ID || x.id}" class="btn btn-secondary">
            <i class="fas fa-pen edit-aval"></i>
              Editar
            </a>  
          </td>
      </tr>
    `
        )
        .join(" ")
  }

  public AppendRow(id) {
    let vendas = this.Avaliacoes.filter(x => x.Vendedor.ID == id);
    if (vendas != undefined && vendas.length > 0) {
      vendas = vendas.sort(function(a, b) {
        return b.Data.getTime() - a.Data.getTime();
      });

      let html = this.GetHtmlRowVendas(vendas);
      var objs = document.getElementsByClassName("row-venda");
      if (objs != undefined && objs.length > 0) {
        while (objs.length > 0) {
          objs[0].remove();
        }
      }

      var linhaPai = document.getElementById("user-" + id);
      if (linhaPai != null && linhaPai != undefined) {
        linhaPai.insertAdjacentHTML("afterend", html);
        var oldDark = document.getElementsByClassName("dark")[0];
        if (oldDark != undefined) {
          oldDark.className = oldDark.className.replace("dark", "");
        }
        linhaPai.className = "dark";
      }
    }
  }

  public MontarGrafico(id) {
    var d = new Date();
    // var elem = document.getElementById("cbo-dia");
    // var day = elem.options[elem.selectedIndex].value;

    let Mensal = this.Avaliacoes.filter(
      x =>
        x.Vendedor.ID == id &&
        x.Data.getFullYear() == d.getFullYear() &&
        x.Data.getMonth() == d.getMonth()
    );
    let dsMeta = [0, 0, 0];
    let dsReal = [0, 0, 0];

    let dsMensalCamisa = [];
    let dsMensalCalca = [];
    let dsMensalBermuda = [];
    let dsTotalMensal = [];
    let dsDias = [];

    if (Mensal != undefined) {
      var now = new Date().getDate();
      for(var i = 1; i <= now; i++){
        var obj = Mensal.find(x => x.Data.getDate() == i);
        if( obj != undefined){
          dsDias.push(i);
          dsMensalBermuda.push(obj.MetaVenda.RealVendaBermuda);
          dsMensalCalca.push(obj.MetaVenda.RealVendaCalca);
          dsMensalCamisa.push(obj.MetaVenda.RealVendaCamisa);

          dsTotalMensal.push(obj.MetaVenda.RealVendaBermuda+obj.MetaVenda.RealVendaCalca+obj.MetaVenda.RealVendaCamisa);
        }
      }

      let Aval = Mensal.filter(x =>
        this.day == -1 ? true : x.Data.getDate() == this.day
      );

      if (Aval != undefined) {
        for (var i = 0; i < Aval.length; i++) {
          dsMeta[0] += Aval[i].MetaVenda.MetaVendaCamisa;
          dsMeta[1] += Aval[i].MetaVenda.MetaVendaCalca;
          dsMeta[2] += Aval[i].MetaVenda.MetaVendaBermuda;

          dsReal[0] += Aval[i].MetaVenda.RealVendaCamisa;
          dsReal[1] += Aval[i].MetaVenda.RealVendaCalca;
          dsReal[2] += Aval[i].MetaVenda.RealVendaBermuda;
        }
      }
    }
    var data = {
      labels: ["Camisa", "Calça", "Bermuda"],
      datasets: [
        {
          label: "Meta de vendas",
          data: dsMeta,
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)"
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(54, 162, 235, 1)"
          ],
          borderWidth: 1
        },
        {
          label: "Vendas reais",
          data: dsReal,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 99, 132, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 99, 132, 1)"
          ],
          borderWidth: 1
        }
      ]
    };


    
    var ctx = (<HTMLCanvasElement>(
      document.getElementById("chart-vendedor")
    )).getContext("2d");
    if (this.ch == undefined || this.ch == null) {
      this.ch = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false
                }
              }
            ]
          }
        }
      });
    } else {
      this.ch.data = data;
      this.ch.update();
    }
    var dataLine = {
      labels: dsDias,
      datasets: [
        {
          data: dsMensalCamisa,
          label: "Camisas",
          borderColor: "#000dc2",
          fill: false
        },
        {
          data: dsMensalCalca,
          label: "Calças",
          borderColor: "#cc3600",
          fill: false
        },
        {
          data: dsMensalBermuda,
          label: "Bermudas",
          borderColor: "#02ba1a",
          fill: false
        },
        {
          data: dsTotalMensal,
          label: "Total",
          borderColor: "black",
          fill: false
        }
      ]
    };

    if(this.lineCh == undefined || this.lineCh == null){
      this.lineCh = new Chart(document.getElementById("line-chart"), {
        type: "line",
        data: dataLine,
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Venda total mensal"
          }
        }
      });
    } else{
      this.lineCh.data = dataLine;
      this.lineCh.update();
    }
  }
}
