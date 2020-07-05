import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) {}

  async post(formData): Promise<any> {
    return await this.http.post(`${config.apiUrl}/actualities/articles`, formData).toPromise();
  }

  public async put(id: number, formData): Promise<any> {
    return await this.http
        .post(`${config.apiUrl}/actualities/articles/${id}`, formData)
        .toPromise();
  }

  public gets(page, slug, parishId) {
    return this.http.get<any>(`${config.apiUrl}/actualities/submenus/${slug}/articles?page=${page}&parish_id=${parishId}`)
      .toPromise();
  }

  public get(url) {
    return this.http.get<any>(`${url}`)
      .toPromise();
  }

  public async delete(id) {
    return await this.http
        .delete(`${config.apiUrl}/actualities/articles/${id}`)
        .toPromise();
  }

  public getMenus(limit = 100) {
    return this.http.get<any>(`${config.apiUrl}/actualities/menus?limit=${limit}`)
      .toPromise();
  }

  public getSubMenus(menu, limit = 1000) {
    return this.http.get<any>(`${config.apiUrl}/actualities/submenus/${menu}/menu?limit=${limit}`)
      .toPromise();
  }

  public getParishs(limit = 100) {
    return this.http.get<any>(`${config.apiUrl}/actualities/menus?limit=${limit}`)
      .toPromise();
  }


}
