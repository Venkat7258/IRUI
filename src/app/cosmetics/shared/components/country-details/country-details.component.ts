import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { ChemRegData, IngData, Ingredients, IngRegData } from 'src/app/cosmetics/models/ingredients';
@Component({
  selector: 'country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CountryDetailsComponent implements OnInit, OnChanges {
  public countryRegulations: IngRegData = new IngRegData();
  public ingredientsRegulationobj: IngData = new IngData();
  public chemRegData: ChemRegData = new ChemRegData();
  public isChemRegData: boolean = false;
  public objIngredients: Ingredients = new Ingredients();
  @Input() ingredients: any;
  @Input() ingredientsRU: any;
  @Input() countryName: any;
  constructor(public _appService: AppService, private ireadyApi: IreadyApiService) {
    this.objIngredients = JSON.parse(this.ireadyApi.getStorage("ingredients"));
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.countryRegulations = this.getCountryRegulation();

    this.ingredientsRegulationobj = (this.countryName != '' && this.countryName != null && this.countryName != undefined) &&
      this.objIngredients.ingData != null ? this.objIngredients.ingData : new IngData();
    if (this.objIngredients.chemRegData.length > 0) {
      this.chemRegData = (this.countryName != '' && this.countryName != null && this.countryName != undefined) ?
        this.objIngredients.chemRegData.filter(item => item.country == this.countryName)[0] : this.objIngredients.chemRegData.filter(item => item.country == this.countryRegulations.country)[0];
      if (this.chemRegData != undefined)
        this.isChemRegData = true;
      else {
        this.chemRegData = new ChemRegData();
        this.isChemRegData = false;
      }
    }
    else {
      this.isChemRegData = false;
    }
  }
  getCountryRegulation(): IngRegData {
    if ((this.countryName != undefined && this.countryName != null && this.countryName != '') &&
      (this.objIngredients.ingRegData != undefined && this.objIngredients.ingRegData != null)) {
      let obj = this.objIngredients.ingRegData.find(item => item.country == this.countryName);
      if (obj != undefined && obj != null) {
        return obj;
      }
    }
    return new IngRegData();

  }
  ngOnChanges() {
    this.loadData();
    this.countryRegulations = this.ingredients;
    if (this.objIngredients.chemRegData.length > 0) {
      this.chemRegData = this.objIngredients.chemRegData.filter(item => item.country == this.countryRegulations.country)[0];
      if (this.chemRegData != undefined)
        this.isChemRegData = true;
      else {
        this.chemRegData = new ChemRegData();
        this.isChemRegData = false;
      }
    }
    else {
      this.isChemRegData = false;
    }
  }
}
