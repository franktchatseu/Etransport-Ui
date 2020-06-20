import { Injectable } from '@angular/core';
import { config } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(private http: HttpClient) {
    
  }

  //methode qui renvoie tous les evenements en respectant la pagination 
  public get(url) {
    return this.http.get<any>(`${url}`)
      .pipe(map(data => data));
  }

  add(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/persons/users_evenements`, formData).toPromise();
  }
  update(formData: FormData,evenement_id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/persons/users_evenements/${evenement_id}`, formData).toPromise();
  }
  public async put(id: number): Promise<any> {
    return await this.http
        .put(`${config.apiUrl}/persons/users_evenements/${id}`, null).toPromise();
  }

  //recuperation de tout les evenements de utilisateurs connectes
  public getEvenementsByUser(user_id:number,limit){
    return this.http.get<any>(`${config.apiUrl}/persons/users_evenements/user/${user_id}?limit=${limit}`)
    .pipe(map(data => data));
  }
  
  //methode de suppression d'un evenement
  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/persons/users_evenements/${id}`).toPromise();
  
  }

  //methode qui recherche un evenement
  find(id: number): Promise<any> {
    return this.http.get<any>(`${config.apiUrl}/persons/users_evenements/${id}`).toPromise();
  }

}