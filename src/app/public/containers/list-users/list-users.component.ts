import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { RegistrationService } from 'src/app/services/person/registration.service';
import { ProfessionService } from 'src/app/services/person/profession.service';
import { ExtraService } from 'src/app/services/person/extra.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormBuilder } from '@angular/forms';
import { Lang } from 'src/app/services/config/lang';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users : any[] = [];
  currentLanguage = Lang.currentLang;
  translations: any = null;
  loading: boolean = true;

  @BlockUI() blockUI: NgBlockUI;

  //SweetAlert Text
  areYouSure = '';
  warning = ''
  yes = '';
  no = '';
  deleted = '';
  deletedMessage = '';
  cancelled = '';
  cancelledMessage = '';
  canCreate = false;
  canUpdate = false;
  canDelete = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private internationalizationService: InternationalizationService,
    private registrationService: RegistrationService,
    private  professionService: ProfessionService,
    private  extraService: ExtraService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getUsers();
    this.changeLanguage(this.currentLanguage);

  }

  getUsers() {
    this.loading = true;
    this.registrationService.all().then(
      response => {
        this.users=response.data;
        console.log(response.data)
      }
    ).catch(
      error => {
        console.log(error)
        this.notificationService.danger(error.error.message)
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }

  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }

}
