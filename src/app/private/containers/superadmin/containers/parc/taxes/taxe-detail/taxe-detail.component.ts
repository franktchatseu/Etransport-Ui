import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-taxe-detail',
  templateUrl: './taxe-detail.component.html',
  styleUrls: ['./taxe-detail.component.scss']
})
export class TaxeDetailComponent implements OnInit {

  url: any;
  element:any;
  constructor(
    private router: Router,
    private myService: MyCrudService,
    private notificationService: NotificationService,
    private translate: TranslateService,
   // private myService:any//put your service here
   private dialog: MatDialogRef<TaxeDetailComponent>, @Inject(MAT_DIALOG_DATA) public element_id: number

  ) { }

  ngOnInit(): void {
    this.url ="/moduleparc/taxe";
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
