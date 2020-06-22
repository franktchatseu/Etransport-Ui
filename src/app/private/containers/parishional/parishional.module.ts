import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { UpdatePersonnalInfoComponent } from './containers/update-personnal-info/update-personnal-info.component';
import { ParishionalRoutingModule } from './parishional.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './containers/index/index.component';
import { LeftSideComponent } from './containers/index/left-side/left-side.component';
import { NavBarComponent } from './containers/index/nav-bar/nav-bar.component';
import { MyParishComponent } from './containers/my-parish/my-parish.component';
import { Info1Component } from './containers/info1/info1.component';
import { EvenementAddComponent } from './containers/evenements/evenement-add/evenement-add.component';
import { EvenementsAllComponent } from './containers/evenements/evenements-all/evenements-all.component';
import { MatDialog, MatDialogModule } from '@angular/material';
import { EvenementUpdateComponent } from './containers/evenements/evenement-update/evenement-update.component';
import { EvenementDetailComponent } from './containers/evenements/evenement-detail/evenement-detail.component';


@NgModule({
  declarations: [
    IndexComponent, RandomNumberComponent, NavBarComponent, LeftSideComponent,
    MyParishComponent, Info1Component, UpdatePersonnalInfoComponent,
    EvenementsAllComponent, EvenementAddComponent, EvenementUpdateComponent, EvenementDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ParishionalRoutingModule,
    TranslateModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class ParishionalModule { }
