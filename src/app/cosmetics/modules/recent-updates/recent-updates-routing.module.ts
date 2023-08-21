import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { RegulationsComponent } from './components/regulations/regulations.component';

const routes: Routes = [
  {
    path:'',
    component:IngredientsComponent
  },
  {
    path:'ingredients',
    component:IngredientsComponent
  },
  {
    path: 'regulations',
    component: RegulationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentUpdatesRoutingModule { }
