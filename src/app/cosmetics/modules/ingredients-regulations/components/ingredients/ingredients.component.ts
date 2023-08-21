import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { IngredientsRegulationsService } from 'src/app/cosmetics/services/ingredients-regulations.service';
import { ChemData, ChemRegData, Flags, IngData, Ingredients, IngRegData, OtherNames } from 'src/app/cosmetics/models/ingredients';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonListModalComponent } from 'src/app/cosmetics/shared/modals/common-list-modal/common-list-modal.component';
@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IngredientsComponent implements OnInit {
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  public ingredients: Ingredients[];
  public selectedIngredients: Ingredients = new Ingredients();
  public items: MenuItem[];
  constructor(public _appService: AppService, private ireadyApi: IreadyApiService, private router: Router, private iRService: IngredientsRegulationsService,private modalService: NgbModal) { }
  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setHeaderTitle("");
    this.getIngredients();
    this.items = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: (event) => {
          debugger;
          this.selectedIngredients;
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: (event) => {
        }
      }
    ];
  }
  public handleActionsClick(event) {
    this.selectedIngredients = event;
  }
  getIngredients() {
    debugger;
    this.iRService.getAllIngredients().subscribe((resp: any) => {
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
        irObj.ingRegData = ingredient.ingRegData;
        irObj.chemData = ingredient.chemData!=null?ingredient.chemData:new ChemData();
        irObj.chemRegData = ingredient.chemRegData;
        iRG.push(irObj);
      });

      this.ingredients = iRG;
    })
    
  }
  ShowMore(model) {
    debugger;
    this.modalReference = this.modalService.open(CommonListModalComponent, { size: 'md' });
    this.modalReference.componentInstance.objModel = model.model;
    this.modalReference.componentInstance.moduleType = model.type;
    this.modalReference.result.then((result) => {     
    });
  }
  getIngredientName(data) {
    this.ireadyApi.setStorage("ingredients", JSON.stringify(data));
    this.router.navigate(['/cosmetics/ingredients/regulations']);
  }
}