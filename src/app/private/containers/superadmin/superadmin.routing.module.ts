import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { IndexComponent } from './containers/index/index.component';
import { TypeComponent } from './containers/parametres/type/type.component';
import { TypeIntervenantComponent } from './containers/parametres/type-intervenant/type-intervenant.component';
import { MarqueComponent } from './containers/parametres/marque/marque.component';
import { NationaliteComponent } from './containers/parametres/nationalite/nationalite.component';
import { ModeleComponent } from './containers/parametres/modele/modele.component';
import { CarosserieComponent } from './containers/parametres/carosserie/carosserie.component';
import { DriverAddComponent} from './containers/driver/driver-add/driver-add.component';
import { DriverUpdateComponent} from './containers/driver/driver-update/driver-update.component';
import { DriverAllComponent } from "./containers/driver/driver-all/driver-all.component";
import { DriverDetailsComponent} from './containers/driver/driver-details/driver-details.component';
import { TransporterAddComponent} from './containers/transporteur/transporter-add/transporter-add.component';
import { TransporterUpdateComponent} from './containers/transporteur/transporter-update/transporter-update.component';
import { EnginAddComponent} from './containers/engin/engin-add/engin-add.component';
import { EnginUpdateComponent} from './containers/engin/engin-update/engin-update.component';
import { EnginDetailComponent} from './containers/engin/engin-detail/engin-detail.component';
import { EnginAllComponent} from './containers/engin/engin-all/engin-all.component';
import { TransporteurAllComponent } from "./containers/transporteur/transporteur-all/transporteur-all.component";
//import { AddTransportElementComponent } from './containers/element-transport/add-transport-element/add-transport-element.component';
import { ElementTransportDetailComponent} from './containers/element-transport/element-transport-detail/element-transport-detail.component';
import { TransportElementComponent } from './containers/element-transport/transport-element/transport-element.component';
import { ListTransportElementsComponent } from './containers/element-transport/list-transport-elements/list-transport-elements.component';
import { AddTransportElementComponent } from './containers/element-transport/add-transport-element/add-transport-element.component';
import { DriverandcardComponent } from './containers/transporteur/driverandcard/driverandcard.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'random-number',
        component: RandomNumberComponent,
      },
      {
        path: 'driver-add',
        component: DriverAddComponent,
      },
      {
        path: 'driver-update/:id',
        component: DriverUpdateComponent,
      },
      {
        path: 'driver-detail/:id',
        component: DriverDetailsComponent,
      },
      {
        path: 'element-detail/:id',
        component: ElementTransportDetailComponent,
      },
      {
        path: 'type',
        component: TypeComponent,
      },
      {
        path: 'type-intervenant',
        component: TypeIntervenantComponent,
      },
      {
        path: 'transporteur-all/:id',
        component: TransporteurAllComponent,
      },
      {
        path: 'marque',
        component: MarqueComponent,
      },
      {
        path: 'driver-all',
        component: DriverAllComponent,
      },
      {
        path: 'engin-all',
        component: EnginAllComponent,
      },
      {
        path: 'engin-detail/:id',
        component: EnginDetailComponent,
      },
      {
        path: 'nationalite',
        component: NationaliteComponent,
      },
      {
        path: 'modele',
        component: ModeleComponent,
      },
      {
        path: 'carosserie',
        component: CarosserieComponent,
      },
      {
        path: 'update-element/:id',
        component: TransportElementComponent,
      },
      {
        path: 'list-element',
        component: ListTransportElementsComponent,
      },
      {
        path: 'engin',
        children: [
          {
            path: 'engin-add',
            component: EnginAddComponent,
          },
          {
            path: 'engin-update/:id',
            component: EnginUpdateComponent,
          },
          {
            path: 'engin-all',
            component: EnginAllComponent,
          },
        ]
      },
      {
        path: 'transporter',
        children: [
          {
            path: 'transporter-add',
            component: TransporterAddComponent,
          },
          {
            path: 'transporter-all',
            component: TransporteurAllComponent,
          },
          {
            path: 'transporter-update/:id',
            component: TransporterUpdateComponent,
          },
          {
            path: 'driversandcars/:id',
            component: DriverandcardComponent,
          }
        ]
      },
      {
        path: 'add-element',
        component: AddTransportElementComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class SuperadminRoutingModule { }
