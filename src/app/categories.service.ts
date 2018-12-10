import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoryList: any[] = [
    {name: "Categoria Um"},
    {name: "Categoria Dois"},
  ];

  addCategory(category){
    this.categoryList.push(category);
  }

  getAll(){
    return this.categoryList;
  }
  
  constructor(
    private http: HttpClient
  ) { }

  
  url = '../models/categories.json';

  getCategories(): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.url, {observe: 'response'})
    // .pipe(map((res: Response) => res.json()))
  }
}
