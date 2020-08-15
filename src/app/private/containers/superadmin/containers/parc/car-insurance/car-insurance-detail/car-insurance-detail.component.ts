import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CarInsuranceAllComponent } from '../car-insurance-all/car-insurance-all.component';

@Component({
  selector: 'app-car-insurance-detail',
  templateUrl: './car-insurance-detail.component.html',
  styleUrls: ['./car-insurance-detail.component.scss']
})
export class CarInsuranceDetailComponent implements OnInit {
  url: any;
  element:any;
  constructor(
    private router: Router,
    private myService: MyCrudService,
    private notificationService: NotificationService,
    private translate: TranslateService,
   // private myService:any//put your service here
   private dialog: MatDialogRef<CarInsuranceAllComponent>, @Inject(MAT_DIALOG_DATA) public element_id: number

  ) { }

  ngOnInit(): void {
    this.url ="/moduleparc/insurance";
    this.find(this.element_id);
  }

  public find(id) {
    this.myService.find(this.element_id, this.url).then(
      data => {
        this.element = data;
        console.log(data)
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }

  close() {
    this.dialog.close();
  }
}
