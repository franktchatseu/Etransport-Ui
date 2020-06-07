import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './containers/index/index.component';
import { CatechistGuard } from '../auth/guards/catechist.guard';
import { CathecumeneGuard } from '../auth/guards/cathecumene.guard';
import { OtherGuard } from '../auth/guards/other.guard';
import { ParishionalGuard } from '../auth/guards/parishional.guard';
import { PriestGuard } from '../auth/guards/priest.guard';
import { SuperadminGuard } from '../auth/guards/superadmin.guard';
import { LoginComponent } from '../auth/containers/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
        // canActivate: [AuthGuard] /* */
      },
      {
        path: 'catechists',
        loadChildren: './containers/catechist/catechist.module#CatechistModule',
        canActivate: [CatechistGuard],
        canLoad: [CatechistGuard] /* */
      },
      {
        path: 'cathecumenes',
        loadChildren:
          './containers/cathecumene/cathecumene.module#CathecumeneModule',
        canActivate: [CathecumeneGuard],
        canLoad: [CathecumeneGuard] /* */
      },
      {
        path: 'others',
        loadChildren: './containers/other/other.module#OtherModule',
        canActivate: [OtherGuard],
        canLoad: [OtherGuard] /* */
      },
      {
        path: 'parishionals',
        loadChildren: './containers/parishional/parishional.module#ParishionalModule',
        canActivate: [ParishionalGuard],
        canLoad: [ParishionalGuard] /* */
      },
      {
        path: 'priests',
        loadChildren: './containers/priest/priest.module#PriestModule',
        canActivate: [PriestGuard],
        canLoad: [PriestGuard] /* */
      },
      {
        path: 'superadmins',
        loadChildren:
          './containers/superadmin/superadmin.module#SuperadminModule',
        canActivate: [SuperadminGuard],
        canLoad: [SuperadminGuard] /* */
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
export class PrivateRoutingModule { }
