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
      return this.http.get<any>(`${config.apiUrl}/Module3/caractere_tech_ones/findAllCaracter`)
        .pipe(map(data => data));
    }

    getMarque(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/Module3/marks/${id}`).toPromise();
    }

    getModel(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/Module3/modeles/${id}`).toPromise();
    }

    getDescription(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/Module3/descriptions/${id}`).toPromise();
    }

    getCarpapers(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/Module3/carpapers/${id}`).toPromise();
    }

    getPicture(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/Module3/gear_pictures/${id}`).toPromise();
    }

    getType(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/Module3/types/${id}`).toPromise();
    }

    getCaractere1(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/Module3/caractere_tech_ones/${id}/findAllCaracterById`).toPromise();
    }

    getCaractere2(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/Module3/caractertechtwos/${id}`).toPromise();
    }

    getCaosserie(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/Module3/carosseries/${id}`).toPromise();
    }

    delete(id: number) {
      return this.http.delete(`${config.apiUrl}/Module3/caractere_tech_ones/${id}`).toPromise();
  
    }
}
