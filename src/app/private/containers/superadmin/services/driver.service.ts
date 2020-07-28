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
    
      delete(id: number) {
        return this.http.delete(`${config.apiUrl}/module2/general_informations/${id}`).toPromise();
    
      }
    
  }