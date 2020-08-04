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

  car1 : any;
  car2 : any;
  description : any;
  papier: any;
  photo: any;


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
    
    console.log("ceci est " +engin_id)

    this.enginService.getCaractere1(engin_id).then(
      data => {
        this.car1 = data;
        console.log(this.car1)
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
