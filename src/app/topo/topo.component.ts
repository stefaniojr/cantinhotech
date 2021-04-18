import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from "../shared/oferta.model"
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, catchError, distinct } from 'rxjs/operators'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa
      .pipe(
        debounceTime(500),
        distinct(), // Evita novas requisições http para uma mesma string.
        switchMap((termo: string) => {
          console.log('Requisição http para API')

          // Lógica para quando apagar o campo e ele exibir todos os valores.
          if (termo.trim() === '') {
            return of<Oferta[]>([])
          }
          return this.ofertasService.pesquisaOfertas(termo);

        }), 
        catchError((erro: any, observable: Observable<Oferta[]>) => {
          console.log(erro)
          return of<Oferta[]>([])
        })
      )
      
  }

  public pesquisa(termoBusca: string): void {
    this.subjectPesquisa.next(termoBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }
}
