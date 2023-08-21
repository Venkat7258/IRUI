import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { Regulationstatuschem } from 'src/app/cosmetics/models/master-data/regulationstatuschem';
import { InActiveComponent } from 'src/app/cosmetics/shared/in-active/in-active.component';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-regulationstatuschem',
  templateUrl: './regulationstatuschem.component.html',
  styleUrls: ['./regulationstatuschem.component.scss']
})
export class RegulationstatuschemComponent implements OnInit {
  regulationStatusChem: any[]=[];
  isAddRegulationStatusChem: boolean = false;
public selectedRegulationStatusChem: Regulationstatuschem =new Regulationstatuschem();
public objRegulationStatusChem: Regulationstatuschem =new Regulationstatuschem();
regulationStatusChemitems: MenuItem[];
isaction: boolean = true;
modalOptions: NgbModalOptions;
 modalReference: NgbModalRef;

  constructor(public _appService: AppService, private ireadyApi: IreadyApiService,private router: Router, private modalService: NgbModal) { }
  ngOnInit(): void {
   // this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    //this._appService.setHeaderShow(true);
   // this._appService.setHeaderTitle(" Regulations");
    this.GetAllRegulationStatusChem();
    this.regulationStatusChemitems = [
      {
        label: 'update ', icon: 'pi pi-refresh' , command: () => {
      this.AddAndUpdateRegulationStatusChem('Edit');

      }
    },
      {
        label: 'Delete', icon: 'pi pi-times' , command: () => {
          this.DeleteRegulationstatusChem();

      }}
    ];

}
public HandleActionsClickRegulationStatusChem(event, type) {
  if(type == "RegulationStatusChem")
   {
    this.selectedRegulationStatusChem = event;
}
}
SaveAndUpdateRegulationStatusChem(type) {
  if (type != "Add") {
  this.ireadyApi.postData("IngMasterData/UpdateRegulationStatusChem  ", this.objRegulationStatusChem).toPromise().then((resp: any) => {
  this.regulationStatusChem = resp.data;
  this.GetAllRegulationStatusChem()
 })
 }
else
 {
    this.ireadyApi.postData("IngMasterData/InsertRegulationStatusChem", this.objRegulationStatusChem).toPromise().then((resp: any) => {
    this.regulationStatusChem = resp.data;
    this.GetAllRegulationStatusChem() 
       })
     }
   }
   onRegulationStatusChemClose()
 {

 this.isAddRegulationStatusChem = false;
 }



AddAndUpdateRegulationStatusChem(type) {
               
      this.isAddRegulationStatusChem=true;
        if(type!="Add") {
        this.isaction = false;
        this.objRegulationStatusChem=this.selectedRegulationStatusChem;
         }
            else{
            this.isaction = true;
            this.objRegulationStatusChem=new Regulationstatuschem();
 }}
GetAllRegulationStatusChem() {
  this.ireadyApi.getData("IngMasterData/GetAllRegulationStatusChem").toPromise().then((resp: any) => {
  this.regulationStatusChem=resp.data;
  this.isAddRegulationStatusChem=false;

    })
  }
  getInventoryStatus(data)
  {
    
    this.ireadyApi.setStorage("regulationStatusChem",data);
    this.router.navigate(['/food/ingredientsregulations/regulations']);
  }
  
  DeleteRegulationstatusChem() {
    this.modalReference = this.modalService.open(InActiveComponent, { size: 'sm' });
    this.modalReference.componentInstance.objModel = this.selectedRegulationStatusChem;
    this.modalReference.componentInstance.moduleType = 'RegulationStatusChem';
    this.modalReference.result.then((result) => {
    this.GetAllRegulationStatusChem();
       });
     }
    //  ShowActiveRegulationStatusChem(event)
    //  {
    //    debugger;
    //    let isactive=false;
    //    if(event.checked.length>0)
    //    isactive=true;
    //  }

}
