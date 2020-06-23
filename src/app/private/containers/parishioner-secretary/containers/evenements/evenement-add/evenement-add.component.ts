import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EvenementService } from 'src/app/services/person/evenement.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-evenement-add',
  templateUrl: './evenement-add.component.html',
  styleUrls: ['./evenement-add.component.scss']
})
export class EvenementAddComponent implements OnInit {

  //attribut pour la sauvegarde du fichier
  myfile: File = null;
  formEvenement: FormGroup;
  isLoading = false;
  user: any;
  public isError: boolean = false;
  public isSuccess: boolean = false;
  public isSubmitted: boolean = false;
  public errorMessages: any = {};
  constructor(
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private router: Router,
    private evenementService: EvenementService,
    private translate: TranslateService,
    private notifService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUserInfos();
    this.initForm();
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

  get form() {
    return this.formEvenement.controls;
  }
  //methode ajout

  //recuperation du fichier de evenement

  detectfile(event) {
    this.myfile = event.target.files[0];
    console.log(this.myfile)
  }
  add() {
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
    formData.append('user_utype_id', '1');
    console.log(formData)
    this.evenementService.add(formData)
      .then(resp => {
        this.translate.get('Parishionals.Evenement.SubmitSucessAdd')
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
    this.dialog.closeAll();
  }
}
