import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChemRegData, Flags, IngData, Ingredients, IngRegData } from 'src/app/cosmetics/models/ingredients';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import $ from 'jquery';
@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss']
})
export class RegulationsComponent implements OnInit {
  visibleSidebar2;
  public objIngredients: Ingredients = new Ingredients();
  countries: IngRegData[] =[];
  physicalProperties: any[] = [];
  toxicityData: any[] = [];
  public countryRegulations: IngRegData = new IngRegData();
  public ingredientsRegulationobj: IngData = new IngData();
  public chemRegData: ChemRegData =new ChemRegData();
  public isChemRegData: boolean = false;
  public flagsDetails: Flags = new Flags();
  public isCountryRegulations:boolean=true;
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  isHideControl:boolean;
  countryName:string;
  casno:string;
  ingredientName:string;
  activeSubTab:string
  activeTab:string
  index:number;
  
  constructor(public _appService: AppService, private ireadyApi: IreadyApiService,private formBuilder: FormBuilder,private modalService: NgbModal,private route: ActivatedRoute) {
 

  }
  ngOnInit(): void {
    // this.route.queryParams
    //     .subscribe(params => {
    //         console.log(params['countryName']); // { order: "popular" }
    //         this.countryName=params['countryName'];
    //     });
    debugger;
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setSideMenuShow(true);
    this._appService.setHeaderTitle("");
    this.objIngredients = JSON.parse(this.ireadyApi.getStorage("ingredientsRU"));
    this.countryName= JSON.parse(this.ireadyApi.getStorage("country"));
    this.casno=JSON.parse(this.ireadyApi.getStorage("casno"));
    this.ingredientName=JSON.parse(this.ireadyApi.getStorage("ingredientname"));
    this.activeTab='Ingredient Details';
    this.activeSubTab='Substance Details';
    this.index=0;
    
    this.countries = this.objIngredients.ingRegData;
    this.countryRegulations = this.countries!=null?this.countries[0]:new IngRegData();
    this.ingredientsRegulationobj = this.objIngredients.ingData;
    this.flagsDetails =  (this.objIngredients.ingFlags!=undefined&&this.objIngredients.ingFlags!=null)?this.objIngredients.ingFlags:new Flags();
    this.physicalProperties = (this.objIngredients.chemData.chemIDPlus!=null)?JSON.parse(this.objIngredients.chemData.chemIDPlus.chemPhysicalJson):[];
    this.toxicityData = (this.objIngredients.chemData.chemIDPlus!=null)?JSON.parse(this.objIngredients.chemData.chemIDPlus.chemToxicityJson):[];
if (this.objIngredients.chemRegData.length > 0) {
      this.chemRegData = this.objIngredients.chemRegData.filter(item => item.country == this.countryName)[0];
      if(this.chemRegData !=undefined)
      this.isChemRegData = true;
      else{
        this.chemRegData =new ChemRegData();
        this.isChemRegData = false;
      }
    }
    else{
      this.isChemRegData = false;
    }
  }
  displaySubTab(activeSubTab: string) {
    this.activeSubTab=activeSubTab;
  }
  AssignActiveTab(activeTab:any)
  {  
    this.activeTab=activeTab.originalEvent.target.innerText;
   
  }
  ActiveTabClick(event:any)
  {
    $('#idSubDetails').prop('ariaSelected',true);
    $('#tab-content1').prop('ariaHidden',false);
   // $('#idSubDetails').click();
    this.index=0;
  }
}