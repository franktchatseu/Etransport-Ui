import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper/stepper.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['./driver-add.component.scss'],
 
})
export class DriverAddComponent implements OnInit {

  //attribut pour rendre optionnel ou pas
  isOptional: true;
  //initialisation des differentes initForm
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  stepperApi: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private stepperService: StepperService
  ) { }

  ngOnInit(): void {
   this.initStep1();
   this.initStep2();

  }
  //initialisation des formulaires
  initStep1() {
    this.step1Form = this.formBuilder.group(
      {
        name: ''
      }
    )
  }
  //initialisation des formulaires
  initStep2() {
    this.step1Form = this.formBuilder.group(
      {
        prenom: ''
      }
    )
  }
  //initialisation des formulaires
  initStep3() {
    this.step1Form = this.formBuilder.group(
      {
        telephone: ''
      }
    )
  }

  addStep1() {
    console.log("stepper 1 termine");
    const formData: FormData = new FormData();
    formData.append("value", '' + 1);
    formData.append("status", '' + 0);
    formData.append("stepper_main_id", '' + 1);
    this.stepperService.add(formData).then(
      (Response) => {
        console.log(Response)
        //sauvegarde dans le local storage
        this.stepperService.storeStepper(Response)
      },
      (error) => {
        console.log(error)
      },

    )
  }

  addStep2() {
    console.log("stepper 2 termine");
    const formData: FormData = new FormData();
    const number = this.stepperService.getNumber();
    const value = +this.stepperService.getValue()
    const status = this.stepperService.getStatus();
    const new_value = value + 1;
    //on recupere la valeur du stepper correspondant dans la base de donnne
    this.stepperService.find(number).then(
      (Response) => {
        console.log(Response)
        this.stepperApi = Response;
      },
      (error) => {
        console.log(error)
        return;
      },
    )
    console.log(value)
    formData.append("value", '' + new_value);
    formData.append("status", '' + status);
    formData.append("stepper_main_id", '' + 1);
    this.stepperService.update(formData, number).then(
      (Response) => {
        console.log(Response)
        //sauvegarde dans le local storage
        this.stepperService.storeStepper(Response)
      },
      (error) => {
        console.log(error)
      },

    )


  }

  addStep3() {

  }
}
