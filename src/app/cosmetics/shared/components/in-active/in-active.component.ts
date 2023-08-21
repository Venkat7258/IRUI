import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    this.isActive=!this.objModel.isDelete;
  }
  DeleteAction()
  {
    if(this.moduleType=="Country")
    {
      this.ireadyApi.postData("IngMasterData/DeleteCountryById?id="+this.objModel.id +"&modifiedBy="+this.objModel.modifiedBy+"&isactive="+this.objModel.isDelete,{}).toPromise().then((resp: any) => {
      this.activeModal.close(this.moduleType);
      })
    }
    else if(this.moduleType=="RegulationStatusCosing")
     {
      this.ireadyApi.postData("IngMasterData/DeleteRegulationStatusCosingById?id="+this.objModel.id +"&modifiedBy="+this.objModel.modifiedBy+"&isactive="+this.objModel.isDelete,{}).toPromise().then((resp: any) => {
       this.activeModal.close(this.moduleType);
        })
     }
     else if(this.moduleType=="ruletypeCategories")
     {
      this.ireadyApi.postData("IngMasterData/DeleteRuletypeCategoriesById?id="+this.objModel.id +"&modifiedBy="+this.objModel.modifiedBy+"&isactive="+this.objModel.isDelete,{}).toPromise().then((resp: any) => {
       this.activeModal.close(this.moduleType);
        })
     }
     else if(this.moduleType=="ruleTypes")
     {
      this.ireadyApi.postData("IngMasterData/DeleteRuleTypesById?id="+this.objModel.id +"&modifiedBy="+this.objModel.modifiedBy+"&isactive="+this.objModel.isDelete,{}).toPromise().then((resp: any) => {
       this.activeModal.close(this.moduleType);
        })
     }
     else if(this.moduleType=="regions")
     {
      this.ireadyApi.postData("IngMasterData/DeleteRegionById?id="+this.objModel.id +"&modifiedBy="+this.objModel.modifiedBy+"&isactive="+this.objModel.isDelete,{}).toPromise().then((resp: any) => {
       this.activeModal.close(this.moduleType);
        })
     }
     else if(this.moduleType=="subscriptionPriceDetails")
     {
      this.ireadyApi.postData("IngMasterData/DeleteSubscriptionPriceDetailsById?id="+this.objModel.id +"&modifiedBy="+this.objModel.modifiedBy+"&isactive="+this.objModel.isDelete,{}).toPromise().then((resp: any) => {
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
