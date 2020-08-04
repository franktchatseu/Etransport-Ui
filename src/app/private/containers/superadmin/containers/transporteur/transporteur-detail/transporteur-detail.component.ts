import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { TransporteurService } from '../../../services/transporteur.service';
import { Router , ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../../../services/notification.service';
@Component({
  selector: 'app-transporteur-detail',
  templateUrl: './transporteur-detail.component.html',
  styleUrls: ['./transporteur-detail.component.scss']
})
export class TransporteurDetailComponent implements OnInit {

  info : any;
  nationalite: any;

  constructor(
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private transporteurService: TransporteurService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const trans_id = +this.route.snapshot.paramMap.get("id");
    
    console.log("ceci est " +trans_id)

    this.transporteurService.findAllInfosEnterpriseById(trans_id).then(
      data => {
        this.info = data;
        console.log(this.info)
      }
    ).catch(
      error => {
        this.translate.get("une erreurs est survenu")
          .subscribe(val => this.notificationService.danger(val));
        
      }
    )
    }

}
