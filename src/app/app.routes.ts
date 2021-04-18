import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { SmartphonesComponent } from './smartphones/smartphones.component'
import { AcessoriosComponent } from './acessorios/acessorios.component'
import { OfertaComponent } from './oferta/oferta.component'
import { InfoComponent } from './oferta/info/info.component'
import { EspecsComponent } from './oferta/especs/especs.component'
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component'

export const ROUTES: Routes = [
   { path: '', component: HomeComponent }, 
   { path: 'smartphones', component: SmartphonesComponent }, 
   { path: 'acessorios', component: AcessoriosComponent },
   { path: 'oferta', component: OfertaComponent },
   { path: 'oferta/:id', component: OfertaComponent, 
      children: [
         { path: '', component: InfoComponent }, 
         { path: 'info', component: InfoComponent }, 
         { path: 'especs', component: EspecsComponent }
      ]          
},

{ path: 'ordem-compra', component: OrdemCompraComponent }
]