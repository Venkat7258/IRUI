import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulaComplianceRoutingModule } from './formula-compliance-routing.module';
import { FoumulaMainPageComponent } from './components/foumula sample-formula/foumula-main-page/foumula-main-page.component';
import { ComplianceMainPageComponent } from './components/foumula sample-formula/compliance-main-page/compliance-main-page.component';
import { MapviewMainPageComponent } from './components/foumula sample-formula/mapview-main-page/mapview-main-page.component';
import { ProductInfoComponent } from './components/foumula sample-formula/product-info/product-info.component';
import { IngredientsGridComponent } from './components/foumula sample-formula/ingredients-grid/ingredients-grid.component';
import { AddIngredintsComponent } from './components/foumula sample-formula/add-ingredints/add-ingredints.component';
import { AddCustomIngredientsComponent } from './components/foumula sample-formula/add-custom-ingredients/add-custom-ingredients.component';
import { EditFormulaComponent } from './components/foumula sample-formula/edit-formula/edit-formula.component';
import { ViewFormulaComponent } from './components/foumula sample-formula/view-formula/view-formula.component';
import { CloneFormulaComponent } from './components/foumula sample-formula/clone-formula/clone-formula.component';
import { ImportMainPageComponent } from './components/import/import-main-page/import-main-page.component';
import { CustomIngredientsMainPageComponent } from './components/custom-ingredients/custom-ingredients-main-page/custom-ingredients-main-page.component';
import { CustomIngredientsCreatePageComponent } from './components/custom-ingredients/custom-ingredients-create-page/custom-ingredients-create-page.component';
import { CustomIngredientsEditPageComponent } from './components/custom-ingredients/custom-ingredients-edit-page/custom-ingredients-edit-page.component';
import { CustomIngredientsViewPageComponent } from './components/custom-ingredients/custom-ingredients-view-page/custom-ingredients-view-page.component';
@NgModule({
  declarations: [
    FoumulaMainPageComponent,
    ComplianceMainPageComponent,
    MapviewMainPageComponent,
    ProductInfoComponent,
    IngredientsGridComponent,
    AddIngredintsComponent,
    AddCustomIngredientsComponent,
    EditFormulaComponent,
    ViewFormulaComponent,
    CloneFormulaComponent,
    ImportMainPageComponent,
    CustomIngredientsMainPageComponent,
    CustomIngredientsCreatePageComponent,
    CustomIngredientsEditPageComponent,
    CustomIngredientsViewPageComponent
  ],
  imports: [    
    CommonModule,
    FormulaComplianceRoutingModule,
  ]
})
export class FormulaComplianceModule { }
