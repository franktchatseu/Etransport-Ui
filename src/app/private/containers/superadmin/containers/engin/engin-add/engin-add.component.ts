import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../../../services/notification.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DriverService } from '../../../services/driver.service';
import { Lang } from '../../../../../../services/config/lang';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { InternationalizationService } from '../../../../../../services/features/internationalization.service';
import Swal from 'sweetalert2';
import { StepperService } from 'src/app/services/stepper/stepper.service';

@Component({
  selector: 'app-engin-add',
  templateUrl: './engin-add.component.html',
  styleUrls: ['./engin-add.component.scss']
})
export class EnginAddComponent implements OnInit {

 

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
    private stepperService: StepperService,
    private _snackBar: MatSnackBar,
    private driverService: DriverService,
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
        registration:  ['', [Validators.required]],
        country_registration	: ['', [Validators.required]],
        marque: ['', [Validators.required]],
        modele: ['', [Validators.required]],
        type: ['', [Validators.required]],
        carosserie: ['', [Validators.required]],
        longueur: ['', [Validators.required]],
        largeur: ['', [Validators.required]],
        hauteur: ['', [Validators.required]],
        chassis_number: ['', [Validators.required]],
        power: ['', [Validators.required]],
        pv: ['', [Validators.required]],
        charge_utile: ['', [Validators.required]],
        ptc: ['', [Validators.required]],
        volume: ['', [Validators.required]],
      }
    )
  }
  //initialisation des formulaires
  initStep2() {
    this.step2Form = this.formBuilder.group(
      {
        semi_remorq: ['', [Validators.required]],
        tracteur_porteur: ['', [Validators.required]],
        nbr_place: ['', [Validators.required]],
        code_interne: ['', [Validators.required]],
        date_circulation: ['', [Validators.required]],
        carburant: ['', [Validators.required]],
        couleur: ['', [Validators.required]],
        option: ['', [Validators.required]],
        valeur_achat: ['', [Validators.required]],
        kilometrage: ['', [Validators.required]],
        conso_min: ['', [Validators.required]],
        conso_max: ['', [Validators.required]],
        etat: ['', [Validators.required]],
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
  get CaracTech1() {
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
        formData.append("registration", '' + this.CaracTech1.registration.value);
        formData.append("country_registration	", '' + this.CaracTech1.country_registration	.value);
        formData.append("mark_id", '' + this.CaracTech1.marque.value);
        formData.append("model_id", '' + this.CaracTech1.modele.value);
        formData.append("type_id", '' + this.CaracTech1.type.value);
        formData.append("carosserie", '' + this.CaracTech1.carosserie.value);
        formData.append("	length", '' + this.CaracTech1.longueur.value);
        formData.append("	width", '' + this.CaracTech1.largeur.value);
        formData.append("	height", '' + this.CaracTech1.hauteur.value);
        formData.append("	chassis_number", '' + this.CaracTech1.	chassis_number.value);
        formData.append("	power", '' + this.CaracTech1.	power.value);
        formData.append("	empty_weight", '' + this.CaracTech1.pv.value);
        formData.append("load_live", '' + this.CaracTech1.charge_utile.value);
        formData.append("	total_weight", '' + this.CaracTech1.ptc.value);
        formData.append("volume", '' + this.CaracTech1.volume.value);
        formData.append("stepper_id", '' + this.initStepper.id);
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
    formData.append("	semi_trailer_number",  this.drivingPermit.semi_remorq.value);
    formData.append("essieux_tracteur_porteur_number",  this.drivingPermit.tracteur_porteur.value);
    formData.append("place_nber",  this.drivingPermit.nbr_place.value);
    formData.append("interne_code	",  this.drivingPermit.code_interne.value);
    formData.append("effective_date",  this.drivingPermit.date_circulation.value);
    formData.append("fuel",  this.drivingPermit.carburant.value);
    formData.append("color",  this.drivingPermit.couleur.value);
    formData.append("option",  this.drivingPermit.option.value);
    formData.append("purchase_value",  this.drivingPermit.valeur_achat.value);
    formData.append("kilometrage",  this.drivingPermit.kilometrage.value);
    formData.append("consommation_min",  this.drivingPermit.conso_min.value);
    formData.append("consommation_max",  this.drivingPermit.conso_max.value);
    formData.append("etat",  this.drivingPermit.etat.value);


    formData.append("	length", '' + this.drivingPermit.taille.value);
    formData.append("place_issue", '' + this.drivingPermit.lieu_delivrance.value);
    // on recupere le stepper id
    const sept_id = this.stepperService.getStepperId()
    console.log(sept_id)
    formData.append("stepper_id", '' + sept_id);

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
    const sept_id = this.stepperService.getStepperId()
    formData.append("stepper_id", '' + sept_id);

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
