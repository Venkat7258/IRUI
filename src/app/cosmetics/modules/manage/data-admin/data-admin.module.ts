import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataAdminRoutingModule } from './data-admin-routing.module';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { DataImportComponent } from './data-import/data-import.component';
import { HistoryDataComponent } from './history-data/history-data.component';
import { FormsModule } from '@angular/forms';
import { MasterDataComponent } from './master-data/master-data.component';
import { CountriesComponent } from './countries/countries.component';
import { RegionsComponent } from './regions/regions.component';
import { RegulationstatuscosingComponent } from './regulationstatuscosing/regulationstatuscosing.component';
import { RuletypeCategoriesComponent } from './ruletype-categories/ruletype-categories.component';
import { RuletypesComponent } from './ruletypes/ruletypes.component';
import { SubscriptionPriceDetailsComponent } from './subscription-price-details/subscription-price-details.component';
import { ConditiontypesComponent } from './conditiontypes/conditiontypes.component';
import { SubstancedatasourcesComponent } from './substancedatasources/substancedatasources.component';
import { ImporttypecosmeticsComponent } from './importtypecosmetics/importtypecosmetics.component';
import { RegulationstatuschemComponent } from './regulationstatuschem/regulationstatuschem.component';




@NgModule({
  declarations: [
    DataImportComponent,
    HistoryDataComponent,
    MasterDataComponent,
    CountriesComponent,
    RegionsComponent,
    RegulationstatuscosingComponent,
    RuletypeCategoriesComponent,
    RuletypesComponent,
    SubscriptionPriceDetailsComponent,
    ConditiontypesComponent,
    SubstancedatasourcesComponent,
    ImporttypecosmeticsComponent,
    RegulationstatuschemComponent
    
    
  ],
  imports: [
    CommonSharedModule,
    DataAdminRoutingModule 
  ]
})
export class DataAdminModule { }
