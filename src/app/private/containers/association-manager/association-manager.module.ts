import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { AssociationManagerRoutingModule } from './association-manager.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { IndexComponent } from './containers/index/index.component';
import { LeftSideComponent } from './containers/index/left-side/left-side.component';
import { NavBarComponent } from './containers/index/nav-bar/nav-bar.component';
import { MyParishComponent } from './containers/my-parish/my-parish.component';
import { Info1Component } from './containers/info1/info1.component';

@NgModule({
  declarations: [
    IndexComponent, RandomNumberComponent, NavBarComponent, LeftSideComponent,
    MyParishComponent, Info1Component
  ],
  imports: [
    CommonModule,
    AssociationManagerRoutingModule,
    TranslateModule,
  ],
  providers: [
  ]
})
export class AssociationManagerModule { }
