import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataImportComponent } from './data-import/data-import.component';
import { HistoryDataComponent } from './history-data/history-data.component';
import { MasterDataComponent } from './master-data/master-data.component';

const routes: Routes = [
  {
    path: '',
    component: DataImportComponent 
  },
  {
    path: 'dataimport',
    component: DataImportComponent 
  },
  {
    path: 'historydata',
    component: HistoryDataComponent
  },
  {
    path: 'masterdata',
    component: MasterDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataAdminRoutingModule { }
