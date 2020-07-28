import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper/stepper.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material';
import { DriverService } from '../../../services/driver.service';
@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['./driver-add.component.scss'],

})
export class DriverAddComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput: ElementRef;
  @ViewChild('fileInput')
  fileInputAvatar: ElementRef;
  file: any
  fileAvatar: any;
  fileInformation: any
  fileInformationAvatar: any

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
  picker: any
  constructor(
    private formBuilder: FormBuilder,
    private stepperService: StepperService,
    private _snackBar: MatSnackBar,
    private driverService: DriverService,

  ) { }
  selectFile(): void {
    this.fileInput.nativeElement.click();
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.step4Form.get('filename').setValue(this.file.name); (1)
      this.fileInformation = null;
    }
  }
  //image de avatar
  selectFileAvatar(): void {
    this.fileInputAvatar.nativeElement.click();
  }
  onSelectFileAvatar(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.fileAvatar = event.target.files[0];
      this.step1Form.get('avatar').setValue(this.fileAvatar.name); (1)
      this.fileInformationAvatar = null;
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
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        date_naissance: ['', [Validators.required]],
        lieu_naissance: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        adresse: ['', [Validators.required]],
        telephone1: ['', [Validators.required]],
        telephone2: '',
        avatar: ['', [Validators.required]],


      }
    )
  }
  //initialisation des formulaires
  initStep2() {
    this.step2Form = this.formBuilder.group(
      {
        num_permis: ['', [Validators.required]],
        date_delivrance: ['', [Validators.required]],
        lieu_delivrance: ['', [Validators.required]],
      }
    )
  }
  //initialisation des formulaires
  initStep3() {
    this.step3Form = this.formBuilder.group(
      {
        piece_identite: ['', [Validators.required]],
        num_piece: ['', [Validators.required]],
        date_delivrance: ['', [Validators.required]],
        lieu_delivrance: ['', [Validators.required]],
      }
    )
  }
  initStep4() {
    this.step4Form = this.formBuilder.group(
      {
        name_formation: ['', [Validators.required]],
        filename: ''
      }
    )
  }
  get InfoGenerale() {
    return this.step1Form.controls;
  }
  get drivingPermit() {
    return this.step2Form.controls;
  }
  get PieceIndentite() {
    return this.step3Form.controls;
  }
  get Formation() {
    return this.step4Form.controls;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  addStep1() {

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
    formData.append("tel2", '' + this.InfoGenerale.telephone1.value);
    const file: File = null
    formData.append("avatar", this.InfoGenerale.avatar.value);
    formData.append("stepper_id", '' + 1);
    formData.append("nationality_id", '' + 1);

    //ajout des infos generales de utilisateurs
    this.driverService.add(formData).then(
      (Response) => {
        console.log(Response)
        //sauvegarde dans le local storage
        this.openSnackBar("Ajout Reussi", "Etape 1")
        console.log("stepper 1 termine");
        this.createStepper();
      },
      (error) => {
        console.log(error)
      },

    )

  }
  addStep2() {
    //recuperation des champs du stepper 2
    const formData: FormData = new FormData();
    formData.append("number", '' + this.drivingPermit.num_permis.value);
    formData.append("date_issue", '' + this.drivingPermit.date_delivrance.value);
    formData.append("place_issue", '' + this.drivingPermit.lieu_delivrance.value);
    // on recupere le stepper id
    const number = this.stepperService.getNumber();
    formData.append("stepper_id", '' + number);

    //ajout des infos generales de utilisateurs
    this.driverService.addPermis(formData).then(
      (Response) => {
        console.log(Response)
        //sauvegarde dans le local storage
        this.openSnackBar("Ajout Reussi", "Etape 1")
        console.log("stepper 2 termine");
        this.updateStepper();
      },
      (error) => {
        console.log(error)
      },

    )

  }

  addStep3() {
   //recuperation des champs du stepper 3
   const formData: FormData = new FormData();
   formData.append("identical_piece", '' + this.PieceIndentite.piece_identite.value);
   formData.append("piece_number", '' + this.PieceIndentite.num_piece.value);
   formData.append("date_issue", '' + this.PieceIndentite.date_delivrance.value);
   formData.append("place_issue", '' + this.PieceIndentite.lieu_delivrance.value);
   // on recupere le stepper id
   const number = this.stepperService.getNumber();
   formData.append("stepper_id", '' + number);

   //ajout des infos generales de utilisateurs
   this.driverService.addPiece(formData).then(
     (Response) => {
       console.log(Response)
       //sauvegarde dans le local storage
       this.openSnackBar("Ajout Reussi", "Etape 1")
       console.log("stepper 2 termine");
       this.updateStepper();
     },
     (error) => {
       console.log(error)
     },

   )

  }
  addStep4() {
   //recuperation des champs du stepper 3
   const formData: FormData = new FormData();
   formData.append("name", '' + this.Formation.name_formation.value);
   formData.append("file", '' + this.Formation.filename.value);

   // on recupere le stepper id
   const number = this.stepperService.getNumber();
   formData.append("stepper_id", '' + number);

   //ajout des infos generales de utilisateurs
   this.driverService.addFormations(formData).then(
     (Response) => {
       console.log(Response)
       //sauvegarde dans le local storage
       this.openSnackBar("Ajout Reussi", "Etape 1")
       console.log("stepper 4 termine");
       this.updateStepper();
     },
     (error) => {
       console.log(error)
     }
   )

  }
  createStepper() {
    const formData: FormData = new FormData();
    formData.append("value", '' + 1);
    formData.append("status", '' + 0);
    formData.append("stepper_main_id", '' + 1);
    this.stepperService.add(formData).then(
      (Response) => {
        console.log(Response)
        //sauvegarde dans le local storage
        this.stepperService.storeStepper(Response)
        this.openSnackBar("Ajout Reussi", "Etape 1")
      },
      (error) => {
        console.log(error)
      },

    )

  }
  updateStepper() {
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
        this.openSnackBar("Ajout Reussi", "Etape 2")

      },
      (error) => {
        console.log(error)
      },

    )
  }

}


