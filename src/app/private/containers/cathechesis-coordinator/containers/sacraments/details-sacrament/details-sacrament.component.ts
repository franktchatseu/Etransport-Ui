import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListSacramentsComponent } from '../list-sacraments/list-sacraments.component';
import { SacramentService } from 'src/app/services/sacrament/sacrament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-sacrament',
  templateUrl: './details-sacrament.component.html',
  styleUrls: ['./details-sacrament.component.scss']
})
export class DetailsSacramentComponent implements OnInit {

  sacrament: any;

  constructor(
    private dialog: MatDialogRef<ListSacramentsComponent>,
    @Inject(MAT_DIALOG_DATA) public sacrament_id: number,
    private sacramentService: SacramentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.find(this.sacrament_id);
  }

  public find(id) {
    this.sacramentService.find(this.sacrament_id).then(
      data => {
        this.sacrament = data;
        console.log(data)
      }
    ).catch(
      error => {
        console.log(error);
        this.router.navigate(['/private/cathechesis-coordinator/sacrament/all'])
      }
    )
  }

  close() {
    this.dialog.close();
  }
}
