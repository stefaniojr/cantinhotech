import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service'

@Component({
  selector: 'app-acessorios',
  templateUrl: './acessorios.component.html',
  styleUrls: ['./acessorios.component.css'],
  providers: [ OfertasService ]
})
export class AcessoriosComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertasService.getOfertasPorCategoria('acessorios')
    .then( (ofertas: Oferta[]) => {
      this.ofertas = ofertas
    })
  }

}
