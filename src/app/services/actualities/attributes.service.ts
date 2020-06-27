import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(private http: HttpClient) {}

  async post(formData): Promise<any> {
    return await this.http.post(`${config.apiUrl}/actualities/attributes`, formData).toPromise();
  }

  public async put(id: number, formData): Promise<any> {
    return await this.http
        .post(`${config.apiUrl}/actualities/attributes/${id}`, formData)
        .toPromise();
  }

  public gets(page) {
    return this.http.get<any>(`${config.apiUrl}/actualities/attributes?page=${page}`)
      .toPromise();
  }

  public get(url) {
    return this.http.get<any>(`${url}`)
      .toPromise();
  }

  public async delete(id) {
    return await this.http
        .delete(`${config.apiUrl}/actualities/attributes/${id}`)
        .toPromise();
  }

}
