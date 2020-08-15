import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-technical-visit-detail',
  templateUrl: './technical-visit-detail.component.html',
  styleUrls: ['./technical-visit-detail.component.scss']
})
export class TechnicalVisitDetailComponent implements OnInit {

  url: any;
  element:any;
  constructor(
    private router: Router,
    private myService: MyCrudService,
    private notificationService: NotificationService,
    private translate: TranslateService,
   // private myService:any//put your service here
   private dialog: MatDialogRef<TechnicalVisitDetailComponent>, @Inject(MAT_DIALOG_DATA) public element_id: number

  ) { }

  ngOnInit(): void {
    this.url ="/moduleparc/technical-tour";
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