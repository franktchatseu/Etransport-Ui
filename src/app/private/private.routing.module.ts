import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './containers/index/index.component';
import { CatechistGuard } from '../auth/guards/catechist.guard';
import { CathecumeneGuard } from '../auth/guards/cathecumene.guard';
import { OtherGuard } from '../auth/guards/other.guard';
import { ParishionalGuard } from '../auth/guards/parishional.guard';
import { PriestGuard } from '../auth/guards/priest.guard';
import { SuperadminGuard } from '../auth/guards/superadmin.guard';
import { AssociationManagerGuard } from '../auth/guards/association-manager.guard';
import { ParishionerSecretaryGuard } from '../auth/guards/parishioner-secretary.guard';
import { CathechesisCoordinatorGuard } from '../auth/guards/cathechesis-coordinator.guard';
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
        loadChildren: () => import('./containers/catechist/catechist.module').then(m => m.CatechistModule),
        canActivate: [CatechistGuard],
        canLoad: [CatechistGuard] /* */
      },
      {
        path: 'cathecumenes',
        loadChildren:
          () => import('./containers/cathecumene/cathecumene.module').then(m => m.CathecumeneModule),
        canActivate: [CathecumeneGuard],
        canLoad: [CathecumeneGuard] /* */
      },
      {
        path: 'others',
        loadChildren: () => import('./containers/other/other.module').then(m => m.OtherModule),
        canActivate: [OtherGuard],
        canLoad: [OtherGuard] /* */
      },
      {
        path: 'parishionals',
        loadChildren: () => import('./containers/parishional/parishional.module').then(m => m.ParishionalModule),
        canActivate: [ParishionalGuard],
        canLoad: [ParishionalGuard] /* */
      },
      {
        path: 'priests',
        loadChildren: () => import('./containers/priest/priest.module').then(m => m.PriestModule),
        canActivate: [PriestGuard],
        canLoad: [PriestGuard] /* */
      },
      {
        path: 'superadmins',
        loadChildren:
          () => import('./containers/superadmin/superadmin.module').then(m => m.SuperadminModule),
        canActivate: [SuperadminGuard],
        canLoad: [SuperadminGuard] /* */
      },
      {
        path: 'association-manager',
        loadChildren: () => import('./containers/association-manager/association-manager.module').then(m => m.AssociationManagerModule),
        canActivate: [AssociationManagerGuard],
        canLoad: [AssociationManagerGuard] /* */
      },
      {
        path: 'parishioner-secretary',
        loadChildren: () => import('./containers/parishioner-secretary/parishioner-secretary.module')
        .then(m => m.ParishionerSecretaryModule),
        canActivate: [ParishionerSecretaryGuard],
        canLoad: [ParishionerSecretaryGuard] /* */
      },
      {
        path: 'cathechesis-coordinator',
        loadChildren: () => import('./containers/cathechesis-coordinator/cathechesis-coordinator.module')
        .then(m => m.CathechesisCoordinatorModule),
        canActivate: [CathechesisCoordinatorGuard],
        canLoad: [CathechesisCoordinatorGuard] /* */
      },
      {
        path: 'cathechesis',
        loadChildren: () => import('./containers/cathechesis/cathechesis.module')
        .then(m => m.CathechesisModule),
        canActivate: [CathechesisCoordinatorGuard],
        canLoad: [CathechesisCoordinatorGuard] /* */
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
