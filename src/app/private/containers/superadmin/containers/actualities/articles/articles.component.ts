import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Lang } from '../../../../../../services/config/lang';
import { InternationalizationService } from '../../../../../../services/features/internationalization.service';
import { NotificationService } from '../../../../../../services/notification.service';
import { ArticlesService } from '../../../../../../services/actualities/articles.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenusService } from '../../../../../../services/actualities/menus.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  data: any = null;
  user: any = null;
  errors: any = null;
  handleError: any = null;
  createForm: FormGroup;
  menus: any = null;
  submenus: any = null;
  page: any = 1;
  active: any = null;
  detail: any = null;
  isSubmitted = false;
  attributes: any = null;
  photo: File = null;
  fichier: File[] = null;
  idMenu: any = null;
  idSubMenu: any = null;
  toShow: any = null;
  emptyObj: any = {
    id: null,
    name: '',
    photo: '',
    titre: '',
    date_de_publication: '',
    contenu_1: '',
    contenu_2: '',
    fichier: '',
    user_id: null,
    sub_menu_id: null,
    parish_id: null
  };

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private internationalizationService: InternationalizationService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private dataService: ArticlesService
    ) {}

  ngOnInit() {
    this.user = this.authService.getUserInfos();
    this.user.profiles.parishioner.parish.parish_id = 1;
    console.log( this.user );
    this.changeLanguage(this.currentLanguage);
    this.initForm(this.emptyObj);
    setTimeout( () => {
      this.getMenus();
    }, 2000);
  }

  initForm(obj) {
    this.createForm = this.formBuilder.group({
      id: [obj.id, Validators.required],
      name: [obj.name],
      photo: [obj.photo, Validators.required],
      titre: [obj.titre, Validators.required],
      date_de_publication: [obj.date_de_publication ?  obj.date_de_publication : new Date().getTime(), Validators.required],
      contenu_1: [obj.contenu_1, Validators.required],
      contenu_2: [obj.contenu_2, Validators.required],
      fichier: [obj.fichier, Validators.required],
      user_id: [this.user.profiles.parishioner.id],
      parish_id: [this.user.profiles.parishioner.parish.parish_id],
      sub_menu_id: [ this.getSubmenuIdBySlug(obj.sub_menu_id), Validators.required],
    });
  }

  getSubmenuIdBySlug(slug, data = this.submenus ? this.submenus.data : null) {
    if (data !== null) {
      for (const k of data) {
        if (k.slug === slug) {
          return k.id;
        }
      }
    }
    return null;
  }
  get form() {
    return this.createForm.controls;
  }

  onSelectPhoto(event) {
    this.photo = event.target.files[0];
  }

  onSelectFichier(event) {
    this.fichier = event.target.files;
    console.log(this.fichier);
  }

  getImage(logo) {
    return logo ? JSON.parse(logo) : '';
  }

  create() {
    if (this.form.invalid) {
      this.notificationService.danger(this.translations.Superadmins.AllFieldsAreRequired);
    }
    const formData = new FormData();
    const data = this.form;
    for (const k in data) {
      if (k) {
        if (k === 'photo') { formData.append(k + '', this.photo, data[k].value); }
        else if (k === 'fichier') {
          for (let i = 0; i < this.fichier.length; i++) {
            formData.append('fichier' + i, this.fichier[i], this.fichier[i].name);
          }
          formData.append('countfile', this.fichier.length + '');
        }
        else if (k === 'sub_menu_id') { formData.append('sub_menu_id', this.getSubmenuIdBySlug(data[k].value)); }
        else { formData.append(k + '', data[k].value); }
      }
    }
    this.dataService.post(formData)
      .then(resp => {
        console.log(resp);
        this.notificationService.success(this.translations.Superadmins.DoneWithSuccess);
        // this.initForm(this.emptyObj);
        this.gets(this.page, this.idSubMenu);
      })
      .catch(err => {
        this.errors = err.error.errors;
        this.handleError = err.error.errors;
      })
      .finally(() => {
        // this.isLoading = false;
      });
  }

  gets(page, slug, parishId = this.user.profiles.parishioner.parish.parish_id) {
    this.dataService.gets(page, slug, parishId).then((response) => {
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
        this.gets(this.page, this.idSubMenu);
      }).catch((error) => {
        this.notificationService.danger(this.translations.Superadmins.DeleteWithError);
      });
    }
  }

  chooseMenu(idMenu) {
    this.idMenu = idMenu;
    this.getSubMenus(this.idMenu);
  }

  chooseSubMenu(idSubMenu) {
    this.idSubMenu = idSubMenu;
    this.gets(this.page, this.idSubMenu);
  }

  showDetails(item: any) {
    this.detail = item;
    console.log(item);
  }

  /* Attributes */
  getMenus() {
    this.dataService.getMenus().then((response) => {
      this.menus = response;
      if (this.menus.data.length > 0) {
        this.getSubMenus(this.menus.data[0].slug);
      }
      console.log(this.menus);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  update() {
    console.log( this.detail );
  }

  Visualize(value) {
    this.toShow = value;
    window.open(value);
    console.log( value );
  }

  getSubMenus(idMenu) {
    this.dataService.getSubMenus(idMenu).then((response) => {
      this.submenus = response;
      if (this.submenus.data.length > 0) {
        this.gets(this.page, this.submenus.data[0].slug);
      }
      console.log(this.submenus);
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
