import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CathechistService } from '../../../services/cathechist.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Lang } from 'src/app/services/config/lang';
import { CathechistDetailComponent } from '../cathechist-detail/cathechist-detail.component';


@Component({
  selector: 'app-cathechist-all',
  templateUrl: './cathechist-all.component.html',
  styleUrls: ['./cathechist-all.component.scss']
})
export class CathechistAllComponent implements OnInit {

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
    private cathechistService: CathechistService


  ) { }

  ngOnInit(): void {
    this.getAll(6);
  }


  getAll(limit) {
    this.cathechistService.getCathechist(limit).subscribe((res) => {
      this.catechists = res;
      console.log(res)
    }, (error) => {
      this.notificationService.danger(this.translations.Parishionals.ServerUnavailable);
    });
  }

  getPage(url) {
    this.cathechistService.get(url).subscribe((res) => {
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
  detail(catechist) {
    this.dialog.open(CathechistDetailComponent, {
      width: '600px',
      height: '700px',
      disableClose: true,
      data: catechist
    });
  }
}
