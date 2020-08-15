import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CarInsuranceAllComponent } from '../car-insurance-all/car-insurance-all.component';

@Component({
  selector: 'app-car-insurance-update',
  templateUrl: './car-insurance-update.component.html',
  styleUrls: ['./car-insurance-update.component.scss']
})
export class CarInsuranceUpdateComponent implements OnInit {

  url: any;
  assurers:any;
  cars:any;
  data:any;

  //declaration des variables
  isLoading:boolean;
  isSubmitted:boolean;
  isSuccess:boolean;
  isError:boolean;

  //initialisation de mon formulaire
  myformGroup:FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private myService: MyCrudService,
    private notificationService: NotificationService,
    private translate: TranslateService,
   // private myService:any//put your service here
   private dialog: MatDialogRef<CarInsuranceAllComponent>, @Inject(MAT_DIALOG_DATA) public element_id: number

  ) { }

  ngOnInit(): void {
    this.url ="/moduleparc/insurance";
    this.initForm();
    this.myService.find(this.element_id,this.url).then(
      data => {
        console.log(data)
        this.data = data;
        this.initWithData()
      }
    ).catch(
      error => {
        this.translate.get('data.' + error.error.code)
          .subscribe(val => this.notificationService.danger(val));
      }
    )
    this.getAssurers();
    this.getCars();
  }

  getAssurers(){
    this.myService.get("/module4/transportElement/assurer").then((res) => {
      this.assurers = res;
      console.log(this.assurers)
    }, (error) => {
      this.notificationService.warning("Aucun assureur disponible");
    });
  }

  getCars(){
    this.myService.get("/module3/caractere_tech_ones/car").then((res) => {
      this.cars = res;
      console.log(this.cars)
    }, (error) => {
      this.notificationService.warning("Aucune voiture disponible");
    });
  }

  initWithData() {
    this.myformGroup = this.formBuilder.group({
      car_id: [this.data.car_id, [Validators.required]],
      insurer_id: [this.data.insurer_id, [Validators.required]],
      validity_date: [this.data.validity_date, [Validators.required]],
      end_validity: [this.data.end_validity, [Validators.required]],
      bonus: [this.data.bonus, [Validators.required]],
      policy_number: [this.data.policy_number, [Validators.required]],
    });
  }

  //methode qui se charge de enregistrement
  initForm() {
    this.myformGroup = this.formBuilder.group(
      {
        car_id: ['', Validators.required],
        insurer_id: ['', [Validators.required]],
        validity_date: ['', [Validators.required]],
        end_validity: ['', [Validators.required]],
        bonus: ['', [Validators.required]],
        policy_number: ['', [Validators.required]],
      }
    )
  }

  //recuperation du formulaire
  get form() {
    return this.myformGroup.controls;
  }
  //methode du service pour enregistrement
  update() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    
    if (this.form.invalid) {
      this.translate.get('erreur enregistrement')
        .subscribe(val => this.notificationService.danger(val));
      return;
    }
    //tout ce passe bien 
    this.isLoading = true;
    const formData = new FormData();
    const data = this.form;
    for (const k in data) {
      if (k) {
        formData.append(k + '', data[k].value); 
      }
    }
    //appol du service
     this.myService.update(formData, this.data.id,this.url)
    .then(resp => {
      this.translate.get('mise a jour réussie')
        .subscribe(val => this.notificationService.success(val));
      this.isSubmitted = false;
      console.log(resp)
      this.myformGroup.reset();
      this.close();
    })
    .catch(error => {
      console.log(error);

    })
    .finally(() => this.isLoading = false);
  }

  close() {
    this.dialog.close();
  }

}
