import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mission-order-add',
  templateUrl: './mission-order-add.component.html',
  styleUrls: ['./mission-order-add.component.scss']
})
export class MissionOrderAddComponent implements OnInit {
  url: any
  myformGroup: FormGroup
  cargaisons: any[] = []
  isSubmitted: any
  isLoading: any
  cars: any;
  drivers: any;
  clients: any
  client: any; char: any; dechar: any; prod: any; qte: any; bon: any; obs: any
  constructor(
    private formBuilder: FormBuilder,
    private myService: MyCrudService,
    private notificationService: NotificationService,
    private translate: TranslateService,

  ) { }

  ngOnInit(): void {
    this.url = "/modulemouvement/mission-order";
    this.initForm();
    this.getCars();
    this.getDrivers();
    this.getClients();
  }


  //methode qui se charge de enregistrement
  initForm() {
    this.myformGroup = this.formBuilder.group(
      {
        numero: '',
        object: ['', Validators.required],
        num_dossier: ['', Validators.required],
        date_depart: ['', Validators.required],
        heure_depart: ['', Validators.required],
        date_retour: ['', Validators.required],
        heure_retour: ['', Validators.required],
        duree: ['', Validators.required],
        index_depart: ['', Validators.required],
        index_retour: ['', Validators.required],
        parcours_reel: ['', Validators.required],
        parours_theorique: ['', Validators.required],
        car_id: ['', Validators.required],
        carburant: ['', Validators.required],
        remorque: ['', Validators.required],
        retour_usine: ['', Validators.required],
        driver_id: ['', Validators.required],
        convoyer_id: ['', Validators.required],
        depart_of: ['', Validators.required],


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
    formData.append('car_id', this.form.car_id.value);
    formData.append('driver_id', this.form.driver_id.value)
    formData.append('conveyor_id', this.form.convoyer_id.value)
    formData.append('number', this.form.numero.value)
    formData.append('file_number', this.form.num_dossier.value)
    formData.append('subject', this.form.object.value)
    formData.append('date_departure', this.form.date_depart.value)
    formData.append('departure_time', this.form.heure_depart.value)
    formData.append('return_date', this.form.date_retour.value)
    formData.append('return_time', this.form.heure_retour.value)
    formData.append('duration', this.form.duree.value)
    formData.append('start_index', this.form.index_depart.value)
    formData.append('return_index', this.form.index_retour.value)
    formData.append('actual_course', this.form.parcours_reel.value)
    formData.append('theorical_course', this.form.parours_theorique.value)
    formData.append('departure_city', this.form.depart_of.value)
    formData.append('fuel', this.form.carburant.value)


    console.log(this.form.car_id.value)
    console.log(this.form.driver_id.value)
    console.log(this.form.convoyer_id.value)
    console.log(this.form.numero.value)
    console.log(this.form.num_dossier.value)
    console.log(this.form.date_depart.value)
    console.log(this.form.heure_depart.value)
    console.log(this.form.date_retour.value)
    console.log(this.form.heure_retour.value)
    console.log(this.form.duree.value)
    console.log(this.form.index_retour.value)
    console.log(this.form.index_depart.value)
    console.log(this.form.parcours_reel.value)
    console.log(this.form.parours_theorique.value)
    console.log(this.form.depart_of.value)
    console.log(this.form.carburant.value)

    console.log(this.cargaisons)
    this.myService.post(formData, this.url)
      .then(resp => {
        console.log("ordcerm mission")
        console.log(resp)
        this.isSubmitted = false;
        console.log(resp)
        this.cargaisons.forEach(cargaison => {
          cargaison.mission_order_id = resp.id;
          this.myService.post(cargaison, "/modulemouvement/cargo")
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
  //recuperation de tous les clients
  getClients() {
    this.myService.get("/module4/transportElement/client").then((res) => {
      this.clients = res;
      console.log(this.clients)
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
      "mission_order_id": '',
      'transport_element_id': 1,
      'loading_city': this.form.depart_of.value,
      'dechar': this.dechar,
      'product': this.prod,
      'quantity': this.qte,
      'voucher_number': this.bon,
      'park_observation': this.obs,
      'field_observation': this.obs
    };
    this.cargaisons.push(cargaison)
    this.vider()
  }
  deleteCargaison(id) {
    this.cargaisons.splice(id, 1);
  }
  vider() {
    this.client = '';
    this.char = '';
    this.dechar = '';
    this.prod = '';
    this.qte = '';
    this.bon = '';
    this.obs = '';
  }
}
