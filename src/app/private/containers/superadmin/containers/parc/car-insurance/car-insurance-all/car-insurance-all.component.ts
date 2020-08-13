import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CarInsuranceAddComponent } from '../car-insurance-add/car-insurance-add.component';
import { CarInsuranceUpdateComponent } from '../car-insurance-update/car-insurance-update.component';
import { CarInsuranceDetailComponent } from '../car-insurance-detail/car-insurance-detail.component';
import { MyCrudService } from '../../../../services/parc/my-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-car-insurance-all',
  templateUrl: './car-insurance-all.component.html',
  styleUrls: ['./car-insurance-all.component.scss']
})
export class CarInsuranceAllComponent implements OnInit {
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
    this.dialog.open(CarInsuranceAddComponent, {
      width: '400px',
      height: '450px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });
  }
  //affichage de la boite de dialogue pour update
  update() {
    this.dialog.open(CarInsuranceUpdateComponent, {
      width: '400px',
      height: '400px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });
  }
  //affichage de la boite de dialogue pour le detail
   detail() {
    this.dialog.open(CarInsuranceDetailComponent, {
      width: '400px',
      height: '400px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });
  }


}
