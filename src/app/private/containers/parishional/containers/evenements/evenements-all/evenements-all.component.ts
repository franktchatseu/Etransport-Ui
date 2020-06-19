import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { EvenementService } from 'src/app/services/person/evenement.service';
import { NotificationService } from 'src/app/services/notification.service';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { Lang } from 'src/app/services/config/lang';
import { MatDialog } from '@angular/material';
import { EvenementAddComponent } from '../evenement-add/evenement-add.component';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';
import { EvenementUpdateComponent } from '../evenement-update/evenement-update.component';
@Component({
  selector: 'app-evenements-all',
  templateUrl: './evenements-all.component.html',
  styleUrls: ['./evenements-all.component.scss']
})
export class EvenementsAllComponent implements OnInit {

  evenements: any;
  activeParish: any;
  user: any = null;

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  loading: boolean = true;
  @BlockUI() blockUI: NgBlockUI;

  //SweetAlert Text
  areYouSure = '';
  warning = ''
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
    private authService: AuthService,
    private router: Router,
    private internationalizationService: InternationalizationService,
    private notificationService: NotificationService,
    private evenementService: EvenementService,
    private dialog:MatDialog,
    private notifService: NotificationService,
    private translate: TranslateService,
  ) {
    this.translate.get(
      ['SweetAlert.AreYouSurePro', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
      'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
      { data: 'role' })
      .subscribe(val => {
        this.areYouSure = val['SweetAlert.AreYouSurePro'];
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
    this.user = this.authService.getUserInfos();
    this.changeLanguage(this.currentLanguage);
    this.getEvenementByUser(this.user.infos.id);
    console.log(this.user);
  }


  getEvenementByUser(idUser: number) {
    this.evenementService.getEvenementsByUser(idUser,10).subscribe((res) => {
      this.evenements = res.data;
      console.log(res)
    }, (error) => {
      this.notificationService.danger(this.translations.Parishionals.ServerUnavailable);
    });
  }

  getPage(url){
    this.evenementService.get(url).subscribe((res) => {
      this.evenements = res.data;
      console.log(res)
    }, (error) => {
      this.notificationService.danger(this.translations.Parishionals.ServerUnavailable);
    });
  }

  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }
  //ajout d'un evenement
  add(){
    this.dialog.open(EvenementAddComponent,{
      width:'600px',
      disableClose: true
    });
  }
  update(evenement_id){
    this.dialog.open(EvenementUpdateComponent,{
      width:'600px',
      disableClose: true,
      data:evenement_id
    });
  }
  //suppression d'un evenement
  delete(evenement_id) {
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
        this.evenementService.delete(evenement_id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getEvenementByUser(this.user.infos.id)
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Role.'+error.error.code)
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
