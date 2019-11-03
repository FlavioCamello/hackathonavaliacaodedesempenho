import { Component, OnInit } from '@angular/core';
import { BDService } from '../BD.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  providers:[
    BDService
  ]
})
export class ProdutosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public comprar(produto: string): void{
    console.log("comprou ", produto)
  }

}
