import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classifications } from '../../shared/models/classifications';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassificationsService {

  constructor(private http: HttpClient) { }
  private classificationUrl = 'http://api-teste-aslave-org-br.umbler.net/financial-classifications';

  getClassifications(): Observable<HttpResponse<any>>{
    return this.http.get<Classifications[]>(this.classificationUrl, { observe: 'response'});
  }
 
  postClassifications(form){
    return this.http.post(this.classificationUrl, form);
  }

  delete(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.classificationUrl}/${id}`, { observe: 'response' });
  }

  updateClassification(Classification: any, id): Observable<any>{
    return this.http.put(`${this.classificationUrl}/${id}`, Classification);
  }
}
