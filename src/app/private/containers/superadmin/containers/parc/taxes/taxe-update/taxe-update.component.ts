import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-taxe-update',
  templateUrl: './taxe-update.component.html',
  styleUrls: ['./taxe-update.component.scss']
})
export class TaxeUpdateComponent implements OnInit {

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
   private dialog: MatDialogRef<TaxeUpdateComponent>, @Inject(MAT_DIALOG_DATA) public element_id: number

  ) { }

  ngOnInit(): void {
    this.url ="/moduleparc/taxe";
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
    this.getCars();
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
      type_period: [this.data.type_period, [Validators.required]],
      period: [this.data.period, [Validators.required]],
      year: [this.data.year, [Validators.required]],
      amount: [this.data.amount, [Validators.required]],
    });
  }

  //methode qui se charge de enregistrement
  initForm() {
    this.myformGroup = this.formBuilder.group(
      {
        car_id: ['', Validators.required],
        insurer_id: ['', [Validators.required]],
        type_period: ['', [Validators.required]],
        period: ['', [Validators.required]],
        year: ['', [Validators.required]],
        amount: ['', [Validators.required]],
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
    this.dialog.close();
  }


}
