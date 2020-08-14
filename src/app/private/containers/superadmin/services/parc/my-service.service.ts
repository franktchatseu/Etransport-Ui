import { Injectable } from '@angular/core';
import { config } from '../../../../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MyCrudService {

    //recuperation de la route
    public url: String;

    constructor(
        private http: HttpClient
    ) {
        
    }

    public get(url) {
        return this.http.get<any>(`${config.apiUrl}${url}`).toPromise();
    }
    public find(id,url) {
        return this.http.get<any>(`${config.apiUrl}${url}/${id}`).toPromise();
    }
    //initialisation d'un stepper
    post(formData: FormData,url): Promise<any> {
        return this.http.post<any>(`${config.apiUrl}${url}`, formData).toPromise();
    }
    //mise a jour des valeurs du stepper
    update(formData: FormData, id,url): Promise<any> {
        return this.http.post<any>(`${config.apiUrl}${url}/${id}`, formData).toPromise();
    }

    delete(id,url){
        return this.http.delete(`${config.apiUrl}${url}/${id}`).toPromise();
    
      }
}