import { Component, OnInit } from '@angular/core';
import { CathechumenDetailComponent } from '../cathechumen-detail/cathechumen-detail.component';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CathechumenService } from '../../../services/cathechumen.service ';
import { Lang } from 'src/app/services/config/lang';


@Component({
  selector: 'app-cathechumen-all',
  templateUrl: './cathechumen-all.component.html',
  styleUrls: ['./cathechumen-all.component.scss']
})
export class CathechumenAllComponent implements OnInit {


  catechists: any;
  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  loading: boolean = true;
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private notifService: NotificationService,
    private translate: TranslateService,
    private cathechumenService: CathechumenService


  ) { }

  ngOnInit(): void {
    this.getAll(6);
  }


  getAll(limit) {
    this.cathechumenService.getCathechumen(limit).subscribe((res) => {
      this.catechists = res;
      console.log(res)
    }, (error) => {
      this.notificationService.danger(this.translations.Parishionals.ServerUnavailable);
    });
  }

  getPage(url) {
    this.cathechumenService.get(url).subscribe((res) => {
      this.catechists = res;
      console.log(res)
    }, (error) => {
      this.notificationService.danger(this.translations.Parishionals.ServerUnavailable);
    });
  }

  //fonction qui deparse les avatars
  getAvatarPath(image) {
    const value = (JSON.parse(image));
    const avatarPath = value ? value.images : 'assets/images/avatars/default-avatar.jpg';
    return avatarPath;
  }

  //affichage du detail
  detail(catechumen) {
    this.dialog.open(CathechumenDetailComponent, {
      width: '600px',
      height: '700px',
      disableClose: true,
      data: catechumen
    });
  }

}
