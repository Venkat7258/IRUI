import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'formulacompliance',
    loadChildren: () => import('./formula-compliance/formula-compliance.module').then(m => m.FormulaComplianceModule)
  },
  {
    path: 'recentupdates',
    loadChildren: () => import('./recent-updates/recent-updates.module').then(m => m.RecentUpdatesModule)
  },
  {
    path: 'ingredients',
    loadChildren: () => import('./ingredients-regulations/ingredients-regulations.module').then(m => m.IngredientsRegulationsModule)
  },
  {
    path: 'manage',
    loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CosmeticsRoutingModule { }
