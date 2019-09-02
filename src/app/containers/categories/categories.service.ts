import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorias } from '../../shared/models/categories';
import { baseUrl } from './../../config';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  private categoriesURL = baseUrl+'category';

  getCategoriesServ(): Observable<HttpResponse<any>>{
    return this.http.get<Categorias[]>(this.categoriesURL, { observe: 'response'});
  }

  getCategoriesId(id?:number): Observable<HttpResponse<any>>{
    return this.http.get<Categorias[]>(`${this.categoriesURL}/${id}`,{ observe: 'response'});
  }

  postCategory(form){
    return this.http.post(this.categoriesURL, form);
  }

  deleteCategory(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.categoriesURL}/${id}`, { observe: 'response' });
  }

  updateCategory(Categorias: any, id): Observable<any>{

    return this.http.put(`${this.categoriesURL}/${id}`, Categorias);
  }

  }


