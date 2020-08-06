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
    return this.http.delete(`${config.apiUrl}/module1/stepper_main/${id}`).toPromise();
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

  findInfo1(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module1/info_entreprise_one/${id}`).toPromise();
  }

  public getPage(url) {
    return this.http.get<any>(`${url}`)
      .pipe(map(data => data));
  }

  
  findAllInfosEnterpriseById(id : number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module1/info_entreprise_one/findAllInfosEnterpriseById/${id}`).toPromise();
  }

  //findAllInfosEnterprise(){
  findAll() {
    return this.http.get<any>(`${config.apiUrl}/module1/info_entreprise_one/all`).toPromise();
  }
  findAllInfosEnterprise() {
    return this.http.get<any>(`${config.apiUrl}/module1/info_entreprise_one/findAllInfosEnterprise`).pipe(map(data => data));
  }

  findInfo2(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module1/info_entreprise_two/${id}`).toPromise();
  }

  findPersonnal(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/module1/personalcomputingspecial/${id}`).toPromise();
  }


  //update entreprise
  updateinfo1(formData: FormData, id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module1/info_entreprise_one/${id}`, formData).toPromise();
  }
  updateinfo2(formData: FormData, id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module1/info_entreprise_two/${id}`, formData).toPromise();
  }

  //get all drivers and cars for this entreprise
  getDriversandCars(id) {
    return this.http.get<any>(`${config.apiUrl}/module1/stepper_main/${id}/driversandcars`).toPromise();
  }
  
  getCarsByEat(id,etat:any) { 
    return this.http.get<any>(`${config.apiUrl}/module1/stepper_main/${id}/cars/${etat}`).toPromise();
  }
}