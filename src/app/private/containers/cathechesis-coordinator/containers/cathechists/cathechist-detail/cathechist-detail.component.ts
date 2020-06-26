import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CathechistService } from '../../../services/cathechist.service';
import { CathechistAllComponent } from '../cathechist-all/cathechist-all.component';

@Component({
  selector: 'app-cathechist-detail',
  templateUrl: './cathechist-detail.component.html',
  styleUrls: ['./cathechist-detail.component.scss']
})
export class CathechistDetailComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<CathechistDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public cathechist: any,
    private router: Router,
    private notificationService: NotificationService,
    private notifService: NotificationService,
    private translate: TranslateService,
    private cathechistService: CathechistService
  ) { }

  ngOnInit(): void {
  }

  //fonction qui deparse les avatars
  getAvatarPath(image) {
    const value = (JSON.parse(image));
    const avatarPath = value ? value.images : 'assets/images/avatars/default-avatar.jpg';
    return avatarPath;
  }

  close() {
    this.dialog.close();
  }
}
