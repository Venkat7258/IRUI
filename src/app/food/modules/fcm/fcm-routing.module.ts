import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FcmComponent } from './components/fcm/fcm.component';

const routes: Routes = [
  {
    path:"",
    component:FcmComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FcmRoutingModule { }
