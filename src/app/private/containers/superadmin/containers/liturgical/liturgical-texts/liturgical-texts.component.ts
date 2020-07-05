import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Lang } from 'src/app/services/config/lang';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { NotificationService } from 'src/app/services/notification.service';
import { LiturgicalentrytypeService } from 'src/app/services/liturgicals/liturgicalentrytype.service';
import { LiturgicaltextService } from 'src/app/services/liturgicals/liturgicaltext.service';

@Component({
  selector: 'app-liturgical-texts',
  templateUrl: './liturgical-texts.component.html',
  styleUrls: ['./liturgical-texts.component.scss']
})
export class LiturgicalTextsComponent implements OnInit {

  data: any = null;
  types: any = null;
  parishs: any = null;
  user: any = null;
  errors: any = null;
  handleError: any = null;
  createForm: FormGroup;
  page: any = 1;
  active: any = null;
  detail: any = null;
  isSubmitted = false;
  idType: any = null;
  file: File = null;

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private internationalizationService: InternationalizationService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private typeService: LiturgicalentrytypeService,
    private dataService: LiturgicaltextService,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserInfos();
    this.changeLanguage(this.currentLanguage);
    this.initForm({type_entry_type_id: '', parish_id:'', title: '', contenu: '', image: '', });
    setTimeout( () => {
      this.gets(this.page);
      this.getTypes();
      this.getParishs();
    }, 2000);
  }

  initForm(obj) {
    this.createForm = this.formBuilder.group({
      type_entry_type_id: [obj.type_entry_type_id, Validators.required],
      parish_id: [obj.parish_id, Validators.required],
      title: [obj.title, Validators.required],
      contenu: [obj.contenu, Validators.required],
      image: [obj.image, Validators.required],
    });
  }

  get form() {
    return this.createForm.controls;
  }

  onSelectfile(event) {
    this.file = event.target.files[0];
  }

  create() {
    if (this.form.invalid) {
      this.notificationService.danger(this.translations.Superadmins.AllFieldsAreRequired);
    }
    const formData = new FormData();
    const data = this.form;
    for (const k in data) {
      if (k) {
        if (k === 'image') { formData.append(k + '', this.file, data[k].value); }
        else { formData.append(k + '', data[k].value); }
      }
    }
    this.dataService.post(formData)
      .then(resp => {
        console.log(resp);
        this.notificationService.success(this.translations.Superadmins.DoneWithSuccess);
        this.initForm({type_entry_type_id: '', parish_id:'', title: '', contenu: '', image: '', });
        this.gets(this.page);
      })
      .catch(err => {
        this.errors = err.error.errors;
        this.handleError = err.error.errors;
        console.log(this.errors);
      })
      .finally(() => {
        // this.isLoading = false;
      });
  }

  update() {
    if (this.form.invalid) {
      this.notificationService.danger(this.translations.Superadmins.AllFieldsAreRequired);
    }
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
        this.active = null;
        this.initForm({type_entry_type_id: '', parish_id:'', title: '', contenu: '', image: '', });
        this.gets(this.page);
      })
      .catch(err => {
        this.errors = err.error.errors;
        this.handleError = err.error.errors;
      })
      .finally(() => {
        // this.isLoading = false;
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

  getTypes() {
    this.typeService.getTypes().then((response) => {
      this.types = response;
      console.log(this.types);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  getParishs(){
    this.dataService.getParishs().then((response) => {
      this.parishs = response;
      console.log(this.parishs);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    })
  }

  activate(item) {
    this.detail = null;
    this.active = item;
    this.page = this.data.current_page;
    this.initForm(item);
  }

  cancel() {
    this.active = null;
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

  getPartOfcontent(content: string) {
    return content.substring(0, 50) + '...';
  }
  
  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }
}
