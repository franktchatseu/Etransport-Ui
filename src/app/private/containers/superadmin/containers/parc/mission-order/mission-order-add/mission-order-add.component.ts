import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission-order-add',
  templateUrl: './mission-order-add.component.html',
  styleUrls: ['./mission-order-add.component.scss']
})
export class MissionOrderAddComponent implements OnInit {

  cargaisons: any[] = []
  client: any; char: any; dechar: any; prod: any; qte: any; bon: any; obs: any
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
  addCargaison() {
    const cargaison = {
      'client': this.client,
      'char': this.char,
      'dechar': this.dechar,
      'prod': this.prod,
      'qte': this.qte,
      'bon': this.bon,
      'obs': this.obs
    };
    this.cargaisons.push(cargaison)
    this.vider()
  }
  deleteCargaison(id) {
    this.cargaisons.splice(id, 1);
  }
  vider(){
    this.client = '';
    this.char = '';
    this.dechar = '';
    this.prod = '';
    this.qte = '';
    this.bon = '';
    this.obs = '';
  }
}
