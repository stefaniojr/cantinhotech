import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../../ofertas.service'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [OfertasService]
})
export class InfoComponent implements OnInit {

  public info: string = ''

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService) { }

  ngOnInit() {

    this.route.parent.params.subscribe((parametros: Params) => {
      this.ofertasService.getInfoOfertasPorId(parametros.id)
        .then((descricao: string) => {
          this.info = descricao
        })
    })


  }

}
