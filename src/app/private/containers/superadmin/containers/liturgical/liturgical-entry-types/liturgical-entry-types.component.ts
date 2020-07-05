import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Lang } from 'src/app/services/config/lang';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { NotificationService } from 'src/app/services/notification.service';
import { LiturgicalentrytypeService } from 'src/app/services/liturgicals/liturgicalentrytype.service';
import { EntrytypeService } from 'src/app/services/liturgicals/entrytype.service';
import { LiturgicaltypeService } from 'src/app/services/liturgicals/liturgicaltype.service';


@Component({
  selector: 'app-liturgical-entry-types',
  templateUrl: './liturgical-entry-types.component.html',
  styleUrls: ['./liturgical-entry-types.component.scss']
})
export class LiturgicalEntryTypesComponent implements OnInit {

  data: any = null;
  entries: any = null;
  types: any = null;
  user: any = null;
  errors: any = null;
  handleError: any = null;
  createForm: FormGroup;
  page: any = 1;
  active: any = null;
  detail: any = null;
  isSubmitted = false;
  idType: any = null;



  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private internationalizationService: InternationalizationService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private dataService: LiturgicalentrytypeService,
    private entryService: EntrytypeService,
    private typeService: LiturgicaltypeService
  ) { }


  ngOnInit() {
    this.user = this.authService.getUserInfos();
    this.changeLanguage(this.currentLanguage);
    this.initForm({type_id:'', entry_type_id: ''});
    this.gets(this.page);
      this.getTypes();
      this.getEntries();
    
  }


  initForm(obj) {
    this.createForm = this.formBuilder.group({
      type_id: [obj.type_id, Validators.required],
      entry_type_id: [obj.entry_type_id],
    });
  }

  get form() {
    return this.createForm.controls;
  }

  create() {
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
    this.dataService.post(formData)
      .then(resp => {
        console.log(resp);
        this.notificationService.success(this.translations.Superadmins.DoneWithSuccess);
        this.initForm({type_id:'', entry_type_id: ''});
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
        this.initForm({type_id:'', entry_type_id: ''});
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

  getEntries() {
    this.entryService.getEntries().then((response) => {
      this.entries = response;
      console.log(this.entries);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  getTypes() {
    this.typeService.getTypes().then((response) => {
      this.types = response;
      console.log(this.types);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }



  getPage(url) {
    if (url) {
      this.dataService.get(url).then((res) => {
        this.data = res;
        console.log(this.data)
      }).catch((error) => {
        this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
      });
    } else {
      this.notificationService.warning(this.translations.Superadmins.EndOfListMessage);
    }
  }

  chooseMenu(idType) {
    this.idType = idType;
    this.gets(this.page);
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

  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }


}
