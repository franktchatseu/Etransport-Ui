import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { RegistrationService } from 'src/app/services/person/registration.service';
import { ProfessionService } from 'src/app/services/person/profession.service';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { Lang } from 'src/app/services/config/lang';
import { ExtraService } from 'src/app/services/person/extra.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  handleError: any = null;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  isBaptisted = false;
  professions: any[] = [];
  cebs: any[] = [];
  groupes: any[] = [];
  postes: any[] = [];
  file: File = null;
  isSpa = false;

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private internationalizationService: InternationalizationService,
    private registrationService: RegistrationService,
    private  professionService: ProfessionService,
    private  extraService: ExtraService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
   // }, {validator: this.checkPasswords });
    this.changeLanguage(this.currentLanguage);
    this.getProfessions();
    this.getPostes();
    this.getCebs();
    this.getGroupes();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      // login: ['', [Validators.required]],
      email: [''],
      gender: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      /* password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],*/
      birth_date: ['', [Validators.required]],
      birth_place: ['', [Validators.required]],
      district: ['', [Validators.required]],
      is_baptisted: [0, [Validators.required]],
      baptist_date: [''],
      baptist_place: [''],
      // profession_id: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      ceb: [''],
      post: [''],
      group: [''],
      language: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      is_married: [0, [Validators.required]],
      is_spa: [0],
      files: ['', [Validators.required]]
    });
  }

  onSelectfile(event) {
    this.file = event.target.files[0];
  }

  getProfessions() {
    this.professionService.getProfessions(10000).subscribe((response) => {
      this.professions = response.data;
    }, (error) => {
      this.notificationService.danger(this.translations.Register.ServerUnavailable);
    });
  }

  getCebs() {
    this.extraService.getCebs().subscribe((response) => {
      this.cebs = response.data;
    }, (error) => {
      this.notificationService.danger(this.translations.Register.ServerUnavailable);
    });
  }

  getGroupes() {
    this.extraService.getGroupes().subscribe((response) => {
      this.groupes = response.data;
    }, (error) => {
      this.notificationService.danger(this.translations.Register.ServerUnavailable);
    });
  }

  getPostes() {
    this.extraService.getPostes().subscribe((response) => {
      this.postes = response.data;
    }, (error) => {
      this.notificationService.danger(this.translations.Register.ServerUnavailable);
    });
  }

  /*checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirm_password').value;
    return pass === confirmPass ? null : { notSame: true };
  }*/

  get form() {
    return this.registerForm.controls;
  }

  isValidPhonenumber(value) {
    return (/^\d{7,}$/).test(value.replace(/[\s()+\-\.]|ext/gi, ''));
  }

  onSubmit() {
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    this.isSubmitted = true;

    console.log(this.form);
    if (this.registerForm.invalid) {
      this.notificationService.danger(this.translations.Register.FormInvalid);
      return;
    }

    if (!this.isValidPhonenumber(this.form.tel.value)) {
      this.notificationService.danger(this.translations.Register.InvalidPhoneNumber);
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    const data = this.form;
    for (const k in data) {
      if (k) {
        if (data[k].value === true || data[k].value === false) {
          formData.append(k + '', data[k].value === true ? '1' : '0');
        } else if (k === 'files') {
          formData.append(k, this.file);
        } else {
          formData.append(k + '', data[k].value);
        }
      }
    }
    this.registrationService.post(formData)
      .then(resp => {
        console.log(resp);
        this.initForm();
        this.notificationService.success(this.translations.Register.DoneWithSuccess);
      })
      .catch(err => {
        const errs = err.error.errors;
        this.handleError = errs;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }
}
