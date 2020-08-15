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
import {MatSelectModule, MatDialogModule,MatStepperModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatDatepickerModule,MatSnackBarModule, MatSnackBar, MatExpansionModule, } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';

import { CarosserieComponent } from "./containers/parametres/carosserie/carosserie.component";
import { RangeActionsComponent } from "./containers/parametres/range-actions/range-actions.component";
import { MarqueComponent } from "./containers/parametres/marque/marque.component";
import { ModeleComponent } from "./containers/parametres/modele/modele.component";
import { NationaliteComponent } from "./containers/parametres/nationalite/nationalite.component";
import { TypeComponent } from "./containers/parametres/type/type.component";
import { TypeIntervenantComponent } from "./containers/parametres/type-intervenant/type-intervenant.component";
import { TransportElementComponent } from "./containers/element-transport/transport-element/transport-element.component";
import { TransporteurAllComponent } from "./containers/transporteur/transporteur-all/transporteur-all.component";
import { TransporteurDetailComponent } from "./containers/transporteur/transporteur-detail/transporteur-detail.component";
import { AddTransportElementComponent } from "./containers/element-transport/add-transport-element/add-transport-element.component";
import { ListTransportElementsComponent } from "./containers/element-transport/list-transport-elements/list-transport-elements.component";
import { DriverandcardComponent } from "./containers/transporteur/driverandcard/driverandcard.component";
import { AcceuilComponent } from './containers/acceuil/acceuil.component';
import { MailTransporterComponent } from "./containers/transporteur/mail-transporter/mail-transporter.component";
import { MailDriverComponent} from './containers/driver/mail-driver/mail-driver.component';
// module pour la gestion du parc
import { CarInsuranceAllComponent } from './containers/parc/car-insurance/car-insurance-all/car-insurance-all.component';
import { CarInsuranceAddComponent } from './containers/parc/car-insurance/car-insurance-add/car-insurance-add.component';
import { TaxeAllComponent } from './containers/parc/taxes/taxe-all/taxe-all.component';
import { CarInsuranceUpdateComponent } from './containers/parc/car-insurance/car-insurance-update/car-insurance-update.component';
import { CarInsuranceDetailComponent } from './containers/parc/car-insurance/car-insurance-detail/car-insurance-detail.component';
import { TechnicalVisitDetailComponent } from './containers/parc/technical-visit/technical-visit-detail/technical-visit-detail.component';
import { TechnicalVisitAddComponent } from './containers/parc/technical-visit/technical-visit-add/technical-visit-add.component';
import { TechnicalVisitUpdateComponent } from './containers/parc/technical-visit/technical-visit-update/technical-visit-update.component';
import { TechnicalVisitAllComponent } from './containers/parc/technical-visit/technical-visit-all/technical-visit-all.component';
import { TaxeDetailComponent } from './containers/parc/taxes/taxe-detail/taxe-detail.component';
import { TaxeAddComponent } from './containers/parc/taxes/taxe-add/taxe-add.component';
import { TaxeUpdateComponent } from './containers/parc/taxes/taxe-update/taxe-update.component';
import { AffectationAddComponent } from "./containers/parametres/affectation/affectation-add/affectation-add.component";
import { AffectationAllComponent } from "./containers/parametres/affectation/affectation-all/affectation-all.component";
import { AffectationUpdateComponent } from "./containers/parametres/affectation/affectation-update/affectation-update.component";
import { AffectationDetailComponent } from "./containers/parametres/affectation/affectation-detail/affectation-detail.component";
//ordres de mission
import { MissionOrderAddComponent } from './containers/parc/mission-order/mission-order-add/mission-order-add.component';



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
    TransporteurDetailComponent,
    TransporterUpdateComponent,
    DriverandcardComponent,
    AcceuilComponent,
    MailTransporterComponent,
    MailDriverComponent,
    //car insurance
    CarInsuranceAllComponent,
    CarInsuranceAddComponent,
    CarInsuranceUpdateComponent,
    CarInsuranceDetailComponent,
    //technical visit
    TechnicalVisitAllComponent,
    TechnicalVisitDetailComponent,
    TechnicalVisitAddComponent,
    TechnicalVisitUpdateComponent,
    //taxes
    TaxeAllComponent,
    TaxeDetailComponent,
    TaxeAddComponent,
    TaxeUpdateComponent,
    //affectation des engins aux chauffeurs
    AffectationAddComponent,
    AffectationAllComponent,
    AffectationUpdateComponent,
    AffectationDetailComponent,
    MissionOrderAddComponent,

    RangeActionsComponent,

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
    MatTableModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule
  ],
  
})

export class SuperadminModule { }
