import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {
  ingredientMasterData: any[];
  masterDataTypes: any[] = [];
  masterData: any[] = [];
  isCountries: boolean = false;
  isRegions: boolean = false;
  isRegulationsStatusCosing: boolean = false;
  isRuletypecategories: boolean=false;
  isRuletypes: boolean=false;
  isSubscriptionPriceDetails: boolean=false;
  isConditionTypes: boolean = false;
  isAddImportTypesCosmetics: boolean = false;
  isAddRegulationStatusChem: boolean = false;
  isAddSubstanceDataSources: boolean = false;

  selectedMasterDataType: any = {};
  selectedMasterData: any = {};
  selectedIMD: any = {};
  countries: any[];
  regions: any[];
  selectedCountry: any = {};
  constructor(public _appService: AppService, private ireadyApi: IreadyApiService) { }
  ngOnInit() {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setSideMenuShow(true);
    this._appService.setHeaderTitle("Ingredient Regulations");
    this.masterDataTypes = [{ name: 'Ingredient Master Data', code: 'IMD' },
    { name: 'Rules Master Data', code: 'RMD' }];

    this.ingredientMasterData = [{ name: 'Countries', code: 'CO' },
    { name: 'Regions', code: 'RG' },
    { name: 'RegulationsStatusCosing', code: 'RS' },
    { name:'Ruletypecategories', code: 'RC'},
    { name:'Ruletypes', code: 'RT'},
    { name:'SubscriptionPriceDetails', code: 'SP'},
    { name:'Importtypecosmetics', code: 'IT'},
    { name:'Substancedatasources', code: 'SD'},
    { name:'Regulationstatuschem', code: 'RSC'},
    { name:'ConditionTypes', code: 'CT'}];
    this.countries = [
      { name: 'Rule Types', code: 'RT' },
      { name: 'Rule IO Params', code: 'RIOP' }
    ];
  }
  onMasterData(event)
  {
    if (event.value.code == 'CO') {
      this.isCountries = true;
      this.isRegions = false;
      this.isRegulationsStatusCosing = false;
      this.isRuletypecategories=false;
      this.isRuletypes=false;
      this.isSubscriptionPriceDetails=false;
      this.isConditionTypes=false;
      this.isAddImportTypesCosmetics=false;
      this.isAddRegulationStatusChem=false;
      this.isAddSubstanceDataSources=false;


    } else if (event.value.code == 'RG') {
      this.isCountries = false;
      this.isRegions = true;
      this.isRegulationsStatusCosing = false;
      this.isRuletypecategories=false;
      this.isRuletypes=false;
      this.isSubscriptionPriceDetails=false;
      this.isConditionTypes=false;
      this.isAddImportTypesCosmetics=false;
      this.isAddRegulationStatusChem=false;
      this.isAddSubstanceDataSources=false;


    } 
    else if (event.value.code == 'RS') {
      this.isCountries = false;
      this.isRegions = false;
      this.isRegulationsStatusCosing = true;
      this.isRuletypecategories=false;
      this.isRuletypes=false;
      this.isSubscriptionPriceDetails=false;
      this.isConditionTypes=false;
      this.isAddImportTypesCosmetics=false;
      this.isAddRegulationStatusChem=false;
      this.isAddSubstanceDataSources=false;


    }
    else if (event.value.code == 'RC') {
      this.isCountries = false;
      this.isRegions = false;
      this.isRegulationsStatusCosing = false;
      this.isRuletypecategories=true;
      this.isRuletypes=false;
      this.isSubscriptionPriceDetails=false;
      this.isConditionTypes=false;
      this.isAddImportTypesCosmetics=false;
      this.isAddRegulationStatusChem=false;
      this.isAddSubstanceDataSources=false;


    }
    else if (event.value.code == 'RT') {
      this.isCountries = false;
      this.isRegions = false;
      this.isRegulationsStatusCosing = false;
      this.isRuletypecategories=false;
      this.isRuletypes=true;
      this.isSubscriptionPriceDetails=false;
      this.isConditionTypes=false;
      this.isAddImportTypesCosmetics=false;
      this.isAddRegulationStatusChem=false;
      this.isAddSubstanceDataSources=false;


    }
    else if (event.value.code == 'SP') {
      this.isCountries = false;
      this.isRegions = false;
      this.isRegulationsStatusCosing = false;
      this.isRuletypecategories=false;
      this.isRuletypes=false;
      this.isSubscriptionPriceDetails=true;
      this.isConditionTypes=false;
      this.isAddImportTypesCosmetics=false;
      this.isAddRegulationStatusChem=false;
      this.isAddSubstanceDataSources=false;


    }
    else if (event.value.code == 'CT') {
      this.isCountries = false;
      this.isRegions = false;
      this.isRegulationsStatusCosing = false;
      this.isRuletypecategories=false;
      this.isRuletypes=false;
      this.isSubscriptionPriceDetails=false;
      this.isConditionTypes=true;
      this.isAddImportTypesCosmetics=false;
      this.isAddSubstanceDataSources=false;
      this.isAddRegulationStatusChem=false;

    }
    else if (event.value.code == 'RSC') {
      this.isCountries = false;
      this.isRegions = false;
      this.isRegulationsStatusCosing = false;
      this.isRuletypecategories=false;
      this.isRuletypes=false;
      this.isSubscriptionPriceDetails=false;
      this.isConditionTypes=false;
      this.isAddRegulationStatusChem=true;
      this.isAddImportTypesCosmetics=false;
      this.isAddSubstanceDataSources=false;

    }
    else if (event.value.code == 'SD') {
      this.isCountries = false;
      this.isRegions = false;
      this.isRegulationsStatusCosing = false;
      this.isRuletypecategories=false;
      this.isRuletypes=false;
      this.isSubscriptionPriceDetails=false;
      this.isConditionTypes=false;
      this.isAddSubstanceDataSources=true;
      this.isAddRegulationStatusChem=false;
      this.isAddImportTypesCosmetics=false;

    }
    else if (event.value.code == 'IT') {
      this.isCountries = false;
      this.isRegions = false;
      this.isRegulationsStatusCosing = false;
      this.isRuletypecategories=false;
      this.isRuletypes=false;
      this.isSubscriptionPriceDetails=false;
      this.isConditionTypes=false;
      this.isAddImportTypesCosmetics=true;
      this.isAddSubstanceDataSources=false;
      this.isAddRegulationStatusChem=false;

    }
   
  }
  onMasterDataType(event) {
    if (event.value.code == 'IMD') {
      this.masterData = this.ingredientMasterData;
    }
    else {
      this.masterData = this.countries;
    }
  }
}