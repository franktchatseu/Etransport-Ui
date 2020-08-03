import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../../../services/notification.service';
import { MatDialog } from '@angular/material';
import { EnginService } from '../../../services/engin.service';
import { Lang } from '../../../../../../services/config/lang';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { InternationalizationService } from '../../../../../../services/features/internationalization.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-engin-all',
  templateUrl: './engin-all.component.html',
  styleUrls: ['./engin-all.component.scss']
})
export class EnginAllComponent implements OnInit {

    // language
    currentLanguage = Lang.currentLang;
    translations: any = null;
     
    engins : any  ;
    loading: boolean = true;
    @BlockUI() blockUI: NgBlockUI; lockUI: NgBlockUI;
  
    //SweetAlert Text
    areYouSure = '';
    drivers : any ;
    warning = '';
    yes = '';
    no = '';
    deleted = '';
    deletedMessage = '';
    cancelled = '';
    cancelledMessage = '';
    canCreate = false;
    canUpdate = false;
    canDelete = false;
    constructor(
      private router: Router,
      private internationalizationService: InternationalizationService,
      private notificationService: NotificationService,
      private enginService: EnginService,
      private dialog: MatDialog,
      private notifService: NotificationService,
      private translate: TranslateService,
    ) {
      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
          'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
        { data: ' cet association' })
        .subscribe(val => {
          this.areYouSure = val['SweetAlert.AreYouSure'];
          this.warning = val['SweetAlert.Warning'];
          this.yes = val['SweetAlert.Yes'];
          this.no = val['SweetAlert.No'];
          this.deleted = val['SweetAlert.Deleted'];
          this.deletedMessage = val['SweetAlert.DeletedMessagePro'];
          this.cancelled = val['SweetAlert.Cancelled'];
          this.cancelledMessage = val['SweetAlert.CancelledMessage'];
        });
    }
  

    ngOnInit(): void {
      this.changeLanguage(this.currentLanguage);
      this.getEngins();
    }

    getEngins(){
      this.enginService.getEngins().subscribe((res) => {
        this.engins = res;
        console.log(this.engins)
      }, (error) => {
        this.notificationService.warning("Aucun engin disponibile");
      });
    }

    getPage(url){
      this.enginService.getPage(url).subscribe((res) => {
        console.log(res)
        this.drivers = res;
      }, (error) => {
        this.notificationService.warning("Page terminer");
      });
    }

    changeLanguage(value) {
      this.currentLanguage = value;
      this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
    }

    add() {
      this.router.navigate(['/private/superadmins/driver/add/']);
    }

    update(id) {
      console.log("le stepper id est: "+ id)
      this.router.navigate(['/private/superadmins/engin/engin-update/' + id]);
    }

    detail(id) {
      this.router.navigate(['/private/superadmins/engin-detail/' , id]);
    }

    delete(assoc_id) {
      Swal.fire({
        title: this.areYouSure,
        text: this.warning,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.yes,
        cancelButtonText: this.no
      }).then((result) => {
        if (result.value) {
          this.blockUI.start('Loading...');
          this.enginService.delete(assoc_id).then(
            data => {
              this.blockUI.stop();
              Swal.fire(
                this.deleted,
                this.deletedMessage,
                'success'
              )
              this.getEngins()
            }
          ).catch(
            error => {
              console.log(error)
              this.blockUI.stop();
              this.translate.get('info.' + error.error.code)
                .subscribe(val => this.notifService.danger(val));
            }
          )
  
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            this.cancelled,
            this.cancelledMessage,
            'error'
          )
        }
      })
    }
  
    //completins enregistrement
    completer(eng){
      let engin: any={
        "id":eng.stepper_id,
        "value":eng.value,
        "number":eng.number
      }

      localStorage.setItem("engin", JSON.stringify(engin));
      this.router.navigate(['/private/superadmins/engin/engin-add'])
    }
}
