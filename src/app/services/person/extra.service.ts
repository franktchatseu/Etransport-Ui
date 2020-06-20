import { Injectable } from '@angular/core';
import { config } from '../../../../../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {

  constructor(private http: HttpClient) {
  }

  public getCebs() {
    return this.http.get<any>(`${config.apiUrl}/extras/cebs`)
      .pipe(map(data => data));
  }

  public getGroupes() {
    return this.http.get<any>(`${config.apiUrl}/extras/groupes`)
      .pipe(map(data => data));
  }

  public getPostes() {
    return this.http.get<any>(`${config.apiUrl}/extras/postes`)
      .pipe(map(data => data));
  }

  public get(url) {
    return this.http.get<any>(`${url}`)
      .pipe(map(data => data));
  }

}
