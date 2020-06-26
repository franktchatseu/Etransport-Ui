import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { SacramentService } from 'src/app/services/sacrament/sacrament.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material';
import { Lang } from 'src/app/services/config/lang';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';

@Component({
  selector: 'app-create-sacrament',
  templateUrl: './create-sacrament.component.html',
  styleUrls: ['./create-sacrament.component.scss']
})
export class CreateSacramentComponent implements OnInit {

  myfile: File = null;
  formSacrament: FormGroup;
  isLoading = false;
  sacramentcategories:any;
  user: any;
  public isError: boolean = false;
  public isSuccess: boolean = false;
  public isSubmitted: boolean = false;
  public errorMessages: any = {};
  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private router: Router,
    private internationalizationService: InternationalizationService,
    private sacramentService: SacramentService,
    private translate: TranslateService,
    private notifService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUserInfos();
    this.getAll();
    this.initForm();
  }

  initForm() {
    this.formSacrament = this.formbuilder.group(
      {
        category_id:['',[Validators.required]],

        title: ['', [Validators.required]],

        description: ['', [Validators.required]]

      }
    )

  }

  getAll() {
    this.sacramentService.getCategory().subscribe((res) => {
      this.sacramentcategories = res.data;
      console.log(res)
    }, (error) => {
      this.notifService.danger(this.translations.CathechesisCoordinator.ServerUnavailable);
    });
  }

  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }

  get form() {
    return this.formSacrament.controls;
  }

  detectfile(event) {
    this.myfile = event.target.files[0];
    console.log(this.myfile)
  }

  submit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    //this.form.name.setValue(this.proSituationName);
    if (this.formSacrament.invalid) {
      this.translate.get('CathechesisCoordinator.Sacrement.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    this.isLoading = true;
    const formData = new FormData();
    formData.append('title', '' + this.form.title.value);
    formData.append('description', '' + this.form.description.value);
    formData.append('composition_file', this.myfile);
    formData.append('inscription_file', this.myfile);
    console.log(formData)
    this.sacramentService.add(formData)
      .then(resp => {
        this.translate.get('CathechesisCoordinator.Sacrement.SubmitSucessAdd')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        console.log(resp)
        this.formSacrament.reset();
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
