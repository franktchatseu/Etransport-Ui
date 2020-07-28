import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../../../services/notification.service';
import { MatDialog } from '@angular/material';
import { DriverService } from '../../../services/driver.service';
import { Lang } from '../../../../../../services/config/lang';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { InternationalizationService } from '../../../../../../services/features/internationalization.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-driver-all',
  templateUrl: './driver-all.component.html',
  styleUrls: ['./driver-all.component.scss']
})
export class DriverAllComponent implements OnInit {

    // language
    currentLanguage = Lang.currentLang;
    translations: any = null;

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
      private driverService: DriverService,
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
      this.getDriver();
    }

    getDriver(){
      this.driverService.getDrivers().subscribe((res) => {
        this.drivers = res;
        console.log(this.drivers)
      }, (error) => {
        this.notificationService.danger(this.translations.Parishionals.ServerUnavailable);
      });
    }

    getPage(url){
      this.driverService.getPage(url).subscribe((res) => {
        console.log(res)
        this.drivers = res;
      }, (error) => {
        this.notificationService.danger(this.translations.Parishionals.ServerUnavailable);
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
      this.router.navigate(['/private/superadmins/driver/update/' + id]);
    }

    detail(id) {
      this.router.navigate(['/private/superadmins/driver/detail/' + id]);
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
          this.driverService.delete(assoc_id).then(
            data => {
              this.blockUI.stop();
              Swal.fire(
                this.deleted,
                this.deletedMessage,
                'success'
              )
              this.getDriver()
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
  

}
