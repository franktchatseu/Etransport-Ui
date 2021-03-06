import { Injectable } from '@angular/core';
import { config } from 'src/app/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) {}

  async post(formData): Promise<any> {
    return await this.http.post(`${config.apiUrl}/module3/types`, formData).toPromise();
  }

  public async put(id: number, formData): Promise<any> {
    return await this.http
        .post(`${config.apiUrl}/module3/types/${id}`, formData)
        .toPromise();
  }

  public gets(page) {
    return this.http.get<any>(`${config.apiUrl}/module3/types?page=${page}`)
      .toPromise();
  }

  public get(url) {
    return this.http.get<any>(`${url}`)
      .toPromise();
  }

  public async delete(id) {
    return await this.http
        .delete(`${config.apiUrl}/module3/types/${id}`)
        .toPromise();
  }

}
