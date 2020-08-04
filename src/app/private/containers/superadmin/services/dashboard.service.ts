import { Injectable } from '@angular/core';
import { config } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

    getDonne(): Promise<any> {
        return this.http.get<any>(`${config.apiUrl}/tableau_bord/dashboard`).toPromise();
      }
  
}
