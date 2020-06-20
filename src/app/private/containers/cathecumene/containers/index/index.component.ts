import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../../services/notification.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../../../auth/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isAuthenticated = false;
  subscription: Subscription;
  translations: any = null;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router) {

    }

  ngOnInit() {
    console.log(this.authService.getUserInfos());
    this.isAuthenticated = this.authService.getUserInfos() ? true : false;
    this.router.navigate(['/private/cathecumene/info1']);
  }

  logout() {
    this.authService.logout()
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/private/login']);
        }
      });
  }

  goTo(url) {
    this.router.navigate(['/private/cathecumene']);
  }
}
