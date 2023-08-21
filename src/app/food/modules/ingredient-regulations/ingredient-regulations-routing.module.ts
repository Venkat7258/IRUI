import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsSecondaryComponent } from './components/ingredients-secondary/ingredients-secondary.component';

const routes: Routes = [
  {
    path:"",
    component:IngredientsSecondaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientRegulationsRoutingModule { }
