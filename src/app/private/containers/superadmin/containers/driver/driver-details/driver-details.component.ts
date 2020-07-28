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

  drivers : any[] =[];
  permits : any[] =[];
  infos : any[] =[];
  nationalites : any[] =[];
  formations : any[] =[];
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

  ngOnInit() {
    const driver_id = +this.route.snapshot.paramMap.get("id");

    this.driverService.finds(driver_id).then(
      data => {
        this.drivers = data.data;
        console.log("1")
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.driverService.getPermis(driver_id).then(
      data => {
        this.permits = data.data;
        console.log("2")
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.driverService.getFormations(driver_id).then(
      data => {
        this.formations = data.data;
        console.log("3")
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.driverService.getNationationalities(driver_id).then(
      data => {
        this.nationalites = data.data;
        console.log(this.nationalites)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.driverService.getDocInfos(driver_id).then(
      data => {
        this.infos = data.data;
        console.log("4")
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

  }

}
