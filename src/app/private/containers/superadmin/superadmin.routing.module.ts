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
import { DriverAllComponent } from "./containers/driver/driver-all/driver-all.component";
import { DriverDetailsComponent} from './containers/driver/driver-details/driver-details.component';
import { TransporterAddComponent} from './containers/transporteur/transporter-add/transporter-add.component';


import { EnginAddComponent} from './containers/engin/engin-add/engin-add.component';

import { EnginAllComponent} from './containers/engin/engin-all/engin-all.component';
import { TransportElementComponent } from './containers/element-transport/transport-element/transport-element.component';
import { ListTransportElementsComponent } from './containers/element-transport/list-transport-elements/list-transport-elements.component';
//import { AddTransportElementComponent } from './containers/element-transport/add-transport-element/add-transport-element.component';

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
        path: 'driver-add/:stepper_number',
        component: DriverAddComponent,
      },
      {
        path: 'driver-detail/:id',
        component: DriverDetailsComponent,
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
        path: 'element',
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
          }
        ]
      }
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
