import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { AffectationAddComponent } from '../affectation-add/affectation-add.component';

@Component({
  selector: 'app-affectation-all',
  templateUrl: './affectation-all.component.html',
  styleUrls: ['./affectation-all.component.scss']
})
export class AffectationAllComponent implements OnInit {
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
    this.dialog.open(AffectationAddComponent, {
      width: '400px',
      height: '450px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });
  }

}
