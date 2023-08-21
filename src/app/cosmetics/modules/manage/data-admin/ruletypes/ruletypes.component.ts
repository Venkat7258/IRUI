import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { RuleTypes } from 'src/app/cosmetics/models/master-data/rule-types';
import { InActiveComponent } from 'src/app/cosmetics/shared/components/in-active/in-active.component';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-ruletypes',
  templateUrl: './ruletypes.component.html',
  styleUrls: ['./ruletypes.component.scss']
})
export class RuletypesComponent implements OnInit{
  ruleTypes: any[] = [];
  isAddRuleTypes: boolean = false;
  public selectedRuleTypes: RuleTypes = new RuleTypes();
  public objRuleTypes: RuleTypes = new RuleTypes();
  ruleTypesItems: MenuItem[];
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  isaction: boolean = true;

  constructor(public _appService: AppService, private ireadyApi: IreadyApiService, private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setHeaderTitle("Regulations");
    this.GetAllRuleTypes();
    this.ruleTypesItems = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => {
          debugger;
          this.AddAndUpdateRuleTypes('Edit');
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          this.DeleteRuleTypes();
        }
      }
    ];
}
public HandleActionsClickRuleTypes(event, type) {
  if (type == "ruleTypes") {
    this.selectedRuleTypes = event;
  }
}
SaveAndUpdateRuleTypes(type) {
  if (type != "Add") {
    this.ireadyApi.postData("IngMasterData/UpdateRuleTypes", this.objRuleTypes).toPromise().then((resp: any) => {
      this.ruleTypes = resp.data;
      this.GetAllRuleTypes()
    })
  }
  else {
  
    this.ireadyApi.postData("IngMasterData/InsertRuleTypes", this.objRuleTypes).toPromise().then((resp: any) => {
      this.ruleTypes = resp.data;
      this.GetAllRuleTypes()
    })
  }
}
onRuleTypesClose()
  {
    this.isAddRuleTypes = false;
  }
AddAndUpdateRuleTypes(type) {
  this.isAddRuleTypes = true;
  if (type != "Add") {
    this.isaction = false;
    this.objRuleTypes = this.selectedRuleTypes;
  }
  else {
    this.isaction = true;
    this.objRuleTypes = new RuleTypes();
  }
}
GetAllRuleTypes() {
  this.ireadyApi.getData("IngMasterData/GetAllRuleTypes").toPromise().then((resp: any) => {
    this.ruleTypes = resp.data;
    this.isAddRuleTypes = false;
  })
}
getruleTypeID(data) {
  this.ireadyApi.setStorage("ruleTypes", data);
  this.router.navigate(['/food/ingredientsregulations/regulations']);
}
DeleteRuleTypes() {
  this.modalReference = this.modalService.open(InActiveComponent, { size: 'sm' });
  this.modalReference.componentInstance.objModel = this.selectedRuleTypes;
  this.modalReference.componentInstance.moduleType = 'ruleTypes';
  this.modalReference.result.then((result) => {
  this.GetAllRuleTypes();
});
}
// ShowActiveRuleTypes(event) {
//   let isactive=false;
//   if(event.checked.length>0)
//   isactive=true;
// }
}