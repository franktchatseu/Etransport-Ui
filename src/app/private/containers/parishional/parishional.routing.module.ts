import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { UpdatePersonnalInfoComponent } from './containers/update-personnal-info/update-personnal-info.component';
import { IndexComponent } from './containers/index/index.component';
import { MyParishComponent } from './containers/my-parish/my-parish.component';
import { Info1Component } from './containers/info1/info1.component';

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
        path: 'modify-personnal-informations',
        component: UpdatePersonnalInfoComponent,
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
export class ParishionalRoutingModule { }
