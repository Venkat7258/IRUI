import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-in-active',
  templateUrl: './in-active.component.html',
  styleUrls: ['./in-active.component.scss']
})
export class InActiveComponent implements OnInit {
  @Input() objModel;
 @Input() moduleType;
 public isActive:boolean=true;
  constructor(public activeModal: NgbActiveModal,private ireadyApi: IreadyApiService) {}
  ngOnInit(): void {
    debugger;
    this.isActive=!this.objModel.isDelete;

  }
  DeleteAction() {
    debugger;
      if(this.moduleType=="RegulationStatusChem") {
        
      this.ireadyApi.postData("IngMasterData/DeleteRegulationStatusChemById?id="+this.objModel.id +"&modifiedBy="+this.objModel.modifiedBy+"&isactive="+this.objModel.isDelete,{}).toPromise().then((resp: any) => 
    { 
    this.activeModal.close(this.moduleType);
     })
    }
    else if(this.moduleType=="ImportTypesCosmetics")
      {
        debugger;
    
      this.ireadyApi.postData("IngMasterData/DeleteImportTypesCosmeticsById?id="+this.objModel.id +"&modifiedBy="+this.objModel.modifiedBy+"&isactive="+this.objModel.isDelete,{}).toPromise().then((resp:any) => { 
       this.activeModal.close(this.moduleType);
     })
       }
       else if(this.moduleType=="SubstanceDataSources")
       {
     
       this.ireadyApi.postData("IngMasterData/DeleteSubstanceDataSourcesById?id="+this.objModel.id +"&modifiedBy="+this.objModel.modifiedBy+"&isactive="+this.objModel.isDelete,{}).toPromise().then((resp:any) => { 
        this.activeModal.close(this.moduleType);
      })
        }
        else if(this.moduleType=="ConditionTypes")
        {
          debugger;
        this.ireadyApi.postData("IngMasterData/DeleteUpdateConditionTypesById?id="+this.objModel.id +"&modifiedBy="+this.objModel.modifiedBy+"&isactive="+this.objModel.isDelete,{}).toPromise().then((resp:any) => { 
         this.activeModal.close(this.moduleType);
       })
         }
      }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`; 
    }
  }
}
