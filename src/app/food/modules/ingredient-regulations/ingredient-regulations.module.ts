import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientRegulationsRoutingModule } from './ingredient-regulations-routing.module';
import { IngredientsPrimaryComponent } from './components/ingredients-primary/ingredients-primary.component';
import { IngredientsSecondaryComponent } from './components/ingredients-secondary/ingredients-secondary.component';
import { RegulationsComponent } from './components/regulations/regulations.component';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
@NgModule({
  declarations: [
    IngredientsPrimaryComponent,
    IngredientsSecondaryComponent,
    RegulationsComponent
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    IngredientRegulationsRoutingModule
  ]
})
export class IngredientRegulationsModule { }
