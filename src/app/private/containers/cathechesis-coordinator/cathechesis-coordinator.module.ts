import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { CathechesisCoordinatorRoutingModule } from './cathechesis-coordinator.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { IndexComponent } from './containers/index/index.component';
import { LeftSideComponent } from './containers/index/left-side/left-side.component';
import { NavBarComponent } from './containers/index/nav-bar/nav-bar.component';
import { MyParishComponent } from './containers/my-parish/my-parish.component';
import { Info1Component } from './containers/info1/info1.component';
import { CreateSacramentComponent } from './containers/sacraments/create-sacrament/create-sacrament.component';
import { UpdateSacramentComponent } from './containers/sacraments/update-sacrament/update-sacrament.component';
import { ListSacramentsComponent } from './containers/sacraments/list-sacraments/list-sacraments.component';
import { DetailsSacramentComponent } from './containers/sacraments/details-sacrament/details-sacrament.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    IndexComponent, RandomNumberComponent, NavBarComponent, LeftSideComponent,
    MyParishComponent, Info1Component,
    CreateSacramentComponent,UpdateSacramentComponent,ListSacramentsComponent,DetailsSacramentComponent
  ],
  imports: [
    CommonModule,
    CathechesisCoordinatorRoutingModule,
    TranslateModule,
    MatDialogModule
  ],
  providers: [
  ]
})
export class CathechesisCoordinatorModule { }
