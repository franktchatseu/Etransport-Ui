import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiturgicalentrytypeService {

  constructor(private http: HttpClient) {}

  async post(formData): Promise<any> {
    return await this.http.post(`${config.apiUrl}/liturgicals/liturgical_type_entry_types`, formData).toPromise();
  }

  public async put(id: number, formData): Promise<any> {
    return await this.http
        .post(`${config.apiUrl}/liturgicals/liturgical_type_entry_types/${id}`, formData)
        .toPromise();
  }

  public gets(page) {
    return this.http.get<any>(`${config.apiUrl}/liturgicals/liturgical_type_entry_types/types?page=${page}`)
      .toPromise();
  }

  public getTypes() {
    return this.http.get<any>(`${config.apiUrl}/liturgicals/liturgical_type_entry_types/types`)
      .toPromise();
  }

  public get(url) {
    return this.http.get<any>(`${url}`)
      .toPromise();
  }

  public async delete(id) {
    return await this.http
        .delete(`${config.apiUrl}/liturgicals/liturgical_type_entry_types/${id}`)
        .toPromise();
  }
}
