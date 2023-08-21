import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomIngredientsMainPageComponent } from './components/custom-ingredients/custom-ingredients-main-page/custom-ingredients-main-page.component';
import { FoumulaMainPageComponent } from './components/foumula sample-formula/foumula-main-page/foumula-main-page.component';
import { ImportMainPageComponent } from './components/import/import-main-page/import-main-page.component';

const routes: Routes = [
  {
    path:"",
    component:FoumulaMainPageComponent
  },
  {
    path:"import",
    component:ImportMainPageComponent
  },
  {
    path:"customingredients",
    component:CustomIngredientsMainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulaComplianceRoutingModule { }
