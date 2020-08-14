import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mission-order-add',
  templateUrl: './mission-order-add.component.html',
  styleUrls: ['./mission-order-add.component.scss']
})
export class MissionOrderAddComponent implements OnInit {

  myformGroup:FormGroup
  cargaisons: any[] = []
  client: any; char: any; dechar: any; prod: any; qte: any; bon: any; obs: any
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  
    this.initForm();
  }
  
  
  //methode qui se charge de enregistrement
  initForm(){
    this.myformGroup = this.formBuilder.group(
      {
        numero:'',
        object:['',Validators.required],
        num_dossier:['',Validators.required],
        date_depart:['',Validators.required],
        heure_depart:['',Validators.required],
        date_retour:['',Validators.required],
        heure_retour:['',Validators.required],
        duree:['',Validators.required],
        index_depart:['',Validators.required],
        index_retour:['',Validators.required],
        parcours_reel:['',Validators.required],
        parours_theorique:['',Validators.required],
        car_id: ['',Validators.required],
        carburant: ['',Validators.required],
        remorque: ['',Validators.required],
        retour_usine: ['',Validators.required],
        driver_id: ['',Validators.required],
        convoyer_id: ['',Validators.required],
        depart_of: ['',Validators.required],


      }
    )
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
