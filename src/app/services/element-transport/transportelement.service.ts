import { Injectable } from '@angular/core';
import { config } from 'src/app/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransportelementService {

  constructor(private http: HttpClient) {}

  async post(formData): Promise<any> {
    return await this.http.post(`${config.apiUrl}/module4/transportElement`, formData).toPromise();
  }

  public async put(id: number, formData): Promise<any> {
    return await this.http
        .post(`${config.apiUrl}/module4/transportElement/${id}`, formData)
        .toPromise();
  }

  public gets(page) {
    return this.http.get<any>(`${config.apiUrl}/module4/transportElement?page=${page}`)
      .toPromise();
  }

  public get(url) {
    return this.http.get<any>(`${url}`)
      .toPromise();
  }

  public getTypes() {
    return this.http.get<any>(`${config.apiUrl}/module4/actorType`)
      .toPromise();
  }

  find(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module4/transportElement/finds/${id}`).toPromise();
  }

  public async delete(id) {
    return await this.http
        .delete(`${config.apiUrl}/module4/transportElement/${id}`)
        .toPromise();
  }

}
