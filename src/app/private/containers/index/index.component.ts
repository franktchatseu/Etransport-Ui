import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { NotificationService } from './../../../services/notification.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isAuthenticated = false;
  subscription: Subscription;
  translations: any = null;
  user: any = null;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private router: Router) {
      this.messageService.sendMessage(JSON.stringify({code: 'get-translation', data: null}));
      this.subscription = this.messageService.getMessage().subscribe(message => {
        const data = JSON.parse(message.text);
        if (data.code === 'new-translation') {
          this.translations = data.data;
          console.log( 'Rien hein => ', this.translations );
          alert('Hi');
        }
      });
    }

  ngOnInit() {
    this.user = this.authService.getUserInfos();
    console.log(this.user);
    this.isAuthenticated = this.user ? true : false;

    const ui = {
      PRIEST: 'priests',
      CATECHIST: 'catechists',
      CATECHUMEN: 'cathecumenes',
      PARISHIONAL: 'parishionals',
      OTHER: 'others',
      SUPERADMIN: 'superadmins'
    };
    if (this.user && this.user.types) {
      this.router.navigate(['/private/cathecumenes']);
      //this.router.navigate(['/private/parishionals']);
    } else {
      this.router.navigate(['/private/login']);
    }
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
    this.router.navigate(['/private/parishionals']);
  }
}
