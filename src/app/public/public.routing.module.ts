import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './containers/index/index.component';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
// import { RegisterComponent } from './containers/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      // {
      //   path: 'register',
      //   component: RegisterComponent
      //   // canActivate: [AuthGuard] /* */
      // },
      {
        path: 'random-number',
        component: RandomNumberComponent
        // canActivate: [AuthGuard] /* */
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
export class PublicRoutingModule { }
