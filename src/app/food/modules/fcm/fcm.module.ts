import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FcmRoutingModule } from './fcm-routing.module';
import { FcmComponent } from './components/fcm/fcm.component';
@NgModule({
  declarations: [
    FcmComponent
  ],
  imports: [
    CommonModule,
    FcmRoutingModule
  ]
})
export class FcmModule { }
