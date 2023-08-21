import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloneFormulaComponent } from './components/foumula-sample-formula/clone-formula/clone-formula.component';
import { EditFormulaComponent } from './components/foumula-sample-formula/edit-formula/edit-formula.component';
import { FoumulaMainPageComponent } from './components/foumula-sample-formula/foumula-main-page/foumula-main-page.component';
import { ViewFormulaComponent } from './components/foumula-sample-formula/view-formula/view-formula.component';
import { SampleFormulaMainPageComponent } from './components/foumula-sample-formula/sample-formula-main-page/sample-formula-main-page.component';
import { ComplianceMainPageComponent } from './components/foumula-sample-formula/compliance-main-page/compliance-main-page.component';

const routes: Routes = [
  {
    path: '',
    component: FoumulaMainPageComponent
  },
  { path: 'formulae', component: FoumulaMainPageComponent },
  { path: 'formula/editformula', component: EditFormulaComponent },
  { path: 'formula/addformula', component: EditFormulaComponent },
  { path: 'formula/cloneformula', component: CloneFormulaComponent },
  { path: 'formula/viewformula', component: ViewFormulaComponent },
  { path: 'formula/compliance', component: ComplianceMainPageComponent },  

  { path: 'sampleformula', component: SampleFormulaMainPageComponent },
  { path: 'sampleformula/editformula', component: EditFormulaComponent },
  { path: 'sampleformula/addformula', component: EditFormulaComponent },
  { path: 'sampleformula/cloneformula', component: CloneFormulaComponent },
  { path: 'sampleformula/viewformula', component: ViewFormulaComponent },  
  { path: 'sampleformula/compliance', component: ComplianceMainPageComponent },  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulaComplianceRoutingModule { }
