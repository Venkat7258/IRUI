import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { Importtypecosmetics } from 'src/app/cosmetics/models/master-data/importtypecosmetics';
import { InActiveComponent } from 'src/app/cosmetics/shared/in-active/in-active.component';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-importtypecosmetics',
  templateUrl: './importtypecosmetics.component.html',
  styleUrls: ['./importtypecosmetics.component.scss']
})
export class ImporttypecosmeticsComponent implements OnInit {
  importTypesCosmetics: any[]=[];
  isAddImportTypesCosmetics: boolean = false;
public selectedImportTypesCosmetics: Importtypecosmetics =new Importtypecosmetics();
public objImportTypesCosmetics: Importtypecosmetics =new Importtypecosmetics();
ImportTypesCosmeticsitems: MenuItem[];
isaction: boolean = true;
modalOptions: NgbModalOptions;
 modalReference: NgbModalRef;

 constructor(public _appService: AppService, private ireadyApi: IreadyApiService,private router: Router, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.GetAllImportTypesCosmetics();
    this.ImportTypesCosmeticsitems = [
      {label: 'update ', icon: 'pi pi-refresh' , command: () => {
      this.AddAndUpdateImportTypesCosmetics('Edit');
    
      }},
      {label: 'Delete', icon: 'pi pi-times' , command: () => {
        this.DeleteImportTypesCosmetics();
       }}
    ];
  }
  public HandleActionsClickImportTypesCosmetics(event, type) {
    if(type=="ImportTypesCosmetics")
     {
         this.selectedImportTypesCosmetics = event;
  }
  }
  SaveAndUpdateImportTypesCosmetics(type) {
    if (type != "Add") {
      this.ireadyApi.postData("IngMasterData/UpdateImportTypesCosmetics  ", this.objImportTypesCosmetics).toPromise().then((resp: any) => {
      this.importTypesCosmetics = resp.data;
      this.GetAllImportTypesCosmetics()
   })
   }
  else
   {
    this.ireadyApi.postData("IngMasterData/InsertImportTypesCosmetics", this.objImportTypesCosmetics).toPromise().then((resp: any) => {
    this.importTypesCosmetics = resp.data;
    this.GetAllImportTypesCosmetics() 
         })
       }
     }
     onImportTypesCosmeticsClose()
     {
    
     this.isAddImportTypesCosmetics = false;
     }
     
     AddAndUpdateImportTypesCosmetics(type) {
      this.isAddImportTypesCosmetics=true;
        if(type!="Add") {
       this.isaction = false;
        this.objImportTypesCosmetics=this.selectedImportTypesCosmetics;
         }
         else{
           this.isaction = true;
           this.objImportTypesCosmetics=new Importtypecosmetics();
  }}
    GetAllImportTypesCosmetics() {
    this.ireadyApi.getData("IngMasterData/GetAllImportTypesCosmetics").toPromise().then((resp: any) => {
    this.importTypesCosmetics=resp.data;
    this.isAddImportTypesCosmetics=false;
      })
    }
    getImportTypeName(data)
    {
      this.ireadyApi.setStorage("importTypesCosmetics",data);
      this.router.navigate(['/food/ingredientsregulations/regulations']);
    }
    DeleteImportTypesCosmetics() {
      this.modalReference = this.modalService.open(InActiveComponent, { size: 'sm' });
      this.modalReference.componentInstance.objModel = this.selectedImportTypesCosmetics;
      this.modalReference.componentInstance.moduleType = 'ImportTypesCosmetics';
      this.modalReference.result.then((result) => {
      this.GetAllImportTypesCosmetics();
         });
     
    }
    // ShowActiveImportTypesCosmetics(event)
    // {
    //   debugger;
    //   let isactive=false;
    //   if(event.checked.length>0)
    //   isactive=true;
    // }
      




}
