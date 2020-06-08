import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'public' },
  {
    path: 'private',
    loadChildren:
      './private/private.module#PrivateModule',
  },
  {
    path: 'public',
    loadChildren:
      './public/public.module#PublicModule',
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
