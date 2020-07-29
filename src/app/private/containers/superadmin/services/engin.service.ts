import { Injectable } from '@angular/core';
import { config } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnginService {

    constructor(private http: HttpClient) { }

    public getPage(url) {
      return this.http.get<any>(`${url}`)
        .pipe(map(data => data));
    }

    public getEngins() {
      return this.http.get<any>(`${config.apiUrl}/module3/caractere_tech_ones/findAllCaracter`)
        .pipe(map(data => data));
    }

    delete(id: number) {
      return this.http.delete(`${config.apiUrl}/module3/caractere_tech_ones/${id}`).toPromise();
  
    }
}
