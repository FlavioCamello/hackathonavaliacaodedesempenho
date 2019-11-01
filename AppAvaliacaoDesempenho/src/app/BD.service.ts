import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Avaliacao } from './shared/avaliacao.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { URL_API } from './app.api';

@Injectable()
export class BDService {

    constructor(private http: HttpClient){}
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

    public criarAvaliacao(formulario: Avaliacao): Observable<number> {
        return this.http.post<number>(`${URL_API}/avaliacoes`
            ,JSON.stringify(formulario),
            this.httpOptions
            )
            .pipe(
                map((resposta: any) => resposta.id),
                catchError(this.handleError)
        )
    }

    public editarAvaliacao(formulario: Avaliacao): Observable<number> {
        return this.http.put<number>(`${URL_API}/avaliacoes/${formulario.ID}`
            ,JSON.stringify(formulario),
            this.httpOptions
            )
            .pipe(
                map((resposta: any) => resposta.id),
                catchError(this.handleError)
        )
    }

    public recuperarAvaliacao(id: Number): Observable<Avaliacao> {
        return this.http.get<Avaliacao[]>(`${URL_API}/avaliacoes?id=${id}`)
            .pipe(
                map(
                    (resposta: Avaliacao[]) => resposta[0]
                )
            )
    }
    
    public recuperarArrayAvaliacao(): Observable<Avaliacao[]> {
        return this.http.get<Avaliacao[]>(`${URL_API}/avaliacoes`)
            .pipe(
                map((resposta: Avaliacao[]) => resposta)
            )
    }


    
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Não foi possível completar a operação:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Não foi possível completar a operação.');
  };  
}