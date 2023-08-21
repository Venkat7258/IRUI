import { NgModule } from '@angular/core';
import { IngredientsRegulationsRoutingModule } from './ingredients-regulations-routing.module';
import { RegulationsComponent } from './components/regulations/regulations.component';
import { SharedModule } from '../../shared/shared.module';
import { IngredientsRegulationsService } from '../../services/ingredients-regulations.service';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { MapComponent } from './components/map/map.component';
@NgModule({
  declarations: [
    RegulationsComponent,
    IngredientsComponent,
    MapComponent,
  ],

  imports: [
    SharedModule,
    IngredientsRegulationsRoutingModule,
    CommonSharedModule
  ],
  providers: [IngredientsRegulationsService]
})
export class IngredientsRegulationsModule { }
