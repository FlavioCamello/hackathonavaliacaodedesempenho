import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Avaliacao } from './shared/avaliacao.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_API } from './app.api';
import { HistoricoAvaliacao } from './shared/historicoAvaliacao.model';

@Injectable()
export class BDService {

    constructor(private http: HttpClient){}

    public salvarAvaliacao(formulario: Avaliacao): Observable<number> {
        console.log("entrou em salvarAvaliacao")
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
          })
          let options = {
            headers,
        }
        
        return this.http.post<number>(`${URL_API}/avaliacoes`
            ,JSON.stringify(formulario),
            options
            )
            .pipe(
                map((resposta: any) => resposta.id)
        )
    }

    public salvarHistorico(historico: HistoricoAvaliacao): Observable<number> {
        console.log("entrou em salvarHistorico")
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
          })
          let options = {
            headers,
        }
        
        return this.http.post<number>(`${URL_API}/historicoAvaliacoes`
            ,JSON.stringify(historico),
            options
            )
            .pipe(
                map((resposta: any) => resposta.id)
        )
    }

}