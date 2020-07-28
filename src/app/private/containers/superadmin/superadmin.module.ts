import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { SuperadminRoutingModule } from './superadmin.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './containers/index/nav-bar/nav-bar.component';
import { LeftSideComponent } from './containers/index/left-side/left-side.component';
import { IndexComponent } from './containers/index/index.component';
import { DriverAddComponent} from './containers/driver/driver-add/driver-add.component';
import { DriverDetailsComponent} from './containers/driver/driver-details/driver-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarosserieComponent } from "./containers/parametres/carosserie/carosserie.component";
import { MarqueComponent } from "./containers/parametres/marque/marque.component";
import { DriverAllComponent } from "./containers/driver/driver-all/driver-all.component";
import { ModeleComponent } from "./containers/parametres/modele/modele.component";
import { NationaliteComponent } from "./containers/parametres/nationalite/nationalite.component";
import { TypeComponent } from "./containers/parametres/type/type.component";
import { TypeIntervenantComponent } from "./containers/parametres/type-intervenant/type-intervenant.component";
import {MatDialog, MatDialogModule,MatStepperModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatDatepickerModule,MatSnackBarModule, MatSnackBar } from '@angular/material';

@NgModule({
  declarations: [
    IndexComponent,
    RandomNumberComponent,
    NavBarComponent,
    LeftSideComponent,
    DriverAddComponent,
    CarosserieComponent,
    MarqueComponent,
    DriverDetailsComponent,
    DriverAllComponent,
    ModeleComponent,
    NationaliteComponent,
    TypeComponent,
    TypeIntervenantComponent,
    DriverAddComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    TranslateModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class SuperadminModule { }
