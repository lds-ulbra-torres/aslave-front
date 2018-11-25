import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../models/estado';
import { Cidade } from '../models/cidade';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  getEstado(){
    return this.http.get<Estado[]>('assets/dados/Estados.json');
  }

  getCidade(id: number){
    return this.http.get<Cidade[]>('assets/dados/Cidades.json')
    .pipe(
      map((cidades: Cidade[]) =>cidades.filter(c => c.estado === id))
    );
  }
}
