import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
declare var $;
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isAuthenticated = false;
  translations: any = null;
  currentLanguage = 'fr';
  user: any = null;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private internationalizationService: InternationalizationService,
    private router: Router) { }


  ngOnInit() {
    this.user = this.authService.getUserInfos();
    console.log(this.user);
  }

  logout() {
    this.authService.logout()
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/private/login']);
        }
      });
  }

  changeState() {
    const button = $('#app-container-truth');
    if (!button.hasClass('closed-sidebar')) {
      button.addClass('closed-sidebar');
    } else {
      button.removeClass('closed-sidebar');
    }
  }

  showUserFirstAndLastName() {
    return this.user.infos.first_name.split(' ')[0] + ' ' + this.user.infos.last_name.split(' ')[0];
  }

  isInProfiles(value: string): boolean {
    return this.user.types.includes(value);
  }

  goTo(url) {
    this.router.navigate(['/private/parishionals/' + url]);
  }

  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }

}
