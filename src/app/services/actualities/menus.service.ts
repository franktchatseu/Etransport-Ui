import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private http: HttpClient) {}

  async post(formData): Promise<any> {
    return await this.http.post(`${config.apiUrl}/actualities/menus`, formData).toPromise();
  }

  public async put(id: number, formData): Promise<any> {
    return await this.http
        .post(`${config.apiUrl}/actualities/menus/${id}`, formData)
        .toPromise();
  }

  public gets(page) {
    return this.http.get<any>(`${config.apiUrl}/actualities/menus?page=${page}`)
      .toPromise();
  }

  public get(url) {
    return this.http.get<any>(`${url}`)
      .toPromise();
  }

  public async delete(id) {
    return await this.http
        .delete(`${config.apiUrl}/actualities/menus/${id}`)
        .toPromise();
  }

}
