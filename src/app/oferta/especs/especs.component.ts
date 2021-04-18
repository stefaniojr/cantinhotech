import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from 'src/app/ofertas.service'

@Component({
  selector: 'app-especs',
  templateUrl: './especs.component.html',
  styleUrls: ['./especs.component.css'],
  providers: [OfertasService]
})
export class EspecsComponent implements OnInit {

  public especs: string = ''

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService) { }

  ngOnInit() {

    this.route.parent.params.subscribe((parametros: Params) => {
      this.ofertasService.getEspecsOfertasPorId(parametros.id)
        .then((descricao: string) => {
          this.especs = descricao
        })

    })


  }
}
