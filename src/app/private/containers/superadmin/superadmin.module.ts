import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { SuperadminRoutingModule } from './superadmin.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './containers/index/nav-bar/nav-bar.component';
import { LeftSideComponent } from './containers/index/left-side/left-side.component';
import { IndexComponent } from './containers/index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialog, MatDialogModule } from '@angular/material';
import { CarosserieComponent } from "src/app/private/containers/superadmin/containers/parametres/carosserie/carosserie.component";
import { MarqueComponent } from "src/app/private/containers/superadmin/containers/parametres/marque/marque.component";
import { ModeleComponent } from "src/app/private/containers/superadmin/containers/parametres/modele/modele.component";
import { NationaliteComponent } from "src/app/private/containers/superadmin/containers/parametres/nationalite/nationalite.component";
import { TypeComponent } from "src/app/private/containers/superadmin/containers/parametres/type/type.component";
import { TypeIntervenantComponent } from "src/app/private/containers/superadmin/containers/parametres/type-intervenant/type-intervenant.component";

@NgModule({
  declarations: [
    IndexComponent,
    RandomNumberComponent,
    NavBarComponent,
    LeftSideComponent,
    CarosserieComponent,
    MarqueComponent,
    ModeleComponent,
    NationaliteComponent,
    TypeComponent,
    TypeIntervenantComponent,
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
