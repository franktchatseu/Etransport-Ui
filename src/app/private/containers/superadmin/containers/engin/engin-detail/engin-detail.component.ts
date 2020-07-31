import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { EnginService } from '../../../services/engin.service';
import { Router , ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../../../services/notification.service';

@Component({
  selector: 'app-engin-detail',
  templateUrl: './engin-detail.component.html',
  styleUrls: ['./engin-detail.component.scss']
})
export class EnginDetailComponent implements OnInit {

  cars1 : any[] =[];
  car2 : any;
  caros: any;
  description : any;
  type : any;
  papier: any;
  photo: any;
  mark: any;
  model: any;


  constructor(
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private enginService: EnginService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const engin_id = +this.route.snapshot.paramMap.get("id");


    this.enginService.getMarque(engin_id).then(
      data => {
        this.mark = data;
        console.log(this.mark.name)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.enginService.getCaractere1(engin_id).then(
      data => {
        this.cars1 = data.data;
        console.log(this.cars1)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.enginService.getType(engin_id).then(
      data => {
        this.type = data;
        console.log(this.type.name)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.enginService.getCaractere2(engin_id).then(
      data => {
        this.car2 = data;
        console.log(this.car2)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.enginService.getCaosserie(engin_id).then(
      data => {
        this.caros = data;
        console.log(this.caros )

      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.enginService.getPicture(engin_id).then(
      data => {
        this.photo = data;
        console.log(this.photo)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.enginService.getCarpapers(engin_id).then(
      data => {
        this.papier = data;
        console.log(this.papier)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.enginService.getModel(engin_id).then(
      data => {
        this.model = data;
        console.log(this.model)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.enginService.getDescription(engin_id).then(
      data => {
        this.description = data;
        console.log(this.description)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

  }

  

}
