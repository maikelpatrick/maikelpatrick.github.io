import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico : Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone:''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(private router : Router,
    private service: TecnicoService) { }

  ngOnInit(): void {
  }

  cancelar():void{
    this.router.navigate(['tecnicos']);
  }

  create():void{
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.messagem('Técnico criado com sucesso!!!')
    }, err => {
      if(err.error.error.match('já cadastrado')){
        this.service.messagem(err.error.error);
      } else if(err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
        this.service.messagem("CPF INVÁLIDO!");
      }       
    })
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
