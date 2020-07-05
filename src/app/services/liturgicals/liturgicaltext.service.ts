import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LiturgicaltextService {

  constructor(private http: HttpClient) {}

  async post(formData): Promise<any> {
    return await this.http.post(`${config.apiUrl}/liturgicals/liturgical_texts`, formData).toPromise();
  }

  public async put(id: number, formData): Promise<any> {
    return await this.http
        .post(`${config.apiUrl}/liturgicals/liturgical_texts/${id}`, formData)
        .toPromise();
  }

  public gets(page) {
    return this.http.get<any>(`${config.apiUrl}/liturgicals/liturgical_texts?page=${page}`)
      .toPromise();
  }

  public getParishs() {
    return this.http.get<any>(`${config.apiUrl}/settings/parishs`)
      .toPromise();
  }
  

  public get(url) {
    return this.http.get<any>(`${url}`)
      .toPromise();
  }

  public async delete(id) {
    return await this.http
        .delete(`${config.apiUrl}/liturgicals/liturgical_texts/${id}`)
        .toPromise();
  }
}

