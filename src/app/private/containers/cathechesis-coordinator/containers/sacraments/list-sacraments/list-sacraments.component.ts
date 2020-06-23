import { Component, OnInit } from '@angular/core';
import { Lang } from 'src/app/services/config/lang';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { SacramentService } from 'src/app/services/sacrament/sacrament.service';
import Swal from 'sweetalert2'
import { CreateSacramentComponent } from '../create-sacrament/create-sacrament.component';
import { UpdateSacramentComponent } from '../update-sacrament/update-sacrament.component';
import { DetailsSacramentComponent } from '../details-sacrament/details-sacrament.component';

@Component({
  selector: 'app-list-sacraments',
  templateUrl: './list-sacraments.component.html',
  styleUrls: ['./list-sacraments.component.scss']
})
export class ListSacramentsComponent implements OnInit {

  sacraments: any;
  //activeParish: any;
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
    private sacramentService: SacramentService,
    private dialog: MatDialog,
    private notifService: NotificationService,
    private translate: TranslateService,
  ) {
    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
      { data: ' ce sacrement' })
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
    this.user = this.authService.getUserInfos();
    this.changeLanguage(this.currentLanguage);
    this.getAll();
    console.log(this.user);
  }

  getAll() {
    this.sacramentService.get().subscribe((res) => {
      this.sacraments = res.data;
      console.log(res)
    }, (error) => {
      this.notifService.danger(this.translations.Parishionals.ServerUnavailable);
    });
  }

  getPage(url) {
    this.sacramentService.getPage(url).subscribe((res) => {
      this.notifService = res.data;
      console.log(res)
    }, (error) => {
      this.notifService.danger(this.translations.Parishionals.ServerUnavailable);
    });
  }

  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }

  computeDescription(content: string) {
    return content.substring(0, 100) + '...';
  }
//ajout d'un evenement
add() {
  this.dialog.open(CreateSacramentComponent, {
    width: '600px',
    disableClose: true
  });
}
update(sacrament_id) {
  this.dialog.open(UpdateSacramentComponent, {
    width: '600px',
    disableClose: true,
    data: sacrament_id
  });

}

detail(sacrament_id) {
  this.dialog.open(DetailsSacramentComponent, {
    width: '700px',
    height: '700px',
    disableClose: true,
    data: sacrament_id
  });
}
//suppression d'un evenement
delete(sacrament_id) {
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
      this.sacramentService.delete(sacrament_id).then(
        data => {
          this.blockUI.stop();
          Swal.fire(
            this.deleted,
            this.deletedMessage,
            'success'
          )
        }
      ).catch(
        error => {
          console.log(error)
          this.blockUI.stop();
          this.translate.get('Sacrament.' + error.error.code)
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
