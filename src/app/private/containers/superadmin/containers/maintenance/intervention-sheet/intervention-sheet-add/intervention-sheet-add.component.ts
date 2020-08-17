import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-intervention-sheet-add',
  templateUrl: './intervention-sheet-add.component.html',
  styleUrls: ['./intervention-sheet-add.component.scss']
})
export class InterventionSheetAddComponent implements OnInit {
  url: any
  myformGroup: FormGroup
  cargaisons: any[] = []
  isSubmitted: any
  isLoading: any
  cars: any;
  drivers: any;
  gamme_interventions: any
  gamme_interv: any; organe: any; intervenant: any; cout_main_ouvre: any; fait: any; duree: any;
  constructor(
    private formBuilder: FormBuilder,
    private myService: MyCrudService,
    private notificationService: NotificationService,
    private translate: TranslateService,

  ) { }

  ngOnInit(): void {
    this.url = "/modulemaintenance/file-intervention";
    this.initForm();
    this.getCars();
    this.getDrivers();
    this.getGamme_interventions();
  }


  //methode qui se charge de enregistrement
  initForm() {
    this.myformGroup = this.formBuilder.group(
      {
        num_fiche: ['', Validators.required],
        car_id: ['', Validators.required],
        index: ['', Validators.required],
        degre_urgen: ['', Validators.required],
        date_demande: ['', Validators.required],
        date_intervention: ['', Validators.required],
        type_intervention: ['', Validators.required],
        observations: ['', Validators.required],
        date_debut: ['', Validators.required],
        heure_debut: ['', Validators.required],
        temps_reel: ['', Validators.required],
        date_fin: ['', Validators.required],
        heure_fin: ['', Validators.required],
        temps_indispo: ['', Validators.required],
      }
    )
  }
  get form() {
    return this.myformGroup.controls;
  }

  //enregistrement dans la base de donnee

  add() {
    //verification du formulaire
    if (this.myformGroup.invalid) {
      this.translate.get('verifier vos champs')
        .subscribe(val => this.notificationService.warning(val));
      return;
    }
    if (this.cargaisons.length === 0) {
      this.translate.get('aucune cargaison enregistrée')
        .subscribe(val => this.notificationService.warning(val));
      return;
    }

    const formData = new FormData();
    formData.append('card_number', this.form.num_fiche.value);
    formData.append('car_id', this.form.car_id.value);
    formData.append('index', this.form.index.value)
    formData.append('degree_urgency', this.form.degre_urgen.value)
    formData.append('date_application', this.form.date_demande.value)
    formData.append('service_date', this.form.date_intervention.value)
    formData.append('type_intervention', this.form.type_intervention.value)
    formData.append('observation', this.form.observations.value)
    formData.append('commencement_date', this.form.date_debut.value)
    formData.append('starting_time', this.form.heure_debut.value)
    formData.append('allocated_real_time', this.form.temps_reel.value)
    formData.append('termination_date', this.form.date_fin.value)
    formData.append('end_time', this.form.heure_fin.value)
    formData.append('down_time', this.form.temps_indispo.value)
 
    console.log(this.form.num_fiche.value)
    console.log(this.form.car_id.value)
    console.log(this.form.index.value)
    console.log(this.form.degre_urgen.value)
    console.log(this.form.date_demande.value)
    console.log(this.form.date_intervention.value)
    console.log(this.form.type_intervention.value)
    console.log(this.form.observations.value)
    console.log(this.form.date_debut.value)
    console.log(this.form.temps_reel.value)
    console.log(this.form.date_fin.value)
    console.log(this.form.heure_fin.value)
    console.log(this.form.temps_indispo.value)

    console.log(this.cargaisons)
    this.myService.post(formData, this.url)
      .then(resp => {
        console.log("ordcerm mission")
        console.log(resp)
        this.isSubmitted = false;
        console.log(resp)
        this.cargaisons.forEach(cargaison => {
          cargaison.file_id = resp.id;
          this.myService.post(cargaison, "/modulemaintenance/intervention")
            .then(resp => {

            }
            )
            .catch()
        }
        );
        this.translate.get('enregistrement de ordre de mission réussie')
          .subscribe(val => this.notificationService.success(val));
        this.myformGroup.reset();
        this.cargaisons = []
      })
      .catch(error => {
        console.log(error);

      })
      .finally(() => this.isLoading = false)
  }

  //recuperation de tous les vehicules
  getCars() {
    this.myService.get("/module3/caractere_tech_ones/car").then((res) => {
      this.cars = res;
      console.log(this.cars)
    }, (error) => {
      this.notificationService.warning("Aucun vehicule disponible");
    });
  }
  //recuperation de tous les vehicules
  getDrivers() {
    this.myService.get("/module2/general_informations/allWithName").then((res) => {
      this.drivers = res.data;
      console.log(this.drivers)
    }, (error) => {
      this.notificationService.warning("Aucun chauffeur disponible");
    });
  }
  //recuperation de tous les gamme_interventions
  getGamme_interventions() {
    this.myService.get("/modulemaintenance/range-action").then((res) => {
      this.gamme_interventions = res.data;
      console.log(this.gamme_interventions)
    }, (error) => {
      this.notificationService.warning("Aucun client disponible");
    });
  }
  //
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  //recuperation de la remorque du vehicule
  getRemorque(event) {
    console.log(event)
    console.log("bonjour")
  }
  addCargaison() {
    const cargaison = {
      "file_id": '',
      'range_id': this.gamme_interv,
      'organ': this.organe,
      'speaker': this.intervenant,
      'cost_maintenance': this.cout_main_ouvre,
      'does': this.fait,
      'duration': this.duree,
    };
    this.cargaisons.push(cargaison)
    this.vider()
  }
  deleteCargaison(id) {
    this.cargaisons.splice(id, 1);
  }
  vider() {
    this.gamme_interv = '';
    this.organe = '';
    this.intervenant = '';
    this.cout_main_ouvre = '';
    this.fait = '';
    this.duree = '';
  }

}
