import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DriverAllComponent } from '../driver-all/driver-all.component';
import { DriverService } from '../../../services/driver.service';
import { Router , ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../../../services/notification.service';


@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit {

  driver : any;
  permit : any;
  info: any;
  nationalite : any;
  formation : any;
  members: any;
  imagePath: any;

  constructor(
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private driverService: DriverService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private router: Router,

  ) { }

  async ngOnInit() {
    const driver_id = +this.route.snapshot.paramMap.get("id");
    console.log("ces le drive id" + driver_id)

    this.driverService.getPermis(driver_id).then(
      data => {
        this.permit = data;
        console.log(this.permit)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.driverService.findGeneralInfo(driver_id).then(
      data => {
        this.driver = data;
        console.log(this.driver)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.driverService.getFormations(driver_id).then(
      data => {
        this.formation = data;
        console.log(this.formation)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.driverService.getNationationalities(driver_id).then(
      data => {
        this.nationalite = data;
        console.log(this.nationalite.name)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.driverService.getDocInfos(driver_id).then(
      data => {
        this.info = data;
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

  }

}
