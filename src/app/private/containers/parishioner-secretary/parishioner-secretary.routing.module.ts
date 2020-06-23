import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { IndexComponent } from './containers/index/index.component';
import { MyParishComponent } from './containers/my-parish/my-parish.component';
import { Info1Component } from './containers/info1/info1.component';
import { EvenementUpdateComponent } from './containers/evenements/evenement-update/evenement-update.component';
import { EvenementDetailComponent } from './containers/evenements/evenement-detail/evenement-detail.component';
import { EvenementsAllComponent } from '../parishioner-secretary/containers/evenements/evenements-all/evenements-all.component';
import { EvenementAddComponent } from '../parishioner-secretary/containers/evenements/evenement-add/evenement-add.component';

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
        path: 'my-parishs',
        component: MyParishComponent,
      },
      {
        path: 'info1',
        component: Info1Component,
      }
      ,
      {
        path: 'evenements',
        children: [
          {
            path: 'all',
            component: EvenementsAllComponent,
          },
          {
            path: 'add',
            component: EvenementAddComponent,
          },
          {
            path: 'update/:id',
            component: EvenementUpdateComponent,
          },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ParishionerSecretaryRoutingModule { }