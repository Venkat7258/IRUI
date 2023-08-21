import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChemData, ChemIDPlus, Flags, FlagsHistory, IngData, Ingredients } from 'src/app/cosmetics/models/ingredients';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ing-details',
  templateUrl: './ing-details.component.html',
  styleUrls: ['./ing-details.component.scss']
})
export class IngDetailsComponent implements OnInit, OnChanges {
  visibleSidebar2;
  physicalProperties: any[] = [];
  toxicityData: any[] = [];
  public isFlagsHistory:boolean=true;
  public isShowFlagsHistory:boolean=false;
  public ingredientsRegulationobj: IngData = new IngData();
  public objIngredients: Ingredients =new Ingredients();
  public flagsDetails: Flags = new Flags();
  public flagsHistory: FlagsHistory[] = [new FlagsHistory()];
  public chemicalDetails: ChemIDPlus = new ChemIDPlus();
  @Input() ingredients:any;
  @Input() ingredientsRU:any;
  @Output() ActiveTab = new EventEmitter<string>();
  @Output() ActiveSubTab = new EventEmitter<string>();
  index:number;
  selectedNavItem:string;


  constructor(public _appService: AppService,private ireadyApi: IreadyApiService) {
   }
  ngOnInit(): void {
    this.index=2;
    this.selectedNavItem='Substance Details';
    
  }
  ngOnChanges() {
    debugger;
  
      this.objIngredients =  JSON.parse(this.ireadyApi.getStorage("ingredients"));
    
 
    
    this.chemicalDetails = (this.objIngredients.chemData.chemIDPlus!=null)?this.objIngredients.chemData.chemIDPlus:new ChemIDPlus();
    this.ingredientsRegulationobj = this.objIngredients.ingData;
    this.flagsDetails = (this.objIngredients.ingFlags!=undefined&&this.objIngredients.ingFlags!=null)?this.objIngredients.ingFlags:new Flags();
    this.flagsHistory =(this.objIngredients.ingFlags!=undefined&&this.objIngredients.ingFlags!=null)? this.objIngredients.ingFlags.flagsHistory: [new FlagsHistory()];
    this.physicalProperties = (this.objIngredients.chemData.chemIDPlus!=null)?JSON.parse(this.objIngredients.chemData.chemIDPlus.chemPhysicalJson):[];
    this.toxicityData = (this.objIngredients.chemData.chemIDPlus!=null)?JSON.parse(this.objIngredients.chemData.chemIDPlus.chemToxicityJson):[];
  }
  ShowFlagsHistory(event)
  {
    this.isShowFlagsHistory=!this.isShowFlagsHistory;
  }

  sendActiveSubTab(subTab)
  {
    this.ActiveSubTab.emit(subTab);
  }

}
