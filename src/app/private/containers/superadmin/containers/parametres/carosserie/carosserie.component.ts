import { Component, OnInit } from '@angular/core';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Lang } from 'src/app/services/config/lang';
import { CarosserieService } from "src/app/services/parametre/carosserie/carosserie.service";

@Component({
  selector: 'app-carosserie',
  templateUrl: './carosserie.component.html',
  styleUrls: ['./carosserie.component.scss']
})
export class CarosserieComponent implements OnInit {

  data: any = null;
  user: any = null;
  errors: any = null;
  handleError: any = null;
  createForm: FormGroup;
  page: any = 1;
  active: any = null;
  detail: any = null;
  toShow: any = null;

  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private internationalizationService: InternationalizationService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private dataService: CarosserieService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserInfos();
    this.changeLanguage(this.currentLanguage);
    this.initForm({color: '', description: ''});
    this.gets(this.page);

  }

  
  initForm(obj) {
    this.createForm = this.formBuilder.group({
      color: [obj.color, Validators.required],
      description: [obj.description, Validators.required],
    });
  }

  get form() {
    return this.createForm.controls;
  }

  create() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    if (this.form.invalid) {
      this.notificationService.danger(this.translations.Superadmins.AllFieldsAreRequired);
    }

    this.isLoading = true;
    const formData = new FormData();
    const data = this.form;
    for (const k in data) {
      if (k) {
        formData.append(k + '', data[k].value);
      }
    }
    this.dataService.post(formData)
      .then(resp => {
        console.log(resp);
        this.notificationService.success(this.translations.Superadmins.DoneWithSuccess);
        this.isSubmitted = false;
        this.initForm({color: '', description: ''});
        this.gets(this.page);
      })
      .catch(err => {
        this.errors = err.error.errors;
        this.handleError = err.error.errors;
      })
      .finally(() => {
          this.isLoading = false;
      });
  }

  update() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    if (this.form.invalid) {
      this.notificationService.danger(this.translations.Superadmins.AllFieldsAreRequired);
    }

    this.isLoading = true;
    const formData = new FormData();
    const data = this.form;
    for (const k in data) {
      if (k) {
        formData.append(k + '', data[k].value);
      }
    }
    this.dataService.put(this.active.id, formData)
      .then(resp => {
        console.log(resp);
        this.notificationService.success(this.translations.Superadmins.DoneWithSuccess);
        this.isSubmitted = false;
        this.initForm({color: '', description: ''});
        this.active = null;
        this.gets(this.page);
      })
      .catch(err => {
        this.errors = err.error.errors;
        this.handleError = err.error.errors;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  gets(page) {
    this.dataService.gets(page).then((response) => {
      this.data = response;
      console.log(this.data);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  getPage(url) {
    if (url) {
      this.dataService.get(url).then((res) => {
        this.data = res;
      }).catch((error) => {
        this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
      });
    } else {
      this.notificationService.warning(this.translations.Superadmins.EndOfListMessage);
    }
  }

  activate(item) {
    this.detail = null;
    this.active = item;
    this.page = this.data.current_page;
    this.initForm(item);
  }

  cancel() {
    this.active = null;
    this.initForm({color: '', description: ''});
  }

  delete(item) {
    const confirm = window.confirm(this.translations.Superadmins.ReallyDelete);
    if (confirm) {
      this.dataService.delete(item.id).then((res) => {
        this.notificationService.success(this.translations.Superadmins.DeleteWithSuccess);
        this.gets(this.page);
      }).catch((error) => {
        this.notificationService.danger(this.translations.Superadmins.DeleteWithError);
      });
    }
  }

  showDetails(item: any) {
    this.detail = item;
  }

  Visualize(value) {
    this.toShow = value;
    window.open(value);
  }

  getPartOfcontent(content: string): string {
    return (content.length < 50)? content: (content.substr(0,50) + '...');
  }
  

  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }

}

