import { Injectable } from '@angular/core';
import { config } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  

  constructor(private http: HttpClient) { }

  getEnterprise1(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module1/info_entreprise_one/${id}`).toPromise();
  }

  getEnterprise2(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module1/info_entreprise_two/${id}`).toPromise();
  }

  getDocPersos(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module1/personalcomputingspecial/${id}`).toPromise();
  }

}