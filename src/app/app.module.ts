import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'
//import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'


import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { HomeComponent } from './home/home.component';
import { SmartphonesComponent } from './smartphones/smartphones.component';
import { AcessoriosComponent } from './acessorios/acessorios.component';
import { OfertaComponent } from './oferta/oferta.component';
import { InfoComponent } from './oferta/info/info.component';
import { EspecsComponent } from './oferta/especs/especs.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { OrdemCompraSucessoComponent } from './ordem-compra-sucesso/ordem-compra-sucesso.component';
import { CarrinhoService }  from './carrinho.service';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
    HomeComponent,
    SmartphonesComponent,
    AcessoriosComponent,
    OfertaComponent,
    InfoComponent,
    EspecsComponent,
    OrdemCompraComponent,
    OrdemCompraSucessoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ CarrinhoService , {provide: LOCALE_ID, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localePt);
