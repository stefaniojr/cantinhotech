import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model'


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[] = []

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })




  /*public pedido: Pedido = new Pedido('', '', '', '')

  public endereco: string = ''
  public numero: string = ''
  public complemento: string = ''
  public formaPagamento: string = ''

  // Variáveis controladoras de validação

  public enderecoValido: boolean
  public numeroValido: boolean
  public complementoValido: boolean
  public formaPagamentoValida: boolean

  // Controlando estados primitivos

  public enderecoEstadoPrimitivo: boolean = true
  public numeroEstadoPrimitivo: boolean = true
  public complementoEstadoPrimitivo: boolean = true
  public formaPagamentoEstadoPrimitivo: boolean = true

  // Controlando botão confirmar

  public formEstado: string = 'disabled'*/

  constructor(private ordemCompraService: OrdemCompraService, public carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.exibirItens()
  }

  /*public atualizaEndereco(endereco: string): void {
    this.endereco = endereco
    console.log(this.endereco)

    this.enderecoEstadoPrimitivo = false

    if (this.endereco.length > 3 ) {
      this.enderecoValido = true
    } else {
      this.enderecoValido = false
    }

    this.habilitaForm()
  }

  public atualizaNumero(numero: string): void {
    this.numero = numero
    console.log(this.numero)

    this.numeroEstadoPrimitivo = false

    if (this.numero.length > 0 ) {
      this.numeroValido = true
    } else {
      this.numeroValido = false
    }

    this.habilitaForm()
  }

  public atualizaComplemento(complemento: string): void {
    this.complemento = complemento
    console.log(this.complemento)

    this.complementoEstadoPrimitivo = false

    if (this.complemento.length === 0){
      this.complementoEstadoPrimitivo = true
    }

    if (this.complemento.length > 0 ) {
      this.complementoValido = true
    }

    this.habilitaForm()
  }

  public atualizaFormaPagamento(formaPagamento: string): void {
    this.formaPagamento = formaPagamento
    console.log(this.formaPagamento)

    
    this.formaPagamentoEstadoPrimitivo = false

    if (this.formaPagamento.length > 0 ) {
      this.formaPagamentoValida = true
    } else {
      this.formaPagamentoValida = false
    }

    this.habilitaForm()
  }

  public habilitaForm(): void{

    if (this.enderecoValido === true && this.numeroValido === true && this.formaPagamentoValida === true){
      this.formEstado = ''
    } else {
      this.formEstado = 'disabled'
    }
  }

  public confirmarCompra(): void{


    this.pedido.endereco = this.endereco
    this.pedido.numero = this.numero
    this.pedido.complemento = this.complemento
    this.pedido.formaPagamento = this.formaPagamento
    
    this.ordemCompraService.efetivarCompra(this.pedido)
    .subscribe((idPedido: number) => {
      this.idPedidoCompra = idPedido
    })
  }*/

  /*
  Segunda implementação, utilizando Template Forms
  
  @ViewChild('formulario', {static: false}) public formulario: NgForm
  // ViewChild é apenas opcional. Você pode removê-lo mandando "formulario" direto como parâmetro na função.
  public confirmarCompra(): void{
    let pedido: Pedido = new Pedido(this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento)

    this.ordemCompraService.efetivarCompra(pedido)
    .subscribe((idPedido:number) => {
      this.idPedidoCompra = idPedido
    })
  }*/

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID') {
      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
    } else {
      
      if (this.carrinhoService.exibirItens().length === 0) {
        alert('Seu carrinho está vazio!')
        
      } else {
        let pedido: Pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento,
          this.carrinhoService.exibirItens()
        )

        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedido: number) => {
            this.idPedidoCompra = idPedido
            this.carrinhoService.limparCarrinho()
          })
      }
    }
  }

  public menosUm(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item)
  }

  public maisUm(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item)

  }

}
