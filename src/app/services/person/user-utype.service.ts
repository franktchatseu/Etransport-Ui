import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserUtypeService {

  constructor(private http: HttpClient) {
   
  }

  async post(formData) {

    return await this.http.post(`${config.apiUrl}/persons`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map(data => data));
  }

  public async put(id: number, parishId: number): Promise<any> {
    return await this.http
        .put(`${config.apiUrl}/persons/user-utypes/${id}/activate-parishs?parish_id=${parishId}`, null).toPromise();
  }

  public getUserParishs(userId: number) {
    return this.http.get<any>(`${config.apiUrl}/persons/user-utypes/${userId}/parishs`)
      .pipe(map(data => data));
  }

  public get(url) {
    return this.http.get<any>(`${url}`)
      .pipe(map(data => data));
  }

  public async delete(id) {
    return await this.http
        .delete(`${config.apiUrl}/suggestions/${id}`)
        .pipe(map(data => data));
  }

}
