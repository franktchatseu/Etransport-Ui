import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-car-insurance-add',
  templateUrl: './car-insurance-add.component.html',
  styleUrls: ['./car-insurance-add.component.scss']
})
export class CarInsuranceAddComponent implements OnInit {
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
    private translate: TranslateService,
   // private myService:any//put your service here


  ) { }

  ngOnInit(): void {
    
    this.initForm();
  }


  //methode qui se charge de enregistrement
  initForm(){
    this.myformGroup = this.formBuilder.group(
      {
        'attr1':'value1',
        'attr2':'value2'
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
    formData.append('attr1', this.form.attr1.value);
    formData.append('attr2', this.form.attr2.value);
    //appol du service
   /* this.myService.post(formData)
    .then(resp => {
      this.translate.get('enregistrement réussie')
        .subscribe(val => this.notificationService.success(val));
      this.isSubmitted = false;
      console.log(resp)
      this.myformGroup.reset();
    })
    .catch(error => {
      console.log(error);

    })
    .finally(() => this.isLoading = false);*/
  }

  close() {
    this.dialog.closeAll();
  }
}
