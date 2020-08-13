import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TaxeAddComponent } from '../taxe-add/taxe-add.component';
import { TaxeUpdateComponent } from '../taxe-update/taxe-update.component';
import { TaxeDetailComponent } from '../taxe-detail/taxe-detail.component';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-taxe-all',
  templateUrl: './taxe-all.component.html',
  styleUrls: ['./taxe-all.component.scss']
})
export class TaxeAllComponent implements OnInit {

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
    this.dialog.open(TaxeAddComponent, {
      width: '400px',
      height: '450px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });
  }
  //affichage de la boite de dialogue pour update
  update() {
    this.dialog.open(TaxeUpdateComponent, {
      width: '400px',
      height: '400px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });
  }
  //affichage de la boite de dialogue pour le detail
   detail() {
    this.dialog.open(TaxeDetailComponent, {
      width: '400px',
      height: '400px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });
  }

}
