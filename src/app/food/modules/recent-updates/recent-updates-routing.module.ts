import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegulationsComponent } from './components/regulations/regulations.component';

const routes: Routes = [
  {
    path:"",
    component:RegulationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentUpdatesRoutingModule { }
