import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { Conditiontypes } from 'src/app/cosmetics/models/master-data/conditiontypes';
import { InActiveComponent } from 'src/app/cosmetics/shared/in-active/in-active.component';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-conditiontypes',
  templateUrl: './conditiontypes.component.html',
  styleUrls: ['./conditiontypes.component.scss']
})
export class ConditiontypesComponent  implements OnInit { 
  conditionTypes: any[]=[];
  isAddConditionTypes: boolean = false;
public selectedConditionTypes: Conditiontypes =new Conditiontypes();
public objConditionTypes: Conditiontypes =new Conditiontypes();
ConditionTypesitems: MenuItem[];
isaction: boolean = true;
modalOptions: NgbModalOptions;
 modalReference: NgbModalRef;

 constructor(public _appService: AppService, private ireadyApi: IreadyApiService,private router: Router, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.GetAllConditionTypes();
    this.ConditionTypesitems = [
      {label: 'update ', icon: 'pi pi-refresh' , command: () => {
      this.AddAndUpdateConditionTypes('Edit');
      }
    },
      {label: 'Delete', icon: 'pi pi-times' , command: () => {
        this.DeleteConditionTypes();
      }}
    ];
  } 
  public HandleActionsClickConditionTypes(event, type) {
    if(type=="ConditionTypes")
     {
         this.selectedConditionTypes = event;
  }
  }
  SaveAndUpdateConditionTypes(type) {
    if (type != "Add") {
      this.ireadyApi.postData("IngMasterData/UpdateConditionTypes  ", this.objConditionTypes).toPromise().then((resp: any) => {  
      this.conditionTypes = resp.data;
      this.GetAllConditionTypes()
   })
   }
  else
   {
    this.ireadyApi.postData("IngMasterData/InsertConditionTypes", this.objConditionTypes).toPromise().then((resp: any) => { 
    this.conditionTypes = resp.data;
    this.GetAllConditionTypes() 
         })
       }
     }
     onConditionTypesClose()
 {

 this.isAddConditionTypes = false;
 }

     AddAndUpdateConditionTypes(type) {
      this.isAddConditionTypes=true;
        if(type!="Add") {
       this.isaction = false;
          this.objConditionTypes=this.selectedConditionTypes;
         }
         else{
           this.isaction = true;
           this.objConditionTypes=new Conditiontypes();
  }}
  GetAllConditionTypes() {
    this.ireadyApi.getData("IngMasterData/GetAllConditionTypes").toPromise().then((resp: any) => {
    this.conditionTypes=resp.data;
    this.isAddConditionTypes=false;
    })
  }
  getConditionTypeID(data)
  {
    this.ireadyApi.setStorage("conditionTypes",data);
    this.router.navigate(['/food/ingredientsregulations/regulations']);
  }
  DeleteConditionTypes() {
  this.modalReference = this.modalService.open(InActiveComponent, { size: 'sm' });
  this.modalReference.componentInstance.objModel = this.selectedConditionTypes;
  this.modalReference.componentInstance.moduleType = 'ConditionTypes';
  this.modalReference.result.then((result) => {
  this.GetAllConditionTypes();
  });
    
  }
  // ShowActiveConditionTypes(event)
  //   {
  //     let isactive=false;
  //     if(event.checked.length>0)
  //     isactive=true;
  //   }
   

  







}
