import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperMainService } from 'src/app/services/stepper/stepper_main.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material';
import { TransporteurService} from '../../../services/transporteur.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-transporter-add',
  templateUrl: './transporter-add.component.html',
  styleUrls: ['./transporter-add.component.scss']
})
export class TransporterAddComponent implements OnInit {

  @ViewChild('fileInput1')
  fileInput1: ElementRef;
  @ViewChild('fileInput2')
  fileInput2: ElementRef;
  @ViewChild('fileInput3')
  fileInput3: ElementRef;
  @ViewChild('fileInput4')
  fileInput4: ElementRef;
  @ViewChild('fileInputAvatar')
  fileInputAvatar: ElementRef;
   //les differentes photos
   file1: any;
   file2: any;
   file3: any;
   file4: any;
   file5: any;
   file6: any;
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

  //control
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private stepperService: StepperMainService,
    private _snackBar: MatSnackBar,
    private driverService: TransporteurService,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) { }
  onSelectFile1(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file1 = event.target.files[0];
      this.step2Form.get('image1').setValue(this.file1.name);
      this.fileInformation = null;
    }
  }
  onSelectFile2(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file2 = event.target.files[0];
      this.step2Form.get('image2').setValue(this.file2.name);
    }
  }
  onSelectFile3(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file3 = event.target.files[0];
      this.step2Form.get('image3').setValue(this.file3.name);
      this.fileInformation = null;
    }
  }
  onSelectFile4(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file4 = event.target.files[0];
      this.step2Form.get('image4').setValue(this.file4.name);
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

    //le click sur le button
    selectFile1(): void {
      this.fileInput1.nativeElement.click();
    }
    selectFile2(): void {
      this.fileInput2.nativeElement.click();
    }
    selectFile3(): void {
      this.fileInput3.nativeElement.click();
    }
    selectFile4(): void {
      this.fileInput4.nativeElement.click();
    }

  ngOnInit(): void {

    this.initStep1();
    this.initStep2();

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
        nom_respo: ['', [Validators.required]],
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
        localisation: ['', [Validators.required]],
        telephone1: ['', [Validators.required]],
        telephone2: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
        langue: ['', [Validators.required]],
        description: ['', [Validators.required]],
        mission: ['', [Validators.required]],
        ambition: ['', [Validators.required]],
        heure_ouverture: ['', [Validators.required]],
        partenaire: ['', [Validators.required]],
        valeur: ['', [Validators.required]],
        image1: ['', [Validators.required]],
        image2: ['', [Validators.required]],
        image3: ['', [Validators.required]],
        image4: ['', [Validators.required]],
      }
    )
  }

  get InfoGenerale() {
    return this.step1Form.controls;
  }
  get drivingPermit() {
    return this.step2Form.controls;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  addStep1() {

    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.step1Form.invalid) {
      this.translate.get('verifier vos champs')
        .subscribe(val => this.notificationService.warning(val));
      return;
    }

    this.isLoading = true;
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
            this.currentStepper= 1;

          },
          (error) => {
            console.log(error)
          }) .finally(() => this.isLoading = false);
      },
      (error) => {
        console.log(error)
      },

    )
  }
  addStep2() {
    //recuperation des champs du stepper 2

    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    const formData: FormData = new FormData();
        
    formData.append("localisation", '' + this.drivingPermit.localisation.value);
    formData.append("phone1", '' + this.drivingPermit.telephone1.value);
    formData.append("phone2", '' + this.drivingPermit.telephone2.value);
    formData.append("langue", '' + this.drivingPermit.langue.value);
    formData.append("email", '' + this.drivingPermit.email.value);
    formData.append("description_services", '' + this.drivingPermit.description.value);
    formData.append("enterprise_mission", '' + this.drivingPermit.mission.value);
    formData.append("enterprise_ambition", '' + this.drivingPermit.ambition.value);
    formData.append("opening_hours", '' + this.drivingPermit.heure_ouverture.value);
    formData.append("enterprise_partner", '' + this.drivingPermit.partenaire.value);
    formData.append("enterprise_value", '' + this.drivingPermit.valeur.value);
    formData.append("image", '' + this.drivingPermit.image1.value);
    // on recupere le stepper id
    const sept_id = this.stepperService.getStepperId()
    console.log(sept_id)
    formData.append("stepper_main_id", '' + sept_id);

    //ajout des infos generales de utilisateurs
    this.driverService.addInfoGenerale2(formData).then(
      (Response) => {
        console.log(Response)
        //sauvegarde dans le local storage
        this.openSnackBar("Ajout Reussi", "Etape 2")
        console.log("stepper 2 termine");
        this.currentStepper = 2;
      },
      (error) => {
        console.log(error)
      },

    ).finally(() => this.isLoading = false);

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
    this.router.navigate(['/private/superadmins/transporter/transporter-all']);
  }
}
