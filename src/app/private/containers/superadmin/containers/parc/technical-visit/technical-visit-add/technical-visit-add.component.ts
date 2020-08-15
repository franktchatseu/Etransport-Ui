import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { MyCrudService } from '../../../../services/parc/my-service.service';

@Component({
  selector: 'app-technical-visit-add',
  templateUrl: './technical-visit-add.component.html',
  styleUrls: ['./technical-visit-add.component.scss']
})
export class TechnicalVisitAddComponent implements OnInit {
  url: any;
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
  private notificationService: NotificationService,
  private myService: MyCrudService,
  private translate: TranslateService,
 // private myService:any//put your service here


) { }

ngOnInit(): void {
  this.url ="/moduleparc/technical-tour"
  this.initForm();
  this.getCars();
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
      type_intervention: ['', [Validators.required]],
      validity_date: ['', [Validators.required]],
      end_validity: ['', [Validators.required]],
      visited_by: ['', [Validators.required]],
      receipt_number: ['', [Validators.required]],
      amount: ['', [Validators.required]],
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

}
