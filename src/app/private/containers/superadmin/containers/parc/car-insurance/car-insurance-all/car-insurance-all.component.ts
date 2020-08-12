import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CarInsuranceAddComponent } from '../car-insurance-add/car-insurance-add.component';

@Component({
  selector: 'app-car-insurance-all',
  templateUrl: './car-insurance-all.component.html',
  styleUrls: ['./car-insurance-all.component.scss']
})
export class CarInsuranceAllComponent implements OnInit {

  constructor(
    private dialog: MatDialog


  ) { }

  ngOnInit(): void {
  }
  add() {
    this.dialog.open(CarInsuranceAddComponent, {
      width: '400px',
      height: '400px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });
  }

}
