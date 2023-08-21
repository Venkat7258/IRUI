import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { IngDetailsComponent } from './components/ing-details/ing-details.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { CommonListModalComponent } from './modals/common-list-modal/common-list-modal.component';
import { StringDataPopUpWithActionComponent } from './components/string-datapopup-with-action/string-datapopup-with-action.component';
@NgModule({
  declarations: [
    CountryDetailsComponent,
    IngDetailsComponent,
    MapViewComponent,
    CommonListModalComponent,
    StringDataPopUpWithActionComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedRoutingModule,
    CommonSharedModule
  ],
  exports: [IngDetailsComponent,CountryDetailsComponent,CommonListModalComponent,StringDataPopUpWithActionComponent],

})
export class SharedModule { }
