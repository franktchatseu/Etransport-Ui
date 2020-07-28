import { Injectable } from '@angular/core';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

    private STEPPER_DRIVER_NUMBER ='stepper_driver_number';
    private STEPPER_DRIVER_VALUE = 'stepper_driver_value';
    private STEPPER_DRIVER_STATUS = 'stepper_driver_status'
  constructor(
      private http: HttpClient,
     ) {}

  //recuperation du stepper dans la base de donnee
  public get(numero) {
    return this.http.get<any>(`${config.apiUrl}/module2/stepper_driver/${numero}`)
      .pipe(map(data => data));
  }
  //initialisation d'un stepper
  add(formData: FormData): Promise<any> {
    return this.http.post<any>(`${config.apiUrl}/module2/stepper_driver`, formData).toPromise();
  }
  //mise a jour des valeurs du stepper
  update(formData: FormData, numero): Promise<any> {
    return this.http.put<any>(`${config.apiUrl}/module2/stepper_driver/${numero}`, formData).toPromise();
  }
  
  //gestion du local storage pour le stepper
  public storeStepper(stepper: any) {
    localStorage.setItem(this.STEPPER_DRIVER_NUMBER, stepper.number);
    localStorage.setItem(this.STEPPER_DRIVER_VALUE, stepper.value);
    localStorage.setItem(this.STEPPER_DRIVER_STATUS, stepper.status);
  }
  public getNumber(){
      return localStorage.getItem(this.STEPPER_DRIVER_NUMBER)
  }
  public getValue(){
    return localStorage.getItem(this.STEPPER_DRIVER_VALUE)
 }
 public getStatus(){
    return localStorage.getItem(this.STEPPER_DRIVER_STATUS)
 }


  public removeTokens() {
    localStorage.removeItem(this.STEPPER_DRIVER_NUMBER);
    localStorage.removeItem(this.STEPPER_DRIVER_VALUE);
    localStorage.removeItem(this.STEPPER_DRIVER_STATUS);
  }

}
