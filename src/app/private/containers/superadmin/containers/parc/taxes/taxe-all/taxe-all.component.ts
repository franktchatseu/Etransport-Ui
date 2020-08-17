import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TaxeAddComponent } from '../taxe-add/taxe-add.component';
import { TaxeUpdateComponent } from '../taxe-update/taxe-update.component';
import { TaxeDetailComponent } from '../taxe-detail/taxe-detail.component';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-taxe-all',
  templateUrl: './taxe-all.component.html',
  styleUrls: ['./taxe-all.component.scss']
})
export class TaxeAllComponent implements OnInit {

  url: any;
  data:any;

  loading: boolean = true;

  @BlockUI() blockUI: NgBlockUI; lockUI: NgBlockUI;

  //SweetAlert Text
  areYouSure = '';
  drivers: any;
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
    private dialog: MatDialog,
    private myService: MyCrudService,
    private notificationService: NotificationService,
    private translate: TranslateService,
  ) { 
    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
      { data: ' cette taxe' })
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
    this.url="/moduleparc/taxe";
    console.log(this.myService.url)
    this.get();
    
  }

  //recuperation des elements

  get() {
    this.myService.get(this.url).then((res) => {
      this.data = res;
      console.log(this.data)
      this.loading =false;
    }, (error) => {
      this.notificationService.warning("Aucune taxe disponible");
    });
  }
  //affichage de la boite de dialogue pour ajout
  add() {
    this.dialog.open(TaxeAddComponent, {
      width: '400px',
      height: '450px',
      disableClose: true,
      //backdropClass: 'backdropBackground'
    });
  }
  //affichage de la boite de dialogue pour update
  update(element_id) {
    this.dialog.open(TaxeUpdateComponent, {
      width: '400px',
      height: '400px',
      disableClose: true,   
      data:element_id,
      //backdropClass: 'backdropBackground'
    });
  }
  //affichage de la boite de dialogue pour le detail
   detail(element_id) {
    this.dialog.open(TaxeDetailComponent, {
      width: '400px',
      height: '400px',
      disableClose: true,
      data:element_id,
      //backdropClass: 'backdropBackground'
    });
  }
  delete(id) {
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
        this.myService.delete(id, this.url).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.get();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('taxe.' + error.error.code)
              .subscribe(val => this.notificationService.danger(val));
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
