import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { IndexComponent } from './containers/index/index.component';
import { ArticlesComponent } from './containers/actualities/articles/articles.component';
import { MenusComponent } from './containers/actualities/menus/menus.component';
import { SubmenusComponent } from './containers/actualities/submenus/submenus.component';

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
        path: 'articles',
        component: ArticlesComponent,
      },
      {
        path: 'menus',
        component: MenusComponent,
      },
      {
        path: 'submenus',
        component: SubmenusComponent,
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
