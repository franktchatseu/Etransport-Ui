import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { SuperadminRoutingModule } from './superadmin.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './containers/index/nav-bar/nav-bar.component';
import { LeftSideComponent } from './containers/index/left-side/left-side.component';
import { IndexComponent } from './containers/index/index.component';
import { DriverAddComponent} from './containers/driver/driver-add/driver-add.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriverAllComponent } from "./containers/driver/driver-all/driver-all.component";
import {MatSelectModule, MatDialogModule,MatStepperModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatDatepickerModule,MatSnackBarModule, MatSnackBar } from '@angular/material';
import { CarosserieComponent } from "src/app/private/containers/superadmin/containers/parametres/carosserie/carosserie.component";
import { MarqueComponent } from "src/app/private/containers/superadmin/containers/parametres/marque/marque.component";
import { ModeleComponent } from "src/app/private/containers/superadmin/containers/parametres/modele/modele.component";
import { NationaliteComponent } from "src/app/private/containers/superadmin/containers/parametres/nationalite/nationalite.component";
import { TypeComponent } from "src/app/private/containers/superadmin/containers/parametres/type/type.component";
import { TypeIntervenantComponent } from "src/app/private/containers/superadmin/containers/parametres/type-intervenant/type-intervenant.component";
import { TransportElementComponent } from "src/app/private/containers/superadmin/containers/element-transport/transport-element/transport-element.component";
import { AddTransportElementComponent } from "src/app/private/containers/superadmin/containers/element-transport/add-transport-element/add-transport-element.component";
import { ListTransportElementsComponent } from "src/app/private/containers/superadmin/containers/element-transport/list-transport-elements/list-transport-elements.component";

@NgModule({
  declarations: [
    IndexComponent,
    RandomNumberComponent,
    NavBarComponent,
    LeftSideComponent,
    DriverAddComponent,
    CarosserieComponent,
    MarqueComponent,
    DriverAllComponent,
    ModeleComponent,
    NationaliteComponent,
    TypeComponent,
    TypeIntervenantComponent,
    DriverAddComponent,
    TransportElementComponent,
    AddTransportElementComponent,
    ListTransportElementsComponent,
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
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class SuperadminModule { }
