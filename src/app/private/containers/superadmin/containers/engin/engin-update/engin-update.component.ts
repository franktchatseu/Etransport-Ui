import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EnginService } from '../../../services/engin.service';

import Swal from 'sweetalert2';
import { StepperEnginService } from 'src/app/services/stepper/stepper_engin.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-engin-update',
  templateUrl: './engin-update.component.html',
  styleUrls: ['./engin-update.component.scss']
})
export class EnginUpdateComponent implements OnInit {

  types: any = null;
  marks: any = null;
  models: any = null;
  carosseries: any = null;
  translations: any = null;

  @ViewChild('fileInput1')
  fileInput1: ElementRef;
  @ViewChild('fileInput2')
  fileInput2: ElementRef;
  @ViewChild('fileInput3')
  fileInput3: ElementRef;
  @ViewChild('fileInput4')
  fileInput4: ElementRef;
  @ViewChild('fileInput5')
  fileInput5: ElementRef;
  @ViewChild('fileInput6')
  fileInput6: ElementRef;
  //les differentes photos
  file1: any;
  file2: any;
  file3: any;
  file4: any;
  file5: any;
  file6: any;
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
  step5Form: FormGroup;
  stepperApi: any;
  picker: any;

  engin_stepper_id: any
  //recuperation de tous les elements de engin
  caractere1: any;
  caractere2: any;
  description: any;
  cardPaper: any;
  picture: any;
  constructor(
    private formBuilder: FormBuilder,
    private stepperService: StepperEnginService,
    private _snackBar: MatSnackBar,
    private enginService: EnginService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService,

  ) { }

  onSelectFile1(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file1 = event.target.files[0];
      this.step5Form.get('avant_engin').setValue(this.file1.name);
      this.fileInformation = null;
    }
  }
  onSelectFile2(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file2 = event.target.files[0];
      this.step5Form.get('arriere_engin').setValue(this.file2.name);
    }
  }
  onSelectFile3(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file3 = event.target.files[0];
      this.step5Form.get('gauche_engin').setValue(this.file3.name);
      this.fileInformation = null;
    }
  }
  onSelectFile4(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file4 = event.target.files[0];
      this.step5Form.get('droit_engin').setValue(this.file4.name);
      this.fileInformation = null;
    }
  }
  onSelectFile5(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file5 = event.target.files[0];
      this.step5Form.get('insurance_patente').setValue(this.file5.name);
      this.fileInformation = null;
    }
  }
  onSelectFile6(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file6 = event.target.files[0];
      this.step5Form.get('grey_card').setValue(this.file6.name);
      this.fileInformation = null;
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
  selectFile5(): void {
    this.fileInput5.nativeElement.click();
  }
  selectFile6(): void {
    this.fileInput6.nativeElement.click();
  }


  ngOnInit(): void {
    this.getCarosseries();
    this.getMarks();
    this.getModels();
    this.getTypes();
    this.initStep1();
    this.initStep2();
    this.initStep3();
    this.initStep4();
    this.initStep5()

    const engin_step_id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.engin_stepper_id = engin_step_id;
    //recuperation
    this.enginService.findCaractere1(this.engin_stepper_id).then(
      data => {
        this.caractere1 = data;
        this.initWithDataStep1()
        console.log(this.caractere1)
      }
    ).catch(
      error => {
        this.translate.get("aucun information sur le premier caractere technique enregistree")
          .subscribe(val => this.notificationService.warning(val));

      }
    )

    this.enginService.getCaractere2(this.engin_stepper_id).then(
      data => {
        this.caractere2 = data;
        this.initWithDataStep2()
        console.log(this.caractere2)
      }
    ).catch(
      error => {
        this.translate.get("aucun information sur le deuxiemecaractere technique enregistree")
          .subscribe(val => this.notificationService.warning(val));

      }
    )

    this.enginService.getDescription(this.engin_stepper_id).then(
      data => {
        this.description = data;
        this.initWithDataStep3()
        console.log(this.description)
      }
    ).catch(
      error => {
        this.translate.get("aucun information sur la description enregistree")
          .subscribe(val => this.notificationService.warning(val));

      }
    )

    this.enginService.getCarpapers(this.engin_stepper_id).then(
      data => {
        this.cardPaper = data;
        this.initWithDataStep4()
        console.log(this.cardPaper)
      }
    ).catch(
      error => {
        this.translate.get("aucun information sur le papier du vehicule enregistree")
          .subscribe(val => this.notificationService.warning(val));

      }
    )

    this.enginService.getPicture(this.engin_stepper_id).then(
      data => {
        this.picture = data;
        this.initWithDataStep5()
        console.log(this.picture)
      }
    ).catch(
      error => {
        this.translate.get("aucune photo enregistree")
          .subscribe(val => this.notificationService.warning(val));

      }
    )

  }
  //initialisation des formulaires
  initStep1() {
    this.step1Form = this.formBuilder.group(
      {
        registration: ['', [Validators.required]],
        country_registration: ['', [Validators.required]],
        marque: ['', [Validators.required]],
        modele: ['', [Validators.required]],
        type: ['', [Validators.required]],
        carosserie: ['', [Validators.required]],
        longueur: ['', [Validators.required]],
        largeur: ['', [Validators.required]],
        hauteur: ['', [Validators.required]],
        chassis_number: ['', [Validators.required]],
        pv: ['', [Validators.required]],
        charge_utile: ['', [Validators.required]],
        ptc: ['', [Validators.required]],
        power: ['', [Validators.required]],
        volume: ['', [Validators.required]],
      }
    )
  }
  initWithDataStep1() {
    this.step1Form = this.formBuilder.group(
      {
        registration: [this.caractere1.registration, [Validators.required]],
        country_registration: [this.caractere1.country_registration, [Validators.required]],
        marque: [this.caractere1.mark_id, [Validators.required]],
        modele: [this.caractere1.model_id, [Validators.required]],
        type: [this.caractere1.type_id, [Validators.required]],
        carosserie: [this.caractere1.carosserie_id, [Validators.required]],
        longueur: [this.caractere1.length, [Validators.required]],
        largeur: [this.caractere1.width, [Validators.required]],
        hauteur: [this.caractere1.height, [Validators.required]],
        chassis_number: [this.caractere1.chassis_number, [Validators.required]],
        pv: [this.caractere1.total_weight, [Validators.required]],
        charge_utile: [this.caractere1.live_load, [Validators.required]],
        ptc: [this.caractere1.empty_weight, [Validators.required]],
        power: [this.caractere1.power, [Validators.required]],
        volume: [this.caractere1.volume, [Validators.required]],
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

  initWithDataStep2() {
    this.step2Form = this.formBuilder.group(
      {
        semi_remorq: [this.caractere2.semi_trailer_number, [Validators.required]],
        tracteur_porteur: [this.caractere2.essieux_tracteur_porteur_number, [Validators.required]],
        nbr_place: [this.caractere2.place_nber, [Validators.required]],
        code_interne: [this.caractere2.interne_code, [Validators.required]],
        date_circulation: [this.caractere2.effective_date, [Validators.required]],
        carburant: [this.caractere2.fuel, [Validators.required]],
        couleur: [this.caractere2.color, [Validators.required]],
        option: [this.caractere2.option, [Validators.required]],
        valeur_achat: [this.caractere2.purchase_value, [Validators.required]],
        kilometrage: [this.caractere2.kilometrage, [Validators.required]],
        conso_min: [this.caractere2.consommation_min, [Validators.required]],
        conso_max: [this.caractere2.consommation_max, [Validators.required]],
        etat: [this.caractere2.etat, [Validators.required]],
      }
    )
  }
  //initialisation des formulaires
  initStep3() {
    this.step3Form = this.formBuilder.group(
      {
        jour_taf: ['', [Validators.required]],
        temps_taf: ['', [Validators.required]],
        equipement: ['', [Validators.required]],
        usage: ['', [Validators.required]],
        localisation: ['', [Validators.required]],
        observation: ['', [Validators.required]],
        proprietaire: ['', [Validators.required]],

      }
    )
  }

  initWithDataStep3() {
    this.step3Form = this.formBuilder.group(
      {
        jour_taf: [this.description.required_workday, [Validators.required]],
        temps_taf: [this.description.time_required, [Validators.required]],
        equipement: [this.description.equipment, [Validators.required]],
        usage: [this.description.usage, [Validators.required]],
        localisation: [this.description.usual_location, [Validators.required]],
        observation: [this.description.observation, [Validators.required]],
        proprietaire: [this.description.owner, [Validators.required]],

      }
    )
  }
  initStep4() {
    this.step4Form = this.formBuilder.group(
      {
        //remarque: tous ces attributs sont des dates
        validite_patente: ['', [Validators.required]],
        validite_assurance: ['', [Validators.required]],
        validite_visite: ['', [Validators.required]]
      }
    )
  }

  initWithDataStep4() {
    this.step4Form = this.formBuilder.group(
      {
        //remarque: tous ces attributs sont des dates
        validite_patente: [this.cardPaper.patent_validation, [Validators.required]],
        validite_assurance: [this.cardPaper.insurance_validation_date, [Validators.required]],
        validite_visite: [this.cardPaper.technical_visit_date, [Validators.required]]
      }
    )
  }

  initStep5() {
    this.step5Form = this.formBuilder.group(
      {
        //remarque: tous ces attributs sont des dates
        avant_engin: ['', [Validators.required]],
        arriere_engin: ['', [Validators.required]],
        gauche_engin: ['', [Validators.required]],
        droit_engin: ['', [Validators.required]],
        insurance_patente: ['', [Validators.required]],
        grey_card: ['', [Validators.required]]
      }
    )
  }

  initWithDataStep5() {
    this.step5Form = this.formBuilder.group(
      {
        //remarque: tous ces attributs sont des dates
        avant_engin: [this.picture.fore_gear, [Validators.required]],
        arriere_engin: [this.picture.rear_gear, [Validators.required]],
        gauche_engin: [this.picture.left_side_gear, [Validators.required]],
        droit_engin: [this.picture.right_side_gear, [Validators.required]],
        insurance_patente: [this.picture.insurance_patente, [Validators.required]],
        grey_card: [this.picture.grey_card, [Validators.required]]
      }
    )
  }

  get CaracTech1() {
    return this.step1Form.controls;
  }
  get CaracTech2() {
    return this.step2Form.controls;
  }
  get Description() {
    return this.step3Form.controls;
  }
  get PapierVehicule() {
    return this.step4Form.controls;
  }
  get Photos() {
    return this.step5Form.controls;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  addStep1() {

    //recuperation des champs du stepper 1
    const formData: FormData = new FormData();
    formData.append("registration", '' + this.CaracTech1.registration.value);
    formData.append("country_registration", '' + this.CaracTech1.country_registration.value);
    formData.append("mark_id", '' + this.CaracTech1.marque.value);
    formData.append("model_id", '' + this.CaracTech1.modele.value);
    formData.append("type_id", '' + this.CaracTech1.type.value);
    formData.append("carosserie_id", '' + this.CaracTech1.carosserie.value);
    formData.append("length", '' + this.CaracTech1.longueur.value);
    formData.append("width", '' + this.CaracTech1.largeur.value);
    formData.append("height", '' + this.CaracTech1.hauteur.value);
    formData.append("chassis_number", '' + this.CaracTech1.chassis_number.value);
    formData.append("power", this.CaracTech1.power.value);
    formData.append("empty_weight", '' + this.CaracTech1.pv.value);
    formData.append("live_load", '' + this.CaracTech1.charge_utile.value);
    formData.append("total_weight", '' + this.CaracTech1.ptc.value);
    formData.append("volume", this.CaracTech1.volume.value);
    //ajout des infos generales de utilisateurs

    if (this.caractere1 == null) {
      formData.append("stepper_id", '' + this.engin_stepper_id);
      this.enginService.addCaract1(formData).then(
        (Response) => {
          this.openSnackBar("nouvelle sauvegarde", "Etape 1")
          console.log("stepper 1 termine");
        },
        (error) => {
          console.log(error)
        })
    }
    else {
      this.enginService.updateCaractere1(formData, this.engin_stepper_id).then(
        (Response) => {
          //sauvegarde dans le local storage
          this.openSnackBar("Modification Reussi", "Etape 1")
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
    formData.append("semi_trailer_number", this.CaracTech2.semi_remorq.value);
    formData.append("essieux_tracteur_porteur_number", this.CaracTech2.tracteur_porteur.value);
    formData.append("place_nber", this.CaracTech2.nbr_place.value);
    formData.append("interne_code", this.CaracTech2.code_interne.value);
    formData.append("effective_date", this.CaracTech2.date_circulation.value);
    formData.append("fuel", this.CaracTech2.carburant.value);
    formData.append("color", this.CaracTech2.couleur.value);
    formData.append("option", this.CaracTech2.option.value);
    formData.append("purchase_value", this.CaracTech2.valeur_achat.value);
    formData.append("kilometrage", this.CaracTech2.kilometrage.value);
    formData.append("consommation_min", this.CaracTech2.conso_min.value);
    formData.append("consommation_max", this.CaracTech2.conso_max.value);
    formData.append("etat", this.CaracTech2.etat.value);

    if (this.caractere2 == null) {
      formData.append("stepper_id", '' + this.engin_stepper_id);
      this.enginService.addCaract2(formData).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("nouvelle sauvegarde", "Etape 2")
          console.log("stepper 2 termine");
        },
        (error) => {
          console.log(error)
        },
      )
    }
    else {
      //ajout des infos generales de utilisateurs
      this.enginService.updateCaractere2(formData,this.engin_stepper_id).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("modification Reussi", "Etape 2")
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
    formData.append("required_workday", '' + this.Description.jour_taf.value);
    formData.append("time_required", '' + this.Description.temps_taf.value);
    formData.append("equipment", '' + this.Description.equipement.value);
    formData.append("usage", '' + this.Description.usage.value);
    formData.append("usual_location", '' + this.Description.localisation.value);
    formData.append("observation", '' + this.Description.observation.value);
    formData.append("owner", '' + this.Description.proprietaire.value);

    if (this.description == null) {
      formData.append("stepper_id", '' + this.engin_stepper_id);
      this.enginService.addDescription(formData).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("nouvelle sauvegarde", "Etape 3")
          console.log("stepper 3 termine");
        },
        (error) => {
          console.log(error)
        },
  
      )
    }
    else {
      this.enginService.updateDescription(formData,this.engin_stepper_id).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("modification Reussi", "Etape 3")
          console.log("stepper 3 termine");
        },
        (error) => {
          console.log(error)
        },
  
      )
    }
   

  }
  addStep4() {
    //recuperation des champs du stepper 4
    const formData: FormData = new FormData();
    formData.append("patent_validation", '' + this.PapierVehicule.validite_patente.value);
    formData.append("insurance_validation_date", '' + this.PapierVehicule.validite_assurance.value);
    formData.append("technical_visit_date", '' + this.PapierVehicule.validite_visite.value);

   if(this.cardPaper == null){
    formData.append("stepper_id", '' + this.engin_stepper_id);
    this.enginService.addCarpapers(formData).then(
      (Response) => {
        console.log(Response)
        //sauvegarde dans le local storage
        this.openSnackBar("nouvelle sauvegarde", "Etape 4")
        console.log("stepper 4 termine");
      },
      (error) => {
        console.log(error)
      }
    )
   }
   else{
    this.enginService.updateCarPaper(formData,this.engin_stepper_id).then(
      (Response) => {
        console.log(Response)
        //sauvegarde dans le local storage
        this.openSnackBar("modification Reussi", "Etape 4")
        console.log("stepper 4 termine");
      },
      (error) => {
        console.log(error)
      }
    )
   }

  }

  addStep5() {
    //recuperation des champs du stepper 4
    console.log(this.file1)
    console.log(this.file2)
    console.log(this.file3)
    console.log(this.file4)
    console.log(this.file5)
    const formData: FormData = new FormData();
    formData.append("fore_gear", this.file1);
    formData.append("rear_gear", this.file2);
    formData.append("left_side_gear", this.file3);
    formData.append("right_side_gear", this.file4);
    formData.append("insurance_patente", this.file4);
    formData.append("grey_card", this.file5);

    if(this.picture == null){
      formData.append("stepper_id", '' + this.engin_stepper_id);
      this.enginService.addPhotos(formData).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("nouvelle sauvegarde", "Etape 4")
          console.log("stepper 4 termine");
        },
        (error) => {
          console.log(error)
        }
      )
    }
    else{
      this.enginService.updatePicture(formData,this.engin_stepper_id).then(
        (Response) => {
          console.log(Response)
          //sauvegarde dans le local storage
          this.openSnackBar("modification Reussi", "Etape 5")
          console.log("stepper 5 termine");
        },
        (error) => {
          console.log(error)
        }
      )
    }


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

  getTypes() {
    this.enginService.getTypes().then((response) => {
      this.types = response;
      console.log(this.types);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  getModels() {
    this.enginService.getModels().then((response) => {
      this.models = response;
      console.log(this.models);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  getMarks() {
    this.enginService.getMarks().then((response) => {
      this.marks = response;
      console.log(this.marks);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  getCarosseries() {
    this.enginService.getCarosseries().then((response) => {
      this.carosseries = response;
      console.log(this.carosseries);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }
}
