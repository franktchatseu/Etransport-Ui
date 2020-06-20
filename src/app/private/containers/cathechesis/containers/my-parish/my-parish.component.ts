import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { UserUtypeService } from '../../../../../services/person/user-utype.service';
import { NotificationService } from '../../../../../services/notification.service';
import { InternationalizationService } from '../../../../../services/features/internationalization.service';
import { Lang } from '../../../../../services/config/lang';

@Component({
  selector: 'app-my-parish',
  templateUrl: './my-parish.component.html',
  styleUrls: ['./my-parish.component.css']
})
export class MyParishComponent implements OnInit {

  parishs: any;
  activeParish: any;
  user: any = null;

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(private authService: AuthService,
              private router: Router,
              private internationalizationService: InternationalizationService,
              private notificationService: NotificationService,
              private userTypeService: UserUtypeService) {}

  ngOnInit() {
    this.user = this.authService.getUserInfos();
    this.changeLanguage(this.currentLanguage);
    this.getUserParishs(this.user.infos.id);
    console.log(this.user);
  }

  getUserParishs(idUser: number) {
    this.userTypeService.getUserParishs(this.user.infos.id).subscribe((res) => {
      this.parishs = res;
      this.getDefaultParish(res);
    }, (error) => {
      this.notificationService.danger(this.translations.Parishionals.ServerUnavailable);
    });
  }

  getPage(url) {
    if ( url ) {
      this.userTypeService.get(url).subscribe( (res) => {
        this.parishs = res;
      }, (error) => {
        this.notificationService.danger(this.translations.Parishionals.ServerUnavailable);
      });
    } else {
      this.notificationService.warning(this.translations.Parishionals.EndOfListMessage);
    }
  }

  activateParish(parish) {
    this.userTypeService.put(this.user.infos.id, parish.parish_id).then((response) => {
      console.log('result ', response);
      this.getUserParishs(this.user.infos.id);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Parishionals.ServerUnavailable);
    });
  }

  showParishDetails(parish: any) {
    this.activeParish = parish;
  }

  getDefaultParish(parishs: any) {
    for (const parish of parishs.data) {
      if (parish.parish_is_active) {
        this.activeParish = parish;
        return;
      }
    }
  }

  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }

}
