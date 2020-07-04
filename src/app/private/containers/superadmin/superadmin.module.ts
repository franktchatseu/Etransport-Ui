import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { SuperadminRoutingModule } from './superadmin.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './containers/index/nav-bar/nav-bar.component';
import { LeftSideComponent } from './containers/index/left-side/left-side.component';
import { IndexComponent } from './containers/index/index.component';
import { ArticlesComponent } from './containers/actualities/articles/articles.component';
import { MenusComponent } from './containers/actualities/menus/menus.component';
import { SubmenusComponent } from './containers/actualities/submenus/submenus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialog, MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    IndexComponent,
    RandomNumberComponent,
    NavBarComponent,
    LeftSideComponent,
    ArticlesComponent,
    MenusComponent,
    SubmenusComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    TranslateModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SuperadminModule { }
