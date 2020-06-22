import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
import { ParishionalRoutingModule } from './parishional.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { IndexComponent } from './containers/index/index.component';
import { LeftSideComponent } from './containers/index/left-side/left-side.component';
import { NavBarComponent } from './containers/index/nav-bar/nav-bar.component';
import { MessageService } from 'src/app/services/message.service';
import { MyParishComponent } from './containers/my-parish/my-parish.component';
import { Info1Component } from './containers/info1/info1.component';
import { WriteToPriestComponent } from './containers/write-to-priest/write-to-priest.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IndexComponent, RandomNumberComponent, NavBarComponent, LeftSideComponent,
    MyParishComponent, Info1Component, WriteToPriestComponent,
  ],
  imports: [
    CommonModule,
    ParishionalRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService
  ]
})
export class ParishionalModule { }
