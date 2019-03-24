import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';

@Injectable()
export class StockPlacementService {

  constructor(private http: HttpClient) { }

  consultarLogin(usuarioLogado){
    return this.http.post('http://api-teste-aslave-org-br.umbler.net/auth',usuarioLogado);
  }

  getProducts(){
      return this.http.get('http://api-teste-aslave-org-br.umbler.net/product');
  }

}