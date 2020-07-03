import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { IndexComponent } from './containers/index/index.component';
import { AttributesComponent } from './containers/attributes/attributes.component';
import { ArticlesComponent } from './containers/articles/articles.component';
import { MenusComponent } from './containers/menus/menus.component';
import { SubmenusComponent } from './containers/submenus/submenus.component';
import { LiturgicalEntryTypesComponent } from './containers/liturgical/liturgical-entry-types/liturgical-entry-types.component';
import { LiturgicalTextsComponent } from './containers/liturgical/liturgical-texts/liturgical-texts.component';
import { EntryTypesComponent } from './containers/liturgical/entry-types/entry-types.component';
import { LiturgicalTypesComponent } from './containers/liturgical/liturgical-types/liturgical-types.component';

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
        path: 'attributes',
        component: AttributesComponent,
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
      },
      {
        path: 'entry-types',
        component: LiturgicalEntryTypesComponent,
      },
      {
        path: 'liturgical-texts',
        component: LiturgicalTextsComponent,
      },
      {
        path: 'liturgicals',
        component: EntryTypesComponent,
      },
      {
        path: 'types',
        component: LiturgicalTypesComponent,
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
