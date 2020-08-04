import { Component, OnInit } from '@angular/core';
import { TransporteurService } from '../../../services/transporteur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-driverandcard',
  templateUrl: './driverandcard.component.html',
  styleUrls: ['./driverandcard.component.scss']
})
export class DriverandcardComponent implements OnInit {

  drversandcars: any;
  transporter: any
  isActive: boolean = true;
  constructor(
    private transporteurService: TransporteurService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    //recuperation de id du transporteur
    const transporteur_id = +this.activateRoute.snapshot.params['id'];
    //on recupere le transporteur
    this.getEntreprise(transporteur_id);  
    

  }

  //recuperatino de entreprise
  getEntreprise(id){
    this.transporteurService.findInfo1(id).then(
      data => {
        this.transporter = data;
        this.getDriversAndCars(this.transporter.stepper_main_id)
      }
    ).catch(
      error => {
        this.translate.get("probleme de chargement du transporteur")
          .subscribe(val => this.notificationService.warning(val));

      }
    )
    
  }
  getDriversAndCars(id) {
    this.transporteurService.getDriversandCars(id).then(
      data => {
        this.drversandcars = data;
        console.log(this.drversandcars)
      }
    ).catch(
      error => {
        this.translate.get("probleme de chargement des chauffeurs et engin")
          .subscribe(val => this.notificationService.warning(val));

      }
    )
  }
  //detail d'un engin
  detail_car(id) {
    this.router.navigate(['/private/superadmins/engin-detail/', id]);
  }
  //detail d'un engin
  detail_driver(id) {
    this.router.navigate(['/private/superadmins/driver-detail/', id]);
  }

  desable_driver() {
    this.isActive = true;
    console.log("the driver")
  }
  desable_car() {
    this.isActive = false;
    console.log("the car")

  }
}
