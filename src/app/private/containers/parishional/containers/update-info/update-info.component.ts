import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserUtypeService } from 'src/app/services/person/user-utype.service';
import { NotificationService } from 'src/app/services/notification.service';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { Lang } from 'src/app/services/config/lang';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {

  parishs: any;
  activeParish: any;
  user: any = null;

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(private authService: AuthService,
              private router: Router,
              private internationalizationService: InternationalizationService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.user = this.authService.getUserInfos();
    this.changeLanguage(this.currentLanguage);
    console.log(this.user);
  }

  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }

}
