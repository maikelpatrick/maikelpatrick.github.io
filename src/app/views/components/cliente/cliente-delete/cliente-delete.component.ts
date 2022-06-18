import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

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

  delete():void{   
    this.service.delete(this.id_tec).subscribe(resposta =>{
      this.router.navigate(['tecnicos'])
      this.service.messagem('Cliente deletado com sucesso')
    }, err => {
      if(err.error.error.match('possui')){
        this.service.messagem(err.error.error);
      }
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


}