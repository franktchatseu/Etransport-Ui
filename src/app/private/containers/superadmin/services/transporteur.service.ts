import { Injectable } from '@angular/core';
import { config } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransporteurService {

  constructor(private http: HttpClient) { }

   



  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/module2/general_informations/${id}`).toPromise();

  }
  addInfoGenerale1(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module1/info_entreprise_one`, formData).toPromise();
  }
  addInfoGenerale2(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module1/info_entreprise_two`, formData).toPromise();
  }
  addInfoPersonnelle(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module1/personalcomputingspecial`, formData).toPromise();
  }
  addFormations(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module1/formations`, formData).toPromise();
  }

}