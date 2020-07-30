import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StepperEnginService {

  private STEPPER_ENGIN_ID = 'stepper_engin_id';
  private STEPPER_ENGIN_NUMBER = 'stepper_engin_number';
  private STEPPER_ENGIN_VALUE = 'stepper_engin_value';
  private STEPPER_ENGIN_STATUS = 'stepper_engin_status'
  constructor(
    private http: HttpClient,
  ) { }

  //recuperation du stepper dans la base de donnee
  public find(numero) {
    return this.http.get<any>(`${config.apiUrl}/module3/stepper_trees/${numero}`).toPromise();
  }
  //initialisation d'un stepper
  add(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module3/stepper_trees`, formData).toPromise();
  }
  //mise a jour des valeurs du stepper
  update(formData: FormData, numero): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module3/stepper_trees/${numero}`, formData).toPromise();
  }

  //gestion du local storage pour le stepper
  public storeStepper(stepper: any) {
    localStorage.setItem(this.STEPPER_ENGIN_ID, stepper.id);
    localStorage.setItem(this.STEPPER_ENGIN_NUMBER, stepper.number);
    localStorage.setItem(this.STEPPER_ENGIN_VALUE, stepper.value);
    localStorage.setItem(this.STEPPER_ENGIN_STATUS, stepper.status);
  }


  public getStepperId() {
    return localStorage.getItem(this.STEPPER_ENGIN_ID)
  }
  public getNumber() {
    return localStorage.getItem(this.STEPPER_ENGIN_NUMBER)
  }
  public getValue() {
    return localStorage.getItem(this.STEPPER_ENGIN_VALUE)
  }
  public getStatus() {
    return localStorage.getItem(this.STEPPER_ENGIN_STATUS)
  }


  public removeTokens() {
    localStorage.removeItem(this.STEPPER_ENGIN_NUMBER);
    localStorage.removeItem(this.STEPPER_ENGIN_VALUE);
    localStorage.removeItem(this.STEPPER_ENGIN_STATUS);
  }

}
