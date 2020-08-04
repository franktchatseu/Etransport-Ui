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
      return this.http.get<any>(`${config.apiUrl}/module3/caractere_tech_ones/findAllCaracter`)
        .pipe(map(data => data));
    }

    getMarque(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/module3/marks/${id}`).toPromise();
    }

    getModel(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/module3/modeles/${id}`).toPromise();
    }

    getDescription(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/module3/descriptions/${id}`).toPromise();
    }

    getCarpapers(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/module3/carpapers/${id}`).toPromise();
    }

    getPicture(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/module3/gear_pictures/${id}`).toPromise();
    }

    getType(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/module3/types/${id}`).toPromise();
    }

    getCaractere1(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/module3/caractere_tech_ones/${id}/findAllCaracterById`).toPromise();
    }

    getCaractere2(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/module3/caractertechtwos/${id}`).toPromise();
    }

    getCaosserie(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/module3/carosseries/${id}`).toPromise();
    }

    delete(id: number) {
      return this.http.delete(`${config.apiUrl}/module3/caractere_tech_ones/${id}`).toPromise();
  
    }
    //ajouter les caracteres techniques un du vehicule
    addCaract1(formData: FormData): Promise<any> {
      return this.http.post<any>(`${config.apiUrl}/module3/caractere_tech_ones`, formData).toPromise();
    }
     //ajouter les caracteres techniques 02 du vehicule
     addCaract2(formData: FormData): Promise<any> {
      return this.http.post<any>(`${config.apiUrl}/module3/caractertechtwos`, formData).toPromise();
    }

    //description du vehecule
    addDescription(formData: FormData): Promise<any> {
      return this.http.post<any>(`${config.apiUrl}/module3/descriptions`, formData).toPromise();
    }
    addPhotos(formData: FormData): Promise<any> {
      return this.http.post<any>(`${config.apiUrl}/module3/gear_pictures`, formData).toPromise();
    }
    addCarpapers(formData: FormData): Promise<any> {
      return this.http.post<any>(`${config.apiUrl}/module3/carpapers`, formData).toPromise();
    }

    public getCarosseries() {
      return this.http.get<any>(`${config.apiUrl}/module3/carosseries`)
        .toPromise();
    }

    public getTypes() {
      return this.http.get<any>(`${config.apiUrl}/module3/types`)
        .toPromise();
    }

    public getMarks() {
      return this.http.get<any>(`${config.apiUrl}/module3/marks`)
        .toPromise();
    }

    public getModels() {
      return this.http.get<any>(`${config.apiUrl}/module3/modeles`)
        .toPromise();
    }

    
    findCaractere1(id: number): Promise<any> {
      return this.http.get<any>(`${config.apiUrl}/module3/caractere_tech_ones/${id}`).toPromise();
    }

    //mes updates de engin
      //mise a jnur des  infos du chauf
  updateCaractere1(formData: FormData, id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module3/caractere_tech_ones/${id}`, formData).toPromise();
  }
  updateCaractere2(formData: FormData, id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module3/caractertechtwos/${id}`, formData).toPromise();
  }
  updateDescription(formData: FormData, id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module3/descriptions/${id}`, formData).toPromise();
  }
  updateCarPaper(formData: FormData, id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module3/carpapers/${id}`, formData).toPromise();
  }
  updatePicture(formData: FormData, id): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module3/gear_pictures/${id}`, formData).toPromise();
  }

  //good delete
  deletebystepper(number){
    return this.http.delete(`${config.apiUrl}/module3/stepper_trees/${number}`).toPromise();

  }
}
