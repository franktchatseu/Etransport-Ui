import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubmenusService {

  constructor(private http: HttpClient) {}

  async post(formData): Promise<any> {
    return await this.http.post(`${config.apiUrl}/actualities/submenus`, formData).toPromise();
  }

  public async put(id: number, formData): Promise<any> {
    return await this.http
        .post(`${config.apiUrl}/actualities/submenus/${id}`, formData)
        .toPromise();
  }

  public gets(page, id) {
    // console.log(slugMenu);
    // return this.http.get<any>(`${config.apiUrl}/actualities/submenus?page=${page}`)
    return this.http.get<any>(`${config.apiUrl}/actualities/submenus/${id}/menus?page=${page}`)
      .toPromise();
  }

  public getMenus(limit = 1000) {
    return this.http.get<any>(`${config.apiUrl}/actualities/menus?limit=${limit}`)
      .toPromise();
  }

  public get(url) {
    return this.http.get<any>(`${url}`)
      .toPromise();
  }

  public async delete(id) {
    return await this.http
        .delete(`${config.apiUrl}/actualities/submenus/${id}`)
        .toPromise();
  }

}
