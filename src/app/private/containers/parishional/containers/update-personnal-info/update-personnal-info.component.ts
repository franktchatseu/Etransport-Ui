import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/person/user.service';
import { ProfessionService } from 'src/app/services/person/profession.service';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { Lang } from 'src/app/services/config/lang';
import { ExtraService } from 'src/app/services/person/extra.service';

@Component({
  selector: 'app-update-personnal-info',
  templateUrl: './update-personnal-info.component.html',
  styleUrls: ['./update-personnal-info.component.css']
})
export class UpdatePersonnalInfoComponent implements OnInit {

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
  user: any = null;
  avatarPath = '';
  avatarPreviewPath = '';

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private internationalizationService: InternationalizationService,
    private userService: UserService,
    private  professionService: ProfessionService,
    private  extraService: ExtraService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.user = this.authService.getUserInfos();
    this.initForm();
    this.initAvatar();
   // }, {validator: this.checkPasswords });
    this.changeLanguage(this.currentLanguage);
    this.getProfessions();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      // login: ['', [Validators.required]],
      email: [this.user.infos.email],
      gender: [this.user.infos.gender],
      first_name: [this.user.infos.first_name],
      last_name: [this.user.infos.last_name],
      /* password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],*/
      birth_date: [this.user.infos.birth_date],
      birth_place: [this.user.infos.birth_place],
      district: [this.user.infos.district],
      // profession_id: ['', [Validators.required]],
      profession: [this.user.infos.profession],
      language: [this.user.infos.language],
      tel: [this.user.infos.tel],
      is_married: [this.user.infos.is_married],
      files: ['']
    });
  }

  initAvatar() {
    this.avatarPath = (JSON.parse(this.user.infos.avatar)).images;
  }

  onSelectfile(event) {
    this.file = event.target.files[0];
    this.previewAvatar();
  }

  previewAvatar() {
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.avatarPreviewPath = reader.result as string;
    }
  }

  chooseFile() {
    document.getElementById('my_file').click();
  }

  computeFileName() {
    if(this.file.name.length > 15)
      return this.file.name.substr(0, 20) + '  ...';
    else
      return this.file.name;
  }

  computeMarriedStatus() {
    return (this.user.infos.is_married === 1) ? 'UpdatePersonnalInfo.Yes' : 'UpdatePersonnalInfo.No';
  }

  getProfessions() {
    this.professionService.getProfessions(10000).subscribe((response) => {
      this.professions = response.data;
    }, (error) => {
      this.notificationService.danger(this.translations.UpdatePersonnalInfo.ServerUnavailable);
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

    console.log('user: ', this.user);
    if (this.registerForm.invalid) {
      this.notificationService.danger(this.translations.UpdatePersonnalInfo.FormInvalid);
      return;
    }

    if (!this.isValidPhonenumber(this.form.tel.value)) {
      this.notificationService.danger(this.translations.UpdatePersonnalInfo.InvalidPhoneNumber);
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
    this.userService.put(this.user.infos.id, formData)
      .then(resp => {
        console.log(resp);
        this.avatarPath = (JSON.parse(resp.avatar)).images;
        this.user.infos = resp
        this.authService.storeUserInfos(this.user);
        this.notificationService.success(this.translations.UpdatePersonnalInfo.DoneWithSuccess);
      })
      .catch(err => {
        const errs = err.error.errors;
        console.log(err);
        this.handleError = errs;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  displayUserLanguage() {
    if(this.user.infos.language) {
      if(this.user.infos.language === 'fr')
        return 'Français';
      else if(this.user.infos.language === 'en')
        return 'Anglais';
      else
        return 'langue inconnue';
    }
  }

  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }
  
}
