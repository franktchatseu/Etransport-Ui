import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperMainService } from 'src/app/services/stepper/stepper_main.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material';
import { TransporteurService} from '../../../services/transporteur.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transporter-add',
  templateUrl: './transporter-add.component.html',
  styleUrls: ['./transporter-add.component.scss']
})
export class TransporterAddComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput: ElementRef;
  @ViewChild('fileInputAvatar')
  fileInputAvatar: ElementRef;
  file: any
  fileAvatar: any;
  fileInformation: any
  fileInformationAvatar: any

  //initialisation du stepper
  initStepper: any;
  currentStepper: number;
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
  constructor(
    private formBuilder: FormBuilder,
    private stepperService: StepperMainService,
    private _snackBar: MatSnackBar,
    private driverService: TransporteurService,
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

    this.initStep1();
    this.initStep2();
    this.initStep3();
    this.initStep4()

    //recuperation du stepper actif en fonction
    const value = +this.stepperService.getValue();
    if (value == null || value == 0) {
      this.currentStepper = 0;
    }
    else {
      console.log(value)
      const number = this.stepperService.getNumber();
      this.currentStepper = value
    }
    

  }
  //initialisation des formulaires
  initStep1() {
    this.step1Form = this.formBuilder.group(
      {
        nom_entreprise: ['', Validators.required],
        num_contribuable: ['', [Validators.required]],
        num_rccm: ['', [Validators.required]],
        adresse_facturation: ['', [Validators.required]],
        nom_respo: ['', [Validators.required, Validators.email]],
        fonction_resp: ['', [Validators.required]],
        tel_respo: ['', [Validators.required]],
        avatar: ['', [Validators.required]],
        //nbr_engin: ['', [Validators.required]],
       // nbr_chauffeur: ['', [Validators.required]],
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
        formData.append("name", '' + this.InfoGenerale.nom_entreprise.value);
        formData.append("taxpayer_number", '' + this.InfoGenerale.num_contribuable.value);
        formData.append("rccm_number", '' + this.InfoGenerale.num_rccm.value);
        formData.append("billing_address", '' + this.InfoGenerale.adresse_facturation.value);
        formData.append("manager_name", '' + this.InfoGenerale.nom_respo.value);
        formData.append("manager_function", '' + this.InfoGenerale.fonction_resp.value);
        formData.append("manager_phone", '' + this.InfoGenerale.tel_respo.value);
        formData.append("manager_picture", this.fileAvatar);
        formData.append("stepper_main_id", '' + this.initStepper.id);
        formData.append("driver_number", ''+0);
        formData.append("gear_number", '' + 0);

        //ajout des infos generales de utilisateurs

        this.driverService.addInfoGenerale1(formData).then(
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
    const sept_id = this.stepperService.getStepperId()
    console.log(sept_id)
    formData.append("stepper_id", '' + sept_id);

    //ajout des infos generales de utilisateurs
    this.driverService.addInfoGenerale2(formData).then(
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
    const sept_id = this.stepperService.getStepperId()
    formData.append("stepper_id", '' + sept_id);

    //ajout des infos generales de utilisateurs
    this.driverService.addInfoPersonnelle(formData).then(
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
    const sept_id = this.stepperService.getStepperId()
    formData.append("stepper_id", '' + sept_id);

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
  //reinitialisation
  reset() {
    this.stepperService.removeTokens();
    this.router.navigate(['/private/superadmins/driver-all']);

  }
}
