import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Lang } from '../../../../../services/config/lang';
import { InternationalizationService } from '../../../../../services/features/internationalization.service';
import { NotificationService } from '../../../../../services/notification.service';
import { SubmenusService } from '../../../../../services/actualities/submenus.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenusService } from '../../../../../services/actualities/menus.service';

@Component({
  selector: 'app-submenus',
  templateUrl: './submenus.component.html',
  styleUrls: ['./submenus.component.css']
})
export class SubmenusComponent implements OnInit {

  data: any = null;
  user: any = null;
  errors: any = null;
  handleError: any = null;
  createForm: FormGroup;
  menus: any = null;
  page: any = 1;
  active: any = null;
  detail: any = null;
  isSubmitted = false;
  attributes: any = null;
  file: File = null;
  idMenu: any = null;

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private internationalizationService: InternationalizationService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private dataService: SubmenusService
    ) {}

  ngOnInit() {
    this.user = this.authService.getUserInfos();
    this.changeLanguage(this.currentLanguage);
    this.initForm({name: '', description: '', slug: '', logo: '', menu_id: ''});
    setTimeout( () => {
      this.gets(this.page, this.idMenu);
      this.getMenus();
    }, 2000);
  }

  initForm(obj) {
    this.createForm = this.formBuilder.group({
      name: [obj.name, Validators.required],
      description: [obj.description, Validators.required],
      slug: [obj.slug, Validators.required],
      logo: [obj.logo, Validators.required],
      menu_id: [obj.menu_id, Validators.required],
    });
  }

  get form() {
    return this.createForm.controls;
  }

  onSelectfile(event) {
    this.file = event.target.files[0];
  }

  getImage(logo) {
    if (logo && logo.lastIndexOf('images') > 0 ) {
      const image = JSON.parse(logo);
      return image.images;
    }
    return logo;
  }

  create() {
    if (this.form.invalid) {
      this.notificationService.danger(this.translations.Superadmins.AllFieldsAreRequired);
    }
    const formData = new FormData();
    const data = this.form;
    for (const k in data) {
      if (k) {
        if (k === 'logo') { formData.append(k + '', this.file, data[k].value); }
        else { formData.append(k + '', data[k].value); }
      }
    }
    this.dataService.post(formData)
      .then(resp => {
        console.log(resp);
        this.notificationService.success(this.translations.Superadmins.DoneWithSuccess);
        this.initForm({name: '', description: '', slug: '', logo: ''});
        this.gets(this.page, this.idMenu);
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
        this.initForm({name: '', description: '', slug: '', logo: ''});
        this.active = null;
        this.gets(this.page, this.idMenu);
      })
      .catch(err => {
        this.errors = err.error.errors;
        this.handleError = err.error.errors;
      })
      .finally(() => {
        // this.isLoading = false;
      });
  }

  gets(page, idMenu) {
    this.dataService.gets(page, idMenu).then((response) => {
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
  }

  delete(item) {
    const confirm = window.confirm(this.translations.Superadmins.ReallyDelete);
    if (confirm) {
      this.dataService.delete(item.id).then((res) => {
        this.notificationService.success(this.translations.Superadmins.DeleteWithSuccess);
        this.gets(this.page, this.idMenu);
      }).catch((error) => {
        this.notificationService.danger(this.translations.Superadmins.DeleteWithError);
      });
    }
  }

  chooseMenu(idMenu) {
    this.idMenu = idMenu;
    this.gets(this.page, this.idMenu);
  }

  showDetails(item: any) {
    this.detail = item;
  }

  /* Attributes */
  getMenus() {
    this.dataService.getMenus().then((response) => {
      this.menus = response;
      console.log(this.data);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }

}
