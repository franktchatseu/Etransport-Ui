import { Component, OnInit, Inject } from '@angular/core';
import { EvenementsAllComponent } from '../evenements-all/evenements-all.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EvenementService } from 'src/app/services/person/evenement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.scss']
})
export class EvenementDetailComponent implements OnInit {

  evenement: any;
  imagePath: any;
  constructor(
    private dialog: MatDialogRef<EvenementsAllComponent>, @Inject(MAT_DIALOG_DATA) public evenement_id: number,
    private evenementService: EvenementService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //recuperation des informations de evenements
    this.find(this.evenement_id);

  }

  public find(id) {
    this.evenementService.find(this.evenement_id).then(
      data => {
        this.evenement = data;
        //on recupere le bon lien de image
        const image = JSON.parse(this.evenement.files);
        this.imagePath = image ? image.images : '';
        console.log(this.imagePath)
        console.log(data)
      }
    ).catch(
      error => {
        console.log(error);
        this.router.navigate(['/private/parishionals/evenements/all'])
      }
    )
  }

  close() {
    this.dialog.close();
  }
}
