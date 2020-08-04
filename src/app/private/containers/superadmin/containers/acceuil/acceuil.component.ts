import { Component, OnInit } from '@angular/core';
import { DashboardService} from '../../services/dashboard.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {

  tot_transporteur;
  tot_driver;
  tot_car;
  tot_element;
  constructor(
    private DashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    //recuperation
    this.DashboardService.getDonne().then(
      (Response) => {
        console.log(Response)
        this.tot_transporteur=Response.total_transporteur.total_transporteur;
        this.tot_driver=Response.total_chauffeur.tatal_chauffeur;
        this.tot_car=Response.total_engin.total_engin;
        this.tot_element=Response.total_element.total_element;
        

      },
      (error) => {
        console.log(error)
      })
  }

}
