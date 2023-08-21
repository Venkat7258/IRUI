import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ManageRoutingModule,
    CommonSharedModule
  ]
})
export class ManageModule { }
