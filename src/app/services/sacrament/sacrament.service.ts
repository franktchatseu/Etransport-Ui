import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class SacramentService {

  constructor(private http: HttpClient) {}

  public getPage(url) {
    return this.http.get<any>(`${url}`)
      .pipe(map(data => data));
  }

  public get() {
    return this.http.get<any>(`${config.apiUrl}/sacrament/sacraments`)
      .pipe(map(data => data));
  }
  add(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/sacrament/sacraments`, formData).toPromise();
  }
  
  find(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/sacrament/sacraments/${id}`).toPromise();
  }

  update(formData: FormData, sacrament_id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/sacrament/sacraments/${sacrament_id}`, formData).toPromise();
  }


  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/sacrament/sacraments/${id}`).toPromise();

  }

}
