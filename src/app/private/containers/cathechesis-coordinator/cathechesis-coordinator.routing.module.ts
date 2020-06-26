import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { IndexComponent } from './containers/index/index.component';
import { MyParishComponent } from './containers/my-parish/my-parish.component';
import { Info1Component } from './containers/info1/info1.component';
import { CreateSacramentComponent } from './containers/sacraments/create-sacrament/create-sacrament.component';
import { UpdateSacramentComponent } from './containers/sacraments/update-sacrament/update-sacrament.component';
import { ListSacramentsComponent } from './containers/sacraments/list-sacraments/list-sacraments.component';
import { CathechistAllComponent } from './containers/cathechists/cathechist-all/cathechist-all.component';
import { CathechistAddComponent } from './containers/cathechists/cathechist-add/cathechist-add.component';
import { CathechumenAddComponent } from './containers/cathechumen/cathechumen-add/cathechumen-add.component';
import { CathechumenAllComponent } from './containers/cathechumen/cathechumen-all/cathechumen-all.component';
import { CathechumenDetailComponent } from './containers/cathechumen/cathechumen-detail/cathechumen-detail.component'

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
      },
      {
        path: 'sacrament',
        children: [
          {
            path: 'add',
            component: CreateSacramentComponent,
          },
          {
            path: 'all',
            component: ListSacramentsComponent,
          },
          {
            path: 'update/:id',
            component: UpdateSacramentComponent,
          },
        ]
      }
      ,
      {
        path: 'cathechists',
        children: [
          {
            path: 'add',
            component: CathechistAddComponent,
          },
          {
            path: 'all',
            component: CathechistAllComponent,
          }
        ]
      }
      ,
      {
        path: 'cathechumen',
        children: [
          {
            path: 'add',
            component: CathechumenAddComponent,
          },
          {
            path: 'all',
            component: CathechumenAllComponent,
          }
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
export class CathechesisCoordinatorRoutingModule { }
