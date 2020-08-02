import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper/stepper.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material';
import { DriverService } from '../../../services/driver.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['./driver-add.component.scss'],

})
export class DriverAddComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput: ElementRef;
  @ViewChild('fileInputAvatar')
  fileInputAvatar: ElementRef;
  file: any
  fileAvatar: any;
  fileInformation: any
  fileInformationAvatar: any

  nationalities:any = null;
  //initialisation du stepper
  initStepper: any;
  currentStepper: number;
  currentStepperNumber: any;

  // mes fichiers
  //attribut pour rendre optionnel ou pas
  isEditable = false;
  isOptionalStep1: false;
  isOptionalStep2: true;
  isOptionalStep3: true;
  durationInSeconds = 5;
  //initialisation des differentes initForm
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  step4Form: FormGroup;
  stepperApi: any;
  picker: any
  translations: any = null;
  driver: any


  constructor(
    private formBuilder: FormBuilder,
    private stepperService: StepperService,
    private _snackBar: MatSnackBar,
    private notificationService: NotificationService,
    private driverService: DriverService,
    private activatedRoute: ActivatedRoute,
    private router: Router

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
    this.getNationalities();
      //recuperation du stepper actif en fonction
      this.driver= JSON.parse(localStorage.getItem("driver")) ;
      if (!this.driver) {
        this.currentStepper = 0;
      }
      else {
        this.currentStepper =  this.driver.value;
        this.initStepper = this.driver;
      }

    this.initStep1();
    this.initStep2();
    this.initStep3();
    this.initStep4();
  }
  //initialisation des formulaires
  initStep1() {
    this.step1Form = this.formBuilder.group(
      {
        nom: ['', Validators.required],
        prenom: ['', [Validators.required]],
        date_naissance: ['', [Validators.required]],
        lieu_naissance: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        adresse: ['', [Validators.required]],
        telephone1: ['', [Validators.required]],
        telephone2: '',
        avatar: ['', [Validators.required]],
        nationality_id: ['', [Validators.required]],


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

    const formDataStep: FormData = new FormData();
    formDataStep.append("value", '' + 1);
    formDataStep.append("status", '' + 0);
    formDataStep.append("stepper_main_id", '' + 1);
    this.stepperService.add(formDataStep).then(
      (Response) => {
        console.log(Response)
        this.initStepper = Response;
        //sauvegarde dans le local storage
        this.stepperService.storeStepper(Response)
        //recuperation des champs du stepper 1
        const formData: FormData = new FormData();
        formData.append("first_name", '' + this.InfoGenerale.nom.value);
        formData.append("last_name", '' + this.InfoGenerale.prenom.value);
        formData.append("date_birth", '' + this.InfoGenerale.date_naissance.value);
        formData.append("place_birth", '' + this.InfoGenerale.lieu_naissance.value);
        formData.append("email", '' + this.InfoGenerale.email.value);
        formData.append("tel1", '' + this.InfoGenerale.telephone1.value);
        formData.append("tel2", '' + this.InfoGenerale.telephone2.value);
        formData.append("address", '' + this.InfoGenerale.adresse.value);
        formData.append("tel2", '' + this.InfoGenerale.telephone1.value);
        const file: File = null
        formData.append("avatar", this.fileAvatar);
        formData.append("stepper_id", '' + this.initStepper.id);
        formData.append("nationality_id", '' + this.InfoGenerale.nationality_id.value);

        //ajout des infos generales de utilisateurs

        this.driverService.add(formData).then(
          (Response) => {
            console.log(Response)
            //sauvegarde dans le local storage
            this.openSnackBar("Ajout Reussi", "Etape 1")
            console.log("stepper 1 termine");

          },
          (error) => {
            console.log(error)
          })
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
    formData.append("stepper_id", '' + this.initStepper.id);
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
    formData.append("stepper_id", '' + this.initStepper.id);
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
    console.log(this.file)
    formData.append("file", this.file);

    // on recupere le stepper id
    formData.append("stepper_id", '' + this.initStepper.id);
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
    localStorage.clear()


  }
  createStepper() {
    const formData: FormData = new FormData();
    formData.append("value", '' + 1);
    formData.append("status", '' + 0);
    formData.append("stepper_main_id", '' + 1);
    this.stepperService.add(formData).then(
      (Response) => {
        console.log(Response)
        this.initStepper = Response;
        //sauvegarde dans le local storage
        this.stepperService.storeStepper(Response)
      },
      (error) => {
        console.log(error)
      },

    )

  }
  updateStepper() {
    const formData: FormData = new FormData();
    let number;
    let value;
    if(!this.driver){
       number = this.stepperService.getNumber();
       value = +this.stepperService.getValue()
    }
    else{
       number = this.driver.number;
       value = +this.driver.value
    }
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
    if(value == 3){
      formData.append("status", '' + 1);
      console.log("voici le status 1")
      formData.append("value", '' + value);

    }
    else{
      formData.append("status", '' + 0);
      console.log("voici le status 0")
      const new_value = value + 1;
      formData.append("value", '' + new_value);
    } 
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

  getNationalities() {
    this.driverService.getNationalities().then((response) => {
      this.nationalities = response;
      console.log(this.nationalities);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  //reinitialisation
  reset() {
    localStorage.clear()
    this.router.navigate(['/private/superadmins/driver-all']);

  }

}


