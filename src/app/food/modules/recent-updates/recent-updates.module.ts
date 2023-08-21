import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentUpdatesRoutingModule } from './recent-updates-routing.module';
import { RegulationsComponent } from './components/regulations/regulations.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';


@NgModule({
  declarations: [
    IngredientsComponent,
    RegulationsComponent
  ],
  imports: [
    CommonModule,
    RecentUpdatesRoutingModule
  ]
})
export class RecentUpdatesModule { }
