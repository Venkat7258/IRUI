import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormulaComplianceRoutingModule } from './formula-compliance-routing.module';
import { FoumulaMainPageComponent } from './components/foumula-sample-formula/foumula-main-page/foumula-main-page.component';
import { ComplianceMainPageComponent } from './components/foumula-sample-formula/compliance-main-page/compliance-main-page.component';
import { MapviewMainPageComponent } from './components/foumula-sample-formula/mapview-main-page/mapview-main-page.component';
import { FormulaAssessmentMainPageComponent } from './components/foumula-sample-formula/formula-assessment-main-page/formula-assessment-main-page.component';
import { FormulaAssessmentDetailsPageComponent } from './components/foumula-sample-formula/formula-assessment-details-page/formula-assessment-details-page.component';
import { ProductInfoComponent } from './components/foumula-sample-formula/product-info/product-info.component';
import { IngredientsGridComponent } from './components/foumula-sample-formula/ingredients-grid/ingredients-grid.component';
import { AddIngredintsComponent } from './components/foumula-sample-formula/add-ingredints/add-ingredints.component';
import { AddCustomIngredientsComponent } from './components/foumula-sample-formula/add-custom-ingredients/add-custom-ingredients.component';
import { EditFormulaComponent } from './components/foumula-sample-formula/edit-formula/edit-formula.component';
import { ViewFormulaComponent } from './components/foumula-sample-formula/view-formula/view-formula.component';
import { CloneFormulaComponent } from './components/foumula-sample-formula/clone-formula/clone-formula.component';
import { ListCheckDetailsPageComponent } from './components/list-check/list-check-details-page/list-check-details-page.component';
import { ListCheckFormulaPageComponent } from './components/list-check/list-check-formula-page/list-check-formula-page.component';
import { ImportMainPageComponent } from './components/import/import-main-page/import-main-page.component';
import { CustomIngredientsMainPageComponent } from './components/custom-ingredients/custom-ingredients-main-page/custom-ingredients-main-page.component';
import { CustomIngredientsCreatePageComponent } from './components/custom-ingredients/custom-ingredients-create-page/custom-ingredients-create-page.component';
import { CustomIngredientsEditPageComponent } from './components/custom-ingredients/custom-ingredients-edit-page/custom-ingredients-edit-page.component';
import { CustomIngredientsViewPageComponent } from './components/custom-ingredients/custom-ingredients-view-page/custom-ingredients-view-page.component';
import { SampleFormulaMainPageComponent } from './components/foumula-sample-formula/sample-formula-main-page/sample-formula-main-page.component';
import { FoumulaSampleFormulaListComponent } from '../../shared/components/formula-compliance/foumula-sample-formula-list/foumula-sample-formula-list.component';
import { FormulaSampleFormulaCRUDComponent } from '../../shared/components/formula-compliance/formula-sample-formula-crud/formula-sample-formula-crud.component';
import { ComplianceComponent } from '../../shared/components/formula-compliance/compliance/compliance.component';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    FoumulaMainPageComponent,
    ComplianceMainPageComponent,
    MapviewMainPageComponent,
    FormulaAssessmentMainPageComponent,
    FormulaAssessmentDetailsPageComponent,
    ProductInfoComponent,
    IngredientsGridComponent,
    AddIngredintsComponent,
    AddCustomIngredientsComponent,
    EditFormulaComponent,
    ViewFormulaComponent,
    CloneFormulaComponent,
    ListCheckDetailsPageComponent,
    ListCheckFormulaPageComponent,
    ImportMainPageComponent,
    CustomIngredientsMainPageComponent,
    CustomIngredientsCreatePageComponent,
    CustomIngredientsEditPageComponent,
    CustomIngredientsViewPageComponent,
    FormulaSampleFormulaCRUDComponent,
    FoumulaSampleFormulaListComponent,
    SampleFormulaMainPageComponent,
    ComplianceComponent,
  ],
  imports: [
    CommonSharedModule,
    FormulaComplianceRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormulaComplianceModule { }
