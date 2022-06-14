import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_tec = '';

  cliente : Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone:''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(
    private router : Router,
      private service: ClienteService,
      private route: ActivatedRoute ) { }

  ngOnInit(): void {    
    this.id_tec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  update():void{
    this.service.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.messagem('Cliente atualizado com sucesso!!!')
    })
  }

  findById(): void{
    this.service.findById(this.id_tec).subscribe(resposta => {
    this.cliente = resposta;
    })
  }

  cancelar():void{
    this.router.navigate(['clientes']);
  }

  errorValidNome(){
    if(this.nome.invalid){
      return 'O campo Nome deve ter mais que 5 caracteres!'
    }
    return false;
  }

  errorValidCPF(){
    if(this.nome.invalid){
      return 'O campo CPF deve ter mais que 11 e 15 caracteres!'
    }
    return false;
  }

  errorValidTelefone(){
    if(this.nome.invalid){
      return 'O campo Telefone deve ter mais que 11 e 18 caracteres!'
    }
    return false;
  }

}
