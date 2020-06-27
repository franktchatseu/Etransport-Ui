import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { SuperadminRoutingModule } from './superadmin.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './containers/index/nav-bar/nav-bar.component';
import { LeftSideComponent } from './containers/index/left-side/left-side.component';
import { IndexComponent } from './containers/index/index.component';
import { ArticlesComponent } from './containers/articles/articles.component';
import { AttributesComponent } from './containers/attributes/attributes.component';
import { MenusComponent } from './containers/menus/menus.component';
import { SubmenusComponent } from './containers/submenus/submenus.component';

@NgModule({
  declarations: [
    IndexComponent,
    RandomNumberComponent,
    NavBarComponent,
    LeftSideComponent,
    ArticlesComponent,
    AttributesComponent,
    MenusComponent,
    SubmenusComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    TranslateModule,
  ]
})
export class SuperadminModule { }
