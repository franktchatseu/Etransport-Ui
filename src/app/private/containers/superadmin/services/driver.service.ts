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
    return this.http.get<any>(`${config.apiUrl}/module2/general_informations/`)
      .pipe(map(data => data));
  }

  public getPage(url) {
    return this.http.get<any>(`${url}`)
      .pipe(map(data => data));
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

}