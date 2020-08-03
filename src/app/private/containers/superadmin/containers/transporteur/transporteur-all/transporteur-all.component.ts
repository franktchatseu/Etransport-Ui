import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../../../services/notification.service';
import { MatDialog } from '@angular/material';
import { TransporteurService } from '../../../services/transporteur.service';
import { Lang } from '../../../../../../services/config/lang';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { InternationalizationService } from '../../../../../../services/features/internationalization.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transporteur-all',
  templateUrl: './transporteur-all.component.html',
  styleUrls: ['./transporteur-all.component.scss']
})
export class TransporteurAllComponent implements OnInit {

  transporteurs: any;
   // language
   currentLanguage = Lang.currentLang;
   translations: any = null;

   loading: boolean = true;
   @BlockUI() blockUI: NgBlockUI; lockUI: NgBlockUI;
 
   //SweetAlert Text
   areYouSure = '';
   transporteur : any ;
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
     private transporteurService: TransporteurService,
     private dialog: MatDialog,
     private notifService: NotificationService,
     private translate: TranslateService,
   ) {
     this.translate.get(
       ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
         'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
       { data: ' ce transporteur' })
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
     this.findAllInfosEnterprise();
   }

   findAllInfosEnterprise(){
     this.transporteurService.findAllInfosEnterprise().subscribe((res) => {
       this.transporteurs = res;
       console.log(this.transporteurs)
     }, (error) => {
       this.notificationService.danger(this.translations.transporteur.NoDriver);
     });
   }

   getPage(url){
     this.transporteurService.getPage(url).subscribe((res) => {
       console.log(res)
       this.transporteurs = res;
     }, (error) => {
       this.notificationService.danger(this.translations.transporteur.NoPage);
     });
   }

   changeLanguage(value) {
     this.currentLanguage = value;
     this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
   }

   add() {
     this.router.navigate(['/private/superadmins/driver-add']);
   }

   update(id) {
     this.router.navigate(['/private/superadmins/transporter/transporter-update', id]);
   }

   detail(id) {
     this.router.navigate(['/private/superadmins/transporter/transporter-detail' , id]);
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
         this.transporteurService.delete(assoc_id).then(
           data => {
             this.blockUI.stop();
             Swal.fire(
               this.deleted,
               this.deletedMessage,
               'success'
             )
             this.findAllInfosEnterprise()
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
   
   completeProfil(step_number){
    
     this.router.navigate(['/private/superadmins/driver-add/' , step_number]);

  }

}
