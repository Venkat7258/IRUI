import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';


@NgModule({
  declarations: [],
  imports: [
    DashboardRoutingModule,
    CommonSharedModule
  ]
})
export class DashboardModule { }
