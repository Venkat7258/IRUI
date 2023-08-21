import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path: 'cosmetics',
    loadChildren: () => import('./cosmetics/modules/cosmetics.module').then(m => m.CosmeticsModule)
  },
  {
    path: 'food',
    loadChildren: () => import('./food/modules/food.module').then(m => m.FoodModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
