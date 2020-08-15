import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { MyCrudService } from '../../../../services/parc/my-service.service';

@Component({
  selector: 'app-affectation-add',
  templateUrl: './affectation-add.component.html',
  styleUrls: ['./affectation-add.component.scss']
})
export class AffectationAddComponent implements OnInit {
  url: any;
  drivers:any;
  cars:any;

  //declaration des variables
  isLoading:boolean;
  isSubmitted:boolean;
  isSuccess:boolean;
  isError:boolean;

  //initialisation de mon formulaire
  myformGroup:FormGroup;
  constructor(
    private dialog: MatDialog,
    private formBuilder:FormBuilder,
    private myService: MyCrudService,
    private notificationService: NotificationService,
    private translate: TranslateService,
   // private myService:any//put your service here


  ) { }

  ngOnInit(): void {
    this.url ="/module2/affectation";
    this.initForm();
    this.getDrivers();
    this.getCars();
  }

  getDrivers(){
    this.myService.get("/module2/general_informations/driver").then((res) => {
      this.drivers = res;
      console.log(this.drivers)
    }, (error) => {
      this.notificationService.warning("Aucune assurance disponible");
    });
  }

  getCars(){
    this.myService.get("/module3/caractere_tech_ones/car").then((res) => {
      this.cars = res;
      console.log(this.cars)
    }, (error) => {
      this.notificationService.warning("Aucune assurance disponible");
    });
  }



  //methode qui se charge de enregistrement
  initForm(){
    this.myformGroup = this.formBuilder.group(
      {
        car_id: ['', Validators.required],
        driver_id: ['', [Validators.required]],
        conveyor_id: ['', [Validators.required]],
        date: ['', [Validators.required]],
        remorque: ['', [Validators.required]],
      }
    )
  }

  //recuperation du formulaire
  get form() {
    return this.myformGroup.controls;
  }
  //methode du service pour enregistrement
  add() {
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
     this.myService.post(formData, this.url)
    .then(resp => {
      this.translate.get('enregistrement réussie')
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
    this.dialog.closeAll();
  }

  onSelect(event){
    alert('stop');
    console.log(event.target);
  }
}
