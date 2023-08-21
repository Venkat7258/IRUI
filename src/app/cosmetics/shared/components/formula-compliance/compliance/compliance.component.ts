import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Formula, FormulaSpec } from 'src/app/cosmetics/models/fomulea';
import { ResponseData } from 'src/app/cosmetics/models/response-data';
import { FormulaComplianceService } from 'src/app/cosmetics/services/formula-compliance.service';
import { IngredientsRegulationsService } from 'src/app/cosmetics/services/ingredients-regulations.service';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import * as _ from 'lodash';
import { ChemRegData, Flags, IngData, IngRegData, Ingredients } from 'src/app/cosmetics/models/ingredients';
import { NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DropDownTextValueModel } from '../../../models/drop-down-text-value-model';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.css']
})
export class ComplianceComponent implements OnInit, OnDestroy {
  @Input() isSampleFormula: boolean = false;
  @Input() selectedFormulaID: string = '';
  formulaIngredients: { ingredientName: string, givenName: string, casNo: string, cosmeticsRegulatoryStatus: string }[] = [];

  CountryList: Array<any> = [];

  countriesDropDown: Array<DropDownTextValueModel> = [];
  selectedCountry: string;

  visibleSidebar2 :boolean= false;
  objIngredients: Ingredients = new Ingredients();
  countries: IngRegData[] = [];
  physicalProperties: any[] = [];
  toxicityData: any[] = [];
  countryRegulations: IngRegData = new IngRegData();
  ingredientsRegulationobj: IngData = new IngData();
  chemRegData: ChemRegData = new ChemRegData();
  isChemRegData: boolean = false;
  flagsDetails: Flags = new Flags();
  isCountryRegulations: boolean = true;
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  isHideControl: boolean;
  countryName: string;
  selectedIngredientName: string;
  selectedIngredient: any = null;

  isCountriesLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isIngredientsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  subscriptions: Subscription[] = [];
  formula: Formula;
  ingredients: any;
  selectedCountryRequlation: IngRegData = null;

  constructor(public _appService: AppService, private ireadyApi: IreadyApiService, private _fcs: FormulaComplianceService, private _irs: IngredientsRegulationsService) { }


  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setSideMenuShow(true);
    this._appService.setHeaderTitle("");

    this.GetAllCountries();

    this.trackData();
  }

  GetAllCountries() {
    this._fcs.GetAllCountries().subscribe((response: any) => {

      let multiCountryList = _.filter(response.data, (ele) => { return ele.isMutiCountry === true });
      let orderedMultiCountryList = _.orderBy(multiCountryList, ['countryName'], ['asc']);

      let notMultiCountryList = _.filter(response.data, (ele) => { return ele.isMutiCountry === false });
      let notOrderedMultiCountryList = _.orderBy(notMultiCountryList, ['countryName'], ['asc'])
      orderedMultiCountryList.push(...notOrderedMultiCountryList);

      this.CountryList = orderedMultiCountryList;
      this.GetFormulaById(this.selectedFormulaID);
      this.isCountriesLoaded.next(true);

    }, (error) => {

    });
  }
  GetFormulaById(formulaID: string) {
    this._fcs.GetFormulaById(formulaID).subscribe((response: ResponseData<Formula>) => {
      this.formula = response.data;
      this.isIngredientsLoaded.next(true);
    }, (error) => {

    });
  }

  trackData() {
    let subs = this.isCountriesLoaded.subscribe((result: boolean) => {
      if (result) {
        if (this.CountryList.length > 0) {
          this.setSelectedCountry(this.CountryList[0].countryName);
        }
        let countriesDropDown = this.countriesDropDown;
        _.each(this.CountryList, function (country) {
          countriesDropDown.push({
            text: country.countryName,
            // value: country.countryCode
            value: country.countryName
          })
        });
        this.countriesDropDown = countriesDropDown;
      }


    });
    this.subscriptions.push(subs);

    let formulaSubs = this.isIngredientsLoaded.subscribe((result: boolean) => {
      if (result) {
        this.getFormulaIngredients(this.formula.formulaSpecs);
      }
    });

  }

  GetRegulations2() {
    this.objIngredients = JSON.parse(this.ireadyApi.getStorage("ingredients"));
    this.countries = this.objIngredients.ingRegData;

    // let selectedCountryRequlation = this.selectedCountryRequlation 
    let selectedCountry = this.selectedCountry;
    let _ingRegData: IngRegData = this.getIngRegDataByCountryName(this.objIngredients, selectedCountry);


    this.countryRegulations = _ingRegData;
    this.ingredientsRegulationobj = this.objIngredients.ingData;
    this.flagsDetails = (this.objIngredients.ingFlags != undefined && this.objIngredients.ingFlags != null) ? this.objIngredients.ingFlags : new Flags();
    this.physicalProperties = (this.objIngredients.chemData.chemIDPlus != null) ? JSON.parse(this.objIngredients.chemData.chemIDPlus.chemPhysicalJson) : [];
    this.toxicityData = (this.objIngredients.chemData.chemIDPlus != null) ? JSON.parse(this.objIngredients.chemData.chemIDPlus.chemToxicityJson) : [];
    
    // if (this.objIngredients.chemRegData.length > 0) {
    //   this.chemRegData = this.objIngredients.chemRegData.filter(item => item.country == this.countryRegulations.country)[0];
    //   if (this.chemRegData != undefined)
    //     this.isChemRegData = true;
    //   else {
    //     this.chemRegData = new ChemRegData();
    //     this.isChemRegData = false;
    //   }
    // }
    // else {
    //   this.isChemRegData = false;
    // }
  }
  getIngRegDataByCountryName(objIngredients: Ingredients, selectedCountry: string): IngRegData {
    let obj: IngRegData = new IngRegData();
    if (objIngredients.ingRegData != undefined && objIngredients.ingRegData != null) {
      let countryRegObject = _.find(objIngredients.ingRegData, (element) => { return element.country === selectedCountry });
      obj = (countryRegObject != undefined && countryRegObject != null) ? countryRegObject : new IngRegData();
    }
    return obj;
  }

  setSelectedCountry(selectedValue: string) {
    this.selectedCountry = selectedValue;
  }

  onCountryRowSelect(event) {
    // this.countryRegulations = event.data;
  }


  getFormulaIngredients(formulaSpecs: FormulaSpec[]) {
    formulaSpecs = _.filter(formulaSpecs, (element: FormulaSpec) => { return element.isDelete === false; });
    let requestList = formulaSpecs.map(a => a.ingredientName);

    let _formulaIngredients = [];

    let isCountriesLoaded = this.isCountriesLoaded.value;
    let selectedCountry = this.selectedCountry;
    let selectedCountryRequlation: IngRegData = this.selectedCountryRequlation;
    this._irs.GetIngredientsByNames(requestList).subscribe((ingDataLit: ResponseData<any>) => {
      let ingredients = ingDataLit.data;
      this.ingredients = ingredients;
      _.each(formulaSpecs, function (formulaIng) {

        let ingredient = _.find(ingredients, (ing) => { return ing.ingredientName === formulaIng.ingredientName; });

        let ingCosmeticsRegulatoryStatus = "No Regulatory Status";
        if ((ingredient !== undefined && ingredient !== null) && (ingredient.ingRegData !== undefined && ingredient.ingRegData !== null)) {
          let ingRegdata: IngRegData = _.find(ingredient.ingRegData, (ingRegdata: IngRegData) => { return ingRegdata.country === selectedCountry });
          if (ingRegdata !== undefined && ingRegdata !== null) {
            ingCosmeticsRegulatoryStatus = ingRegdata.regulatoryStatus;
            selectedCountryRequlation = ingRegdata;
          }
          else {
            selectedCountryRequlation = new IngRegData();
          }

        }
        _formulaIngredients.push({
          casNo: formulaIng.casNo,
          givenName: formulaIng.givenName,
          ingredientName: formulaIng.ingredientName,
          cosmeticsRegulatoryStatus: ingCosmeticsRegulatoryStatus
        });

      });
      if (_formulaIngredients.length > 0) {
        this.selectedIngredient = _formulaIngredients[0];
        this.selectedCountryRequlation = selectedCountryRequlation;
        this.selectIngredientGetRegulation();
      }
      this.formulaIngredients = _formulaIngredients;
    }, (error) => {

    });

  }


  onIngredientRowSelect(event: any) {
    // this.selectedIngredient = this.selectedIngredient;
    this.selectIngredientGetRegulation();
    return;
  }

  selectIngredientGetRegulation() {
    let selectedIngredient = this.selectedIngredient;
    let ingredient = _.find(this.ingredients, (ing) => { return ing.ingredientName === selectedIngredient.ingredientName; });
    if (ingredient !== undefined && ingredient !== null) {
      this.ireadyApi.setStorage("ingredients", JSON.stringify(ingredient));
      this.GetRegulations2();
    }

  }

  getReglationData() {
    this.getFormulaIngredients(this.formula.formulaSpecs);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
