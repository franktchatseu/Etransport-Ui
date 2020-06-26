import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CathechumenAllComponent } from '../cathechumen-all/cathechumen-all.component';

@Component({
  selector: 'app-cathechumen-detail',
  templateUrl: './cathechumen-detail.component.html',
  styleUrls: ['./cathechumen-detail.component.scss']
})
export class CathechumenDetailComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<CathechumenAllComponent>, @Inject(MAT_DIALOG_DATA) public cathechumen: any,
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
