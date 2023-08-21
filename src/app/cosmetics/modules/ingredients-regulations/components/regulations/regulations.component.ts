import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChemRegData, Flags, IngData, Ingredients, IngRegData } from 'src/app/cosmetics/models/ingredients';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { filter } from 'rxjs/operators';
declare var $: any;
var gdpData = {
  AF: 16.63,
  AL: 11.58,
  DZ: 158.97,
  // ...
};
@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegulationsComponent implements OnInit {
  visibleSidebar2;
  public objIngredients: Ingredients = new Ingredients();
  countries: IngRegData[] = [];
  physicalProperties: any[] = [];
  toxicityData: any[] = [];
  public countryRegulations: IngRegData = new IngRegData();
  public ingredientsRegulationobj: IngData = new IngData();
  public chemRegData: ChemRegData = new ChemRegData();
  public isChemRegData: boolean = false;
  public flagsDetails: Flags = new Flags();
  public isCountryRegulations: boolean = true;
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  isHideControl: boolean;
  countryName: string;
  constructor(public _appService: AppService, private ireadyApi: IreadyApiService, private modalService: NgbModal) { }
  ngOnInit(): void {
    debugger;
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setSideMenuShow(true);
    this._appService.setHeaderTitle("IngredientsRegulations");
    this.objIngredients = JSON.parse(this.ireadyApi.getStorage("ingredients"));
    this.countries = this.objIngredients.ingRegData;
    this.countryRegulations = this.countries != null ? this.countries[0] : new IngRegData();
    this.ingredientsRegulationobj = this.objIngredients.ingData;
    this.flagsDetails = (this.objIngredients.ingFlags != undefined && this.objIngredients.ingFlags != null) ? this.objIngredients.ingFlags : new Flags();
    this.physicalProperties = (this.objIngredients.chemData.chemIDPlus != null) ? JSON.parse(this.objIngredients.chemData.chemIDPlus.chemPhysicalJson) : [];
    this.toxicityData = (this.objIngredients.chemData.chemIDPlus != null) ? JSON.parse(this.objIngredients.chemData.chemIDPlus.chemToxicityJson) : [];
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
  onCountryRowSelect(event) {
    this.countryRegulations = event.data;
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({ behavior: "smooth", block: "start" });;
  }
}
