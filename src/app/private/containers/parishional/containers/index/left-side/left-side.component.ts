import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';
declare var $;
@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})
export class LeftSideComponent implements OnInit {

  isAuthenticated = false;
  subscription: Subscription;
  translations: any = null;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private router: Router) {
    }

  showChildren(parent) {
    const uls = $(parent);
    if (!uls.hasClass('mm-show')) {
       uls.addClass('mm-show');
    } else {
      uls.removeClass('mm-show');
    }
  }
  ngOnInit() {
    console.log('Load data for component');
  }

  logout() {
    console.log('make logout here');
  }

  changeLanguage(value) {
    console.log('change language !');
  }

}
