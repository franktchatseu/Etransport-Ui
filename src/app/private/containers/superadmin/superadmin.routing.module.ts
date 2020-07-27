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
