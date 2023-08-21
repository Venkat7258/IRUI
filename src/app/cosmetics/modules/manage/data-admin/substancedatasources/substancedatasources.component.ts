import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { Subsatancedatasources } from 'src/app/cosmetics/models/master-data/subsatancedatasources';
import { InActiveComponent } from 'src/app/cosmetics/shared/in-active/in-active.component';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-substancedatasources',
  templateUrl: './substancedatasources.component.html',
  styleUrls: ['./substancedatasources.component.scss']
})
export class SubstancedatasourcesComponent implements OnInit {
  substanceDataSources: any[]=[];
  isAddSubstanceDataSources: boolean = false;
public selectedSubstanceDataSources: Subsatancedatasources =new Subsatancedatasources();
public objSubstanceDataSources: Subsatancedatasources =new Subsatancedatasources();
SubstanceDataSourcesitems: MenuItem[];
isaction: boolean = true;
modalOptions: NgbModalOptions;
 modalReference: NgbModalRef;

 constructor(public _appService: AppService, private ireadyApi: IreadyApiService,private router: Router, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.GetAllSubstanceDataSources();
    this.SubstanceDataSourcesitems = [
      {label: 'update ', icon: 'pi pi-refresh' , command: () => {
      this.AddAndUpdateSubstanceDataSources('Edit');
    
      }},
      {label: 'Delete', icon: 'pi pi-times' , command: () => {
        this.DeleteSubstanceDataSources();
      }}
    ];
  }
  public HandleActionsClickSubstanceDataSources(event, type) {
    if(type=="SubstanceDataSources")
     {
         this.selectedSubstanceDataSources = event;
  }
  }
  SaveAndUpdateSubstanceDataSources(type) {
    if (type != "Add") {
    this.ireadyApi.postData("IngMasterData/UpdateSubstanceDataSources  ", this.objSubstanceDataSources).toPromise().then((resp: any) => {
    this.substanceDataSources = resp.data;
    this.GetAllSubstanceDataSources()
   })
   }
  else
   {
    this.ireadyApi.postData("IngMasterData/InsertSubstanceDataSources", this.objSubstanceDataSources).toPromise().then((resp: any) => {
    this.substanceDataSources = resp.data;
    this.GetAllSubstanceDataSources() 
         })
       }
     }
     onSubstanceDataSourcesClose()
 {

 this.isAddSubstanceDataSources = false;
 }

     AddAndUpdateSubstanceDataSources(type) {
      this.isAddSubstanceDataSources=true;
        if(type!="Add") {
       this.isaction = false;
        this.objSubstanceDataSources=this.selectedSubstanceDataSources;
         }
         else{
          this.isaction = true;
          this.objSubstanceDataSources=new Subsatancedatasources();
  }}
    GetAllSubstanceDataSources() {
    this.ireadyApi.getData("IngMasterData/GetAllSubstanceDataSources").toPromise().then((resp: any) => {
    this.substanceDataSources=resp.data;
    this.isAddSubstanceDataSources=false;
    })
  }
  getDataSource(data)
  {
    this.ireadyApi.setStorage("substanceDataSources",data);
    this.router.navigate(['/food/ingredientsregulations/regulations']);
  }
  DeleteSubstanceDataSources()  {
    this.modalReference = this.modalService.open(InActiveComponent, { size: 'sm' });
    this.modalReference.componentInstance.objModel = this.selectedSubstanceDataSources;
    this.modalReference.componentInstance.moduleType = 'SubstanceDataSources';
    this.modalReference.result.then((result) => {
    this.GetAllSubstanceDataSources();
        });
    
  }
  // ShowActiveSubstanceDataSources(event)
  //   {
  //     debugger;
  //     let isactive=false;
  //     if(event.checked.length>0)
  //     isactive=true;
  //   }
  
      


}
