import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper/stepper.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['./driver-add.component.scss'],
 
})
export class DriverAddComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput: ElementRef;
  file: any
  fileInformation : any
  // mes fichiers
  //attribut pour rendre optionnel ou pas
  isOptional: true;
  durationInSeconds = 5;
  //initialisation des differentes initForm
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  step4Form: FormGroup;
  stepperApi: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  picker : any
  constructor(
    private formBuilder: FormBuilder,
    private stepperService: StepperService,
    private _snackBar: MatSnackBar
  ) { }
  selectFile(): void {
    this.fileInput.nativeElement.click();
  }
  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.step4Form.get('filename').setValue(this.file.name); (1)
      this.fileInformation = null;
    }
  }

  ngOnInit(): void {
   this.initStep1();
   this.initStep2();
   this.initStep3();
   this.initStep4()

  }
  //initialisation des formulaires
  initStep1() {
    this.step1Form = this.formBuilder.group(
      {
        nom: ['',[Validators.required]], 
        prenom: ['',[Validators.required]], 
        date_naissance: ['',[Validators.required]], 
        lieu_naissance: ['',[Validators.required]], 
        email: ['',[Validators.required,Validators.email]], 
        adresse: ['',[Validators.required]], 
        telephone1: ['',[Validators.required]], 
        telephone2: ''

      }
    )
  }
  //initialisation des formulaires
  initStep2() {
    this.step2Form = this.formBuilder.group(
      {
        num_permis:  ['',[Validators.required]],
        date_delivrance: ['',[Validators.required]], 
        lieu_delivrance: ['',[Validators.required]], 
      }
    )
  }
  //initialisation des formulaires
  initStep3() {
    this.step3Form = this.formBuilder.group(
      {
        num_permis:  ['',[Validators.required]],
        date_delivrance: ['',[Validators.required]], 
        lieu_delivrance: ['',[Validators.required]],
      }
    )
  }
  initStep4() {
    this.step4Form = this.formBuilder.group(
      {
        name_formation:  ['',[Validators.required]],
        filename: ''
      }
    )
  }
  get InfoGenerale() {
    return this.step1Form.controls;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  addStep1() {
    console.log("stepper 1 termine");
    this.createStepper();
    //recuperation des champs du stepper 1
    const formData: FormData = new FormData();
    formData.append("first_name", '' + this.InfoGenerale.nom.value);
    formData.append("last_name", '' + this.InfoGenerale.prenom.value);
    formData.append("date_birth", '' + this.InfoGenerale.date_naissance.value);
    formData.append("place_birth", '' + this.InfoGenerale.lieu_naissance.value);
    formData.append("email", '' + this.InfoGenerale.email.value);
    formData.append("tel1", '' + this.InfoGenerale.adresse.value);
    formData.append("tel2", '' + this.InfoGenerale.telephone1.value);
    formData.append("address", '' + this.InfoGenerale.telephone2.value);
    formData.append("nationality_id", '' + 1);
  }
adadjufa
  addStep2() {
    console.log("stepper 2 termine");
    this.updateStepper();
  }

  addStep3() {
    console.log("stepper 3 termine");
    this.updateStepper();

  }
  addStep4() {
    console.log("stepper 4 termine");
    this.updateStepper();

  }
  createStepper(){
    const formData: FormData = new FormData();
    formData.append("value", '' + 1);
    formData.append("status", '' + 0);
    formData.append("stepper_main_id", '' + 1);
    this.stepperService.add(formData).then(
      (Response) => {
        console.log(Response)
        //sauvegarde dans le local storage
        this.stepperService.storeStepper(Response)
        this.openSnackBar("Ajout Reussi","Etape 1")
      },
      (error) => {
        console.log(error)
      },

    )

  }
  updateStepper(){
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
        this.openSnackBar("Ajout Reussi","Etape 2")

      },
      (error) => {
        console.log(error)
      },

    )
  }
  
}


