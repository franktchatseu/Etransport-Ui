import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public.routing.module';
import { IndexComponent } from './containers/index/index.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RandomNumberComponent } from './containers/random-number/random-number.component';
// import { RegisterComponent } from './containers/register/register.component';
@NgModule({
  declarations: [
    IndexComponent, RandomNumberComponent, 
    // RegisterComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class PublicModule { }
