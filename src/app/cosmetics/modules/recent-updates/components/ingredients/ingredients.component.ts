import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { IngredientsRegulationsService } from 'src/app/cosmetics/services/ingredients-regulations.service';
import { RecentUpdatesService } from 'src/app/cosmetics/services/recent-updates.service';
import { IngredientsSearchResponse } from 'src/app/cosmetics/models/response/ingredients-search-response';
import { ResponseData } from 'src/app/cosmetics/models/response-data';
import { IngredientSearhRequest } from 'src/app/cosmetics/models/request/ingredient-searh-request';
import { Recentupdates } from 'src/app/cosmetics/models/recentupdates';
import { TableModule } from 'primeng/table';
import { ChemData, ChemRegData, Flags, IngData, Ingredients, IngRegData, OtherNames } from 'src/app/cosmetics/models/ingredients';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  public ingredients: Ingredients[];
  public recentUpdates:Recentupdates[];
  cities: any[];
  constructor(public _appService: AppService,private router: Router, private ireadyApi: IreadyApiService, private iRService: IngredientsRegulationsService,private rUserice:RecentUpdatesService) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }
  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setHeaderTitle("RecentUpdates");
    this.getRecentUpdates();
  }
  onSubmit(f: NgForm) {
    // stop here if form is invalid
    if (f.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(f.value, null, 4));
  }

  getRecentUpdates() {
    this.iRService.getAllIngredients().toPromise().then((resp: any) => {
      debugger;  
          
      let iRG = Array<any>();
         resp.data.forEach((ingredient:Ingredients) => {
        let irObj:any={};
        irObj.id = ingredient.id;
        irObj.ingredientName = ingredient.ingredientName;
        irObj.casNo = ingredient.casNo;
        irObj.ingFlags = ingredient.ingFlags;
        irObj.usInciNames = (ingredient.ingData != null && ingredient.ingData.usInciNames != null) ? ingredient.ingData.usInciNames.map(i => { return i.usInciName }).join(" | ") : '';
        irObj.euInciNames = (ingredient.ingData !== null&&ingredient.ingData.euInciNames!=null) ? ingredient.ingData.euInciNames.map(i => { return i.euInciName }).join(" | ") : '';
        irObj.ingData = ingredient.ingData!=null?ingredient.ingData:new IngData();
        irObj.functions = (ingredient.ingData != null && ingredient.ingData.functions != null) ? ingredient.ingData.functions.map(i => { return i.function }).join(' | ') : "";
        irObj.otherNames = (ingredient.otherNames != null&&ingredient.otherNames!=null) ? ingredient.otherNames.map((item) => { return item.otherName }).join(' | ') : "";
        irObj.cosmeticsInventory = (ingredient.ingRegData != null && ingredient.ingRegData != null) ? ingredient.ingRegData.map(i => { return i.country }).join(" | ") : "";
        irObj.chemicalInventory = (ingredient.chemRegData != null && ingredient.chemRegData != null) ? ingredient.chemRegData.map(i => { return i.country }).join(" | ") : "";
        irObj.ingRegData =ingredient.ingRegData !=null? ingredient.ingRegData.filter(x=>x.publishedDate!=null && x.publishedDate!=""):null;
        irObj.chemData = ingredient.chemData!=null?ingredient.chemData:new ChemData();
        irObj.chemRegData = ingredient.chemRegData !=null?ingredient.chemRegData.filter(x=>x.publishedDate!=null && x.publishedDate!=""):null;
        let rU = Array<any>();
        if(irObj.ingRegData!=null)
        {
          irObj.ingRegData.forEach(ingRegData => {
      
            rU.push( {
              IngredientId:ingredient.id,
              IngredientName	:ingredient.ingredientName,
              CASNo:ingredient.casNo,
              LastReviewDate	:ingRegData.reviewedDate,
              ChemLastReviewDate:'',	
              PublishDate	:ingRegData.publishedDate,
              ChemPublishDate	:'',
              ModifiedDate :	ingredient.modifiedDate,
              ChemModifiedDate  :'',
              RegulatoryStatus:ingRegData.regulatoryStatus,
              ChemRegulatoryStatus:'',
              RegulatoryChangeTypeCountry:ingRegData.regulatoryChangeType,
              EffectiveDateCountry:ingRegData.effectiveDate,
              ChemicalRegulatoryChangeType:'',
              ChemEffectiveDate:'',
              Formulas:0,
              CountryId:0,
              Country	:ingRegData.country
      })
      
           });
          }
          if(irObj.chemRegData !=null)
          {

            irObj.chemRegData.forEach(chemRegData => {
            rU.push({
              IngredientId:ingredient.id,
              IngredientName	:ingredient.ingredientName,
              CASNo:ingredient.casNo,
              LastReviewDate	:'',
              ChemLastReviewDate:chemRegData.reviewedDate,	
              PublishDate	:'',
              ChemPublishDate	:chemRegData.publishedDate,
              ModifiedDate :	'',
              ChemModifiedDate  :chemRegData.modifiedDate,
              RegulatoryStatus:'',
              ChemRegulatoryStatus:chemRegData.regulatoryStatus,
              RegulatoryChangeTypeCountry:'',
              EffectiveDateCountry:'',
              ChemicalRegulatoryChangeType:chemRegData.regulatoryChangeType,
              ChemEffectiveDate:chemRegData.effectiveDate,
              Formulas:0,
              CountryId:0,
              Country	:chemRegData.country
      })
           });
      
          }
          irObj.recentUpdates=rU;
        iRG.push(irObj);
      });

      this.ingredients = iRG;
    })


  
    // this.iRService.getAllIngredients().toPromise().then((resp: any) => {
    //   debugger;
    //   this.ingredients=resp.data;
    //   let iRG = Array<any>();
    //   // resp.data.forEach((ingredient: any) => {
    //   //   iRG.push(
    //   //     {
    //   //       id: ingredient._id,
    //   //       ingredient: ingredient.ingredient,
    //   //       casNo: ingredient.casNo,
    //   //       flags: ingredient.flags,
    //   //       otherFunctions: ingredient.ingData[0].otherFunctions,
    //   //       inciName: ingredient.ingData[0].inciName,
    //   //       uS_INCIName: ingredient.ingData[0].uS_INCIName,
    //   //       otherNames: ingredient.otherNames != null ? ingredient.otherNames.map((item) => { return item.otherName }).join(',') : null,
    //   //       cosmeticsInventory: ingredient.ingRegData != null ? ingredient.ingRegData.map((y: any) => { return y.countryName }).join(" | ") : null,
    //   //       ingRegData: ingredient.ingRegData.filter(x=>x.publishedDate!=null && x.publishedDate!=""),
    //   //       ingData: ingredient.ingData,
    //   //       chemData: resp.data[0].chemData,
    //   //       chemRegData: resp.data[0].chemRegData.filter(x=>x.publishedDate!=null && x.publishedDate!="")
    //   //     }
    //   //   );
    //   // });

    //   let rU = Array<any>();
    //   resp.data.forEach((ingredient:any)=>{

    //   //   if(ingredient.ingRegData!=null)
    //   //   {
    //   //      ingredient.ingRegData.forEach(ingRegData => {
      
    //   //       rU.push( {
    //   //         IngredientId:ingredient.id,
    //   //         IngredientName	:ingredient.ingredientName,
    //   //         CASNo:ingredient.casNo,
    //   //         LastReviewDate	:ingRegData.reviewedDate,
    //   //         ChemLastReviewDate:'',	
    //   //         PublishDate	:ingRegData.publishedDate,
    //   //         ChemPublishDate	:'',
    //   //         ModifiedDate :	ingredient.modifiedDate,
    //   //         ChemModifiedDate  :'',
    //   //         RegulatoryStatus:ingredient.regulatoryStatus,
    //   //         ChemRegulatoryStatus:'',
    //   //         RegulatoryChangeTypeCountry:ingRegData.regulatoryChangeType,
    //   //         EffectiveDateCountry:ingRegData.effectiveDate,
    //   //         ChemicalRegulatoryChangeType:'',
    //   //         ChemEffectiveDate:'',
    //   //         Formulas:0,
    //   //         CountryId:0,
    //   //         Country	:ingRegData.country
    //   // })
      
    //   //      });
    //   //     }
    //   //     if(ingredient.chemRegData!=null)
    //   //     {

    //   //      ingredient.chemRegData.forEach(chemRegData => {
    //   //       rU.push({
    //   //         IngredientId:ingredient.id,
    //   //         IngredientName	:ingredient.ingredientName,
    //   //         CASNo:ingredient.casNo,
    //   //         LastReviewDate	:'',
    //   //         ChemLastReviewDate:chemRegData.reviewedDate,	
    //   //         PublishDate	:'',
    //   //         ChemPublishDate	:chemRegData.publishedDate,
    //   //         ModifiedDate :	'',
    //   //         ChemModifiedDate  :chemRegData.modifiedDate,
    //   //         RegulatoryStatus:'',
    //   //         ChemRegulatoryStatus:chemRegData.regulatoryStatus,
    //   //         RegulatoryChangeTypeCountry:'',
    //   //         EffectiveDateCountry:chemRegData.country,
    //   //         ChemicalRegulatoryChangeType:chemRegData.regulatoryChangeType,
    //   //         ChemEffectiveDate:chemRegData.effectiveDate,
    //   //         Formulas:0,
    //   //         CountryId:0,
    //   //         Country	:chemRegData.country
    //   // })
    //   //      });
      
    //   //     }
       
    //   })
    //   this.recentUpdates=rU;
      
    // })

   
  }
  getIngredientName(data,country,casno,ingredientname) {
    debugger;
    this.ireadyApi.setStorage("ingredients", JSON.stringify(data));
    this.ireadyApi.setStorage("country", JSON.stringify(country));
    this.ireadyApi.setStorage("casno", JSON.stringify(casno));
    this.ireadyApi.setStorage("ingredientname", JSON.stringify(ingredientname));
    this.router.navigate(['cosmetics/recentupdates/regulations'] );
  }
}
