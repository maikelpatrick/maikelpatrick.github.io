import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tecnico } from '../models/tecnico';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack: MatSnackBar) { }
  
  findAll():Observable<Tecnico[]>{
    const url = this.baseUrl + "/tecnicos";
    return this.http.get<Tecnico[]>(url);
  }

  create(tecnico: Tecnico):Observable<Tecnico>{
    const url = this.baseUrl + "/tecnicos";
    return this.http.post<Tecnico>(url,tecnico);
  }

  messagem(msg: String):void {
    this.snack.open(`${msg}`,'OK',{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}
