import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ElementService } from '../../../services/element.service';
import { Router , ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../../../services/notification.service';
import { TransportelementService } from 'src/app/services/element-transport/transportelement.service';

@Component({
  selector: 'app-element-transport-detail',
  templateUrl: './element-transport-detail.component.html',
  styleUrls: ['./element-transport-detail.component.scss']
})
export class ElementTransportDetailComponent implements OnInit {

  element: any;

  constructor(
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private elementService: TransportelementService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private router: Router,

  ) { }

  async ngOnInit() {
    const element_id = +this.route.snapshot.paramMap.get("id");
    this.elementService.find(element_id).then(
      data => {
        this.element = data;
        console.log(this.element);
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )

  }
}