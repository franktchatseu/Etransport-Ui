import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { SuperadminRoutingModule } from './superadmin.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './containers/index/nav-bar/nav-bar.component';
import { LeftSideComponent } from './containers/index/left-side/left-side.component';
import { IndexComponent } from './containers/index/index.component';
import { TransporterAddComponent} from './containers/transporteur/transporter-add/transporter-add.component';
import { TransporterUpdateComponent} from './containers/transporteur/transporter-update/transporter-update.component';
import { EnginAllComponent} from './containers/engin/engin-all/engin-all.component';
import { ElementTransportDetailComponent} from './containers/element-transport/element-transport-detail/element-transport-detail.component';
import { EnginDetailComponent} from './containers/engin/engin-detail/engin-detail.component';
import { DriverAddComponent} from './containers/driver/driver-add/driver-add.component';
import { DriverUpdateComponent} from './containers/driver/driver-update/driver-update.component';
import { EnginAddComponent} from './containers/engin/engin-add/engin-add.component';
import { EnginUpdateComponent} from './containers/engin/engin-update/engin-update.component';
import { DriverAllComponent} from './containers/driver/driver-all/driver-all.component';
import { DriverDetailsComponent} from './containers/driver/driver-details/driver-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule, MatDialogModule,MatStepperModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatDatepickerModule,MatSnackBarModule, MatSnackBar, MatExpansionModule } from '@angular/material';
import { CarosserieComponent } from "./containers/parametres/carosserie/carosserie.component";
import { MarqueComponent } from "./containers/parametres/marque/marque.component";
import { ModeleComponent } from "./containers/parametres/modele/modele.component";
import { NationaliteComponent } from "./containers/parametres/nationalite/nationalite.component";
import { TypeComponent } from "./containers/parametres/type/type.component";
import { TypeIntervenantComponent } from "./containers/parametres/type-intervenant/type-intervenant.component";
import { TransportElementComponent } from "./containers/element-transport/transport-element/transport-element.component";
import { TransporteurAllComponent } from "./containers/transporteur/transporteur-all/transporteur-all.component";
import { AddTransportElementComponent } from "./containers/element-transport/add-transport-element/add-transport-element.component";
import { ListTransportElementsComponent } from "./containers/element-transport/list-transport-elements/list-transport-elements.component";
import { DriverandcardComponent } from "./containers/transporteur/driverandcard/driverandcard.component";
import { AcceuilComponent } from './containers/acceuil/acceuil.component';

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
    EnginAllComponent,
    ModeleComponent,
    NationaliteComponent,
    TypeComponent,
    TypeIntervenantComponent,
    EnginDetailComponent,
    ElementTransportDetailComponent,
    DriverAddComponent,
    TransporteurAllComponent,
    DriverUpdateComponent,
    TransportElementComponent,
    AddTransportElementComponent,
    ListTransportElementsComponent,
    EnginAddComponent,
    EnginUpdateComponent,
    TransporterAddComponent,
    TransporterUpdateComponent,
    DriverandcardComponent,
    AcceuilComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    TranslateModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatExpansionModule,
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
