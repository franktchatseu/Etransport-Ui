import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EvenementService } from 'src/app/services/person/evenement.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';
import { EvenementsAllComponent } from '../evenements-all/evenements-all.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-evenement-update',
  templateUrl: './evenement-update.component.html',
  styleUrls: ['./evenement-update.component.scss']
})
export class EvenementUpdateComponent implements OnInit {

  //attribut pour la sauvegarde du fichier
  myfile: File = null;
  evenement: any;
  formEvenement: FormGroup;
  isLoading = false;
  public isError: boolean = false;
  public isSuccess: boolean = false;
  public isSubmitted: boolean = false;
  public errorMessages: any = {};
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private evenementService: EvenementService,
    private translate: TranslateService,
    private notifService: NotificationService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialogRef<EvenementsAllComponent>, @Inject(MAT_DIALOG_DATA) public evenement_id: number

  ) { }

  ngOnInit(): void {
    this.initForm();
    //recuperation de evenement à modifier
    // const evenemnet_id = +this.activeRoute.snapshot.paramMap.get("id");
    this.evenementService.find(this.evenement_id).then(
      data => {
        this.evenement = data;
        console.log(data)
        this.initFormWithData();
      }
    ).catch(
      error => {
        console.log(error);
        this.translate.get('ProSituation.' + error.error.code)
          .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/private/parishionals/evenements/all'])
      }
    )
  }

  //initialisation du formulaire
  initForm() {
    this.formEvenement = this.formbuilder.group(
      {
        nom: ["", [Validators.required]],
        description: ["", [Validators.required]],
      }
    )

  }
  initFormWithData() {
    this.formEvenement = this.formbuilder.group(
      {
        nom: [this.evenement.name, [Validators.required]],

        description: [this.evenement.description, [Validators.required]],

      }
    )
  }

  get form() {
    return this.formEvenement.controls;
  }

  detectfile(event) {
    this.myfile = event.target.files[0];
    console.log(this.myfile)
  }

  update() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    //this.form.name.setValue(this.proSituationName);
    if (this.formEvenement.invalid) {
      this.translate.get('Parishionals.Evenement.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.nom.value);
    formData.append('description', '' + this.form.description.value);
    formData.append('files', this.myfile);
    formData.append('user_utype_id', "1");
    console.log(formData)
    this.evenementService.update(formData, this.evenement_id)
      .then(resp => {
        this.translate.get('Parishionals.Evenement.SubmitSucessEdit')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        console.log(resp)
        this.formEvenement.reset();

      })
      .catch(error => {
        console.log(error);

      })
      .finally(() => this.isLoading = false);
  }

  close() {
    this.dialog.close();
  }
}
