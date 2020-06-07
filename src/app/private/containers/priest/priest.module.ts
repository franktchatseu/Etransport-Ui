import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { PriestRoutingModule } from './priest.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './containers/index/nav-bar/nav-bar.component';
import { IndexComponent } from './containers/index/index.component';
import { LeftSideComponent } from './containers/index/left-side/left-side.component';

@NgModule({
  declarations: [
    IndexComponent,
    NavBarComponent,
    LeftSideComponent,
    RandomNumberComponent
  ],
  imports: [
    CommonModule,
    PriestRoutingModule,
    TranslateModule,
  ]
})
export class PriestModule { }
