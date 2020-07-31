import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ElementService } from '../../../services/element.service';
import { Router , ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../../../services/notification.service';

@Component({
  selector: 'app-element-transport-detail',
  templateUrl: './element-transport-detail.component.html',
  styleUrls: ['./element-transport-detail.component.scss']
})
export class ElementTransportDetailComponent implements OnInit {

  enterprise1 : any;
  enterprise2: any;
  personnel: any;

  constructor(
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private elementService: ElementService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private router: Router,

  ) { }

  async ngOnInit() {
    const driver_id = +this.route.snapshot.paramMap.get("id");


    this.elementService.getEnterprise1(driver_id).then(
      data => {
        this.enterprise1 = data;
        console.log(this.enterprise1.number)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.elementService.getEnterprise2(driver_id).then(
      data => {
        this.enterprise2 = data;
        console.log(this.enterprise2)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

    this.elementService.getDocPersos(driver_id).then(
      data => {
        this.personnel = data;
        console.log(this.personnel.name)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

  }

}
