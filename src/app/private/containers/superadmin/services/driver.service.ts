import { Injectable } from '@angular/core';
import { config } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  public getDrivers() {
    return this.http.get<any>(`${config.apiUrl}/module2/general_informations/allWithName`)
      .pipe(map(data => data));
  }

  public getPage(url) {
    return this.http.get<any>(`${url}`)
      .pipe(map(data => data));
  }

  public getNationalities() {
    return this.http.get<any>(`${config.apiUrl}/module2/nationalities`)
      .toPromise();
  }

  findGeneralInfo(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module2/general_informations/finds/${id}`).toPromise();
  }

  getPermis(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module2/drivingpermits/${id}`).toPromise();
  }

  getFormations(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module2/formations/${id}`).toPromise();
  }

  getDocInfos(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module2/doc_identity_information/${id}`).toPromise();
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/module2/general_informations/${id}`).toPromise();

  }
  add(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module2/general_informations`, formData).toPromise();
  }
  addPiece(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module2/doc_identity_information`, formData).toPromise();
  }
  addPermis(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module2/drivingpermits`, formData).toPromise();
  }
  addFormations(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module2/formations`, formData).toPromise();
  }

  //mise a jnur des  infos du chauf
  updateInformation(formData: FormData, id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module2/general_informations/${id}`, formData).toPromise();
  }

  updatePiece(formData: FormData, id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module2/doc_identity_information/${id}`, formData).toPromise();
  }
  updatePermis(formData: FormData, id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module2/drivingpermits/${id}`, formData).toPromise();
  }
  updateFormations(formData: FormData, id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module2/formations/${id}`, formData).toPromise();
  }
}