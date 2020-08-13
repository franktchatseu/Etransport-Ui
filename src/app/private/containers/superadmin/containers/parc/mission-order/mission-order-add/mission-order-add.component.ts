import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission-order-add',
  templateUrl: './mission-order-add.component.html',
  styleUrls: ['./mission-order-add.component.scss']
})
export class MissionOrderAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
