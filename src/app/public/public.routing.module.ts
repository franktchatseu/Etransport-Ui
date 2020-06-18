import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './containers/index/index.component';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { RegisterComponent } from './containers/register/register.component';
import { ListUsersComponent } from './containers/list-users/list-users.component';
import { DetailsUserComponent } from './containers/details-user/details-user.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent
        // canActivate: [AuthGuard] /* */
      },
      {
        path: 'random-number',
        component: RandomNumberComponent
        // canActivate: [AuthGuard] /* */
      },
      {
        path: 'list-users',
        component: ListUsersComponent
        // canActivate: [AuthGuard] /* */
      },
      {
        path: 'details-user/:id',
        component: DetailsUserComponent
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
