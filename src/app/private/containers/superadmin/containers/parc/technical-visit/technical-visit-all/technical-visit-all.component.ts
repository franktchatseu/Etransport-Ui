import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { TechnicalVisitAddComponent } from '../technical-visit-add/technical-visit-add.component';
import { TechnicalVisitUpdateComponent } from '../technical-visit-update/technical-visit-update.component';
import { TechnicalVisitDetailComponent } from '../technical-visit-detail/technical-visit-detail.component';


@Component({
  selector: 'app-technical-visit-all',
  templateUrl: './technical-visit-all.component.html',
  styleUrls: ['./technical-visit-all.component.scss']
})
export class TechnicalVisitAllComponent implements OnInit {
  url: any;
  data:any;
  constructor(
    private dialog: MatDialog,
    private myService: MyCrudService,
    private notificationService: NotificationService,
    private translate: TranslateService,
  ) { 

  }

  ngOnInit(): void {
    this.url="/module3/descriptions";
    console.log(this.myService.url)
    this.get();
    
  }

  //recuperation des elements

  get() {
    this.myService.get(this.url).then((res) => {
      this.data = res;
      console.log(this.data)
    }, (error) => {
      this.notificationService.warning("Aucune assurance disponible");
    });
  }
  //affichage de la boite de dialogue pour ajout
  add() {
    this.dialog.open(TechnicalVisitAddComponent, {
      width: '400px',
      height: '450px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });
  }
  //affichage de la boite de dialogue pour update
  update() {
    this.dialog.open(TechnicalVisitUpdateComponent, {
      width: '400px',
      height: '400px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });
  }
  //affichage de la boite de dialogue pour le detail
   detail() {
    this.dialog.open(TechnicalVisitDetailComponent, {
      width: '400px',
      height: '400px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });
  }

}
