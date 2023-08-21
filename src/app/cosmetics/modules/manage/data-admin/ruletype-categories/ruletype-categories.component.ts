import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { RuletypeCategories } from 'src/app/cosmetics/models/master-data/ruletype-categories';
import { InActiveComponent } from 'src/app/cosmetics/shared/components/in-active/in-active.component';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-ruletype-categories',
  templateUrl: './ruletype-categories.component.html',
  styleUrls: ['./ruletype-categories.component.scss']
})
export class RuletypeCategoriesComponent implements OnInit{
  ruletypeCategories: any[] = [];
  isAddRuletypeCategories: boolean = false;
  public selectedRuletypeCategories: RuletypeCategories = new RuletypeCategories();
  public objRuletypeCategories: RuletypeCategories = new RuletypeCategories();
  RuletypeCategoriesItems: MenuItem[];
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  isaction: boolean = true;

  constructor(public _appService: AppService, private ireadyApi: IreadyApiService, private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setHeaderTitle("Regulations");
    this.GetAllRuletypeCategories();
    this.RuletypeCategoriesItems = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => {
          debugger;
          this.AddAndUpdateRuletypeCategories('Edit');
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          this.DeleteRuletypeCategories();
        }
      }
    ];
}
public HandleActionsClickRuletypeCategories(event, type) {
  if (type == "ruletypeCategories") {
    this.selectedRuletypeCategories = event;
  }
}
SaveAndUpdateRuletypeCategories(type) {
  if (type != "Add") {
    this.ireadyApi.postData("IngMasterData/UpdateRuletypeCategories", this.objRuletypeCategories).toPromise().then((resp: any) => {
      this.ruletypeCategories = resp.data;
      this.GetAllRuletypeCategories()
    })
  }
  else {
    this.ireadyApi.postData("IngMasterData/InsertRuletypeCategories", this.objRuletypeCategories).toPromise().then((resp: any) => {
      this.ruletypeCategories = resp.data;
      this.GetAllRuletypeCategories()
    })
  }
}
onruletypeCategoriesClose()
  {
    this.isAddRuletypeCategories = false;
  }
AddAndUpdateRuletypeCategories(type) {
  this.isAddRuletypeCategories = true;
  if (type != "Add") {
    this.isaction = false;
    this.objRuletypeCategories = this.selectedRuletypeCategories;
  }
  else {
    this.isaction = true;
    this.objRuletypeCategories = new RuletypeCategories();
  }
}
GetAllRuletypeCategories() {
  debugger;
  this.ireadyApi.getData("IngMasterData/GetAllRuletypeCategories").toPromise().then((resp: any) => {
    this.ruletypeCategories = resp.data;
    this.isAddRuletypeCategories = false;
  })
}
getRuletypeId(data) {
  debugger;
  this.ireadyApi.setStorage("ruletypeCategories", data);
  this.router.navigate(['/food/ingredientsregulations/regulations']);
}
DeleteRuletypeCategories() {
  this.modalReference = this.modalService.open(InActiveComponent, { size: 'sm' });
  this.modalReference.componentInstance.objModel = this.selectedRuletypeCategories;
  this.modalReference.componentInstance.moduleType = 'ruletypeCategories';
  this.modalReference.result.then((result) => {
  this.GetAllRuletypeCategories();
});
}
// ShowActiveRuletypeCategories(event){
//   let isactive=false;
//   if(event.checked.length>0)
//   isactive=true;
// }
}