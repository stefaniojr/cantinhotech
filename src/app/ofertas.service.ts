import { Oferta } from './shared/oferta.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { URL_API } from './app.api'

import { Observable } from 'rxjs'
import { map, catchError, retry } from 'rxjs/operators'

@Injectable()

export class OfertasService {

    constructor(private http: HttpClient) { }

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta)
    }

    public getOfertasPorId(id: number) : Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta[0]
        })
    }

    public getInfoOfertasPorId(id: number) : Promise<string> {
        return this.http.get(`${URL_API}/info?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta[0].descricao
        })
    }

    public getEspecsOfertasPorId(id: number) : Promise<string> {
        return this.http.get(`${URL_API}/especs?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta[0].descricao
        })
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?titulo_like=${termo}`)
        .pipe (map((resposta: any) => resposta), retry(5))
    }

}