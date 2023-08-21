import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentUpdatesRoutingModule } from './recent-updates-routing.module';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { RegulationsComponent } from './components/regulations/regulations.component';
import {InputMaskModule} from 'primeng/inputmask';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from '../../shared/shared.module';
//import { IngredientsRegulationsService } from '../../services/ingredients-regulations.service';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';


@NgModule({
  declarations: [
    IngredientsComponent,
    RegulationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecentUpdatesRoutingModule,
    InputMaskModule,
    CardModule,
    InputTextModule,
    CascadeSelectModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    TabViewModule,
    SharedModule,
   // IngredientsRegulationsService,
    CommonSharedModule
  ]
})
export class RecentUpdatesModule { }
