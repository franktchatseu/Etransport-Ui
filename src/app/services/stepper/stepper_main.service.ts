import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StepperMainService {

  private STEPPER_MAIN_ID = 'stepper_main_id';
  private STEPPER_MAIN_NUMBER = 'stepper_main_number';
  private STEPPER_MAIN_VALUE = 'stepper_main_value';
  private STEPPER_MAIN_STATUS = 'stepper_main_status'
  constructor(
    private http: HttpClient,
  ) { }

  //recuperation du stepper dans la base de donnee
  public find(numero) {
    return this.http.get<any>(`${config.apiUrl}/module1/stepper_main/${numero}`).toPromise();
  }
  //initialisation d'un stepper
  add(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module1/stepper_main`, formData).toPromise();
  }
  //mise a jour des valeurs du stepper
  update(formData: FormData, numero): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module1/stepper_main/${numero}`, formData).toPromise();
  }

  //gestion du local storage pour le stepper
  public storeStepper(stepper: any) {
    localStorage.setItem(this.STEPPER_MAIN_ID, stepper.id);
    localStorage.setItem(this.STEPPER_MAIN_NUMBER, stepper.number);
    localStorage.setItem(this.STEPPER_MAIN_VALUE, stepper.value);
    localStorage.setItem(this.STEPPER_MAIN_STATUS, stepper.status);
  }


  public getStepperId() {
    return localStorage.getItem(this.STEPPER_MAIN_ID)
  }
  public getNumber() {
    return localStorage.getItem(this.STEPPER_MAIN_NUMBER)
  }
  public getValue() {
    return localStorage.getItem(this.STEPPER_MAIN_VALUE)
  }
  public getStatus() {
    return localStorage.getItem(this.STEPPER_MAIN_STATUS)
  }


  public removeTokens() {
    localStorage.removeItem(this.STEPPER_MAIN_NUMBER);
    localStorage.removeItem(this.STEPPER_MAIN_VALUE);
    localStorage.removeItem(this.STEPPER_MAIN_STATUS);
  }

}
