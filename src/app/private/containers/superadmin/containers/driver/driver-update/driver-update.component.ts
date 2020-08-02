import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper/stepper.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material';
import { DriverService } from '../../../services/driver.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-driver-update',
  templateUrl: './driver-update.component.html',
  styleUrls: ['./driver-update.component.scss']
})
export class DriverUpdateComponent implements OnInit {

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

  //on bloque le steppper
  isoptionalStep1: boolean;
  isoptionalStep2: boolean
  isoptionalStep3: boolean
  isoptionalStep4: boolean
  //mes infos sur le chauffeur
  driver_stepper_id: any;
  drivers: any = null;
  permit: any = null;
  docIndentite: any = null;
  nationalite: any;
  formation: any = null;
  members: any;
  imagePath: any;
  constructor(
    private formBuilder: FormBuilder,
    private stepperService: StepperService,
    private _snackBar: MatSnackBar,
    private driverService: DriverService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private translate: TranslateService,
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
    this.initStep4();
    const driver_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.driver_stepper_id = driver_id;
    this.driverService.getPermis(driver_id).then(
      data => {
        this.permit = data;
        this.initWithDataStep2()
        console.log(this.permit)
      }
    ).catch(
      error => {
        this.translate.get("aucun permis enregistre")
          .subscribe(val => this.notificationService.warning(val));

      }
    )

    this.driverService.findGeneralInfo(driver_id).then(
      data => {
        this.drivers = data;
        this.initWithDataStep1()
        console.log(this.drivers)
      }
    ).catch(
      error => {
        this.translate.get("aucune information principale enregistrees")
          .subscribe(val => this.notificationService.warning(val));

      }
    )

    this.driverService.getFormations(driver_id).then(
      data => {
        this.formation = data;
        this.initWithDataStep4()
        console.log(this.formation)
      }
    ).catch(
      error => {
        this.translate.get("aucune formation enregistrée")
          .subscribe(val => this.notificationService.warning(val));

      }
    )


    this.driverService.getDocInfos(driver_id).then(
      data => {
        this.docIndentite = data;
        this.initWithDataStep3()
        console.log(this.docIndentite)
      }
    ).catch(
      error => {
        this.translate.get("aucun document identite")
          .subscribe(val => this.notificationService.warning(val));

      }
    )

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


      }
    )
  }
  initWithDataStep1() {
    this.step1Form = this.formBuilder.group(
      {
        nom: [this.drivers.first_name, [Validators.required]],
        prenom: [this.drivers.last_name, [Validators.required]],
        date_naissance: [this.drivers.date_birth, [Validators.required]],
        lieu_naissance: [this.drivers.place_birth, [Validators.required]],
        email: [this.drivers.email, [Validators.required, Validators.email]],
        adresse: [this.drivers.address, [Validators.required]],
        telephone1: [this.drivers.tel, [Validators.required]],
        telephone2: this.drivers.tel2,
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

  initWithDataStep2() {
    this.step2Form = this.formBuilder.group(
      {
        num_permis: [this.permit.number, [Validators.required]],
        date_delivrance: [this.permit.date_issue, [Validators.required]],
        lieu_delivrance: [this.permit.place_issue, [Validators.required]],
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
  initWithDataStep3() {
    this.step3Form = this.formBuilder.group(
      {
        piece_identite: [this.docIndentite.identical_piece, [Validators.required]],
        num_piece: [this.docIndentite.piece_number, [Validators.required]],
        date_delivrance: [this.docIndentite.date_issue, [Validators.required]],
        lieu_delivrance: [this.docIndentite.place_issue, [Validators.required]],
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
  initWithDataStep4() {
    this.step4Form = this.formBuilder.group(
      {
        name_formation: [this.formation.name, [Validators.required]],
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
    formData.append("tel1", '' + this.InfoGenerale.telephone1.value);
    formData.append("tel2", '' + this.InfoGenerale.telephone2.value);
    formData.append("address", '' + this.InfoGenerale.adresse.value);
    formData.append("tel2", '' + this.InfoGenerale.telephone1.value);
    const file: File = null
    formData.append("avatar", this.fileAvatar);
    formData.append("nationality_id", '' + 1);

    //ajout des infos generales de utilisateurs
    if (this.drivers == null) {
      formData.append("stepper_id", '' + this.driver_stepper_id);
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

    }
    else {
      this.driverService.updateInformation(formData, this.driver_stepper_id).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("modification réussie avec succes", "Etape 1")
          console.log("stepper 1 termine");

        },
        (error) => {
          console.log(error)
        })
    }
  }
  addStep2() {
    //recuperation des champs du stepper 2
    const formData: FormData = new FormData();
    formData.append("number", '' + this.drivingPermit.num_permis.value);
    formData.append("date_issue", '' + this.drivingPermit.date_delivrance.value);
    formData.append("place_issue", '' + this.drivingPermit.lieu_delivrance.value);
    //ajout des infos generales de utilisateurs
    if (this.permit == null) {

      formData.append("stepper_id", '' + this.driver_stepper_id);
      //ajout des infos generales de utilisateurs
      this.driverService.addPermis(formData).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("Ajout Reussi", "Etape 2")
          console.log("stepper 2 termine");
        },
        (error) => {
          console.log(error)
        },

      )
    }
    else {
      this.driverService.updatePermis(formData, this.driver_stepper_id).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("modification réussie avec succes", "Etape 2")
          console.log("stepper 2 termine");
        },
        (error) => {
          console.log(error)
        },

      )
    }
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
    if (this.docIndentite == null) {
      formData.append("stepper_id", '' + this.driver_stepper_id);
      this.driverService.addPiece(formData).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("Ajout Reussi", "Etape 1")
          console.log("stepper 2 termine");
        },
        (error) => {
          console.log(error)
        },

      )
    }
    else {
      //ajout des infos document identite
      this.driverService.updatePiece(formData, this.driver_stepper_id).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("modification réussie avec succes", "Etape 3")
          console.log("stepper 2 termine");
        },
        (error) => {
          console.log(error)
        },

      )
    }


  }
  addStep4() {
    //recuperation des champs du stepper 3
    const formData: FormData = new FormData();
    formData.append("name", '' + this.Formation.name_formation.value);
    console.log(this.file)
    formData.append("file", this.file);

    if (this.formation == null) {
      formData.append("stepper_id", '' + this.driver_stepper_id);
      this.driverService.addFormations(formData).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("Ajout Reussi", "Etape 1")
          console.log("stepper 4 termine");
        },
        (error) => {
          console.log(error)
        }
      )
    }
    else {
      //ajout des infos generales de utilisateurs
      this.driverService.updateFormations(formData, this.driver_stepper_id).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("modification réussie avec succes", "Etape 4")
          console.log("stepper 4 termine");
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
  //reinitialisation
  reset() {
    this.stepperService.removeTokens();
    this.router.navigate(['/private/superadmins/driver-all']);

  }


}
