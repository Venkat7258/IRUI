import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { RegulationStatusCosing } from 'src/app/cosmetics/models/master-data/regulation-status-cosing';
import { InActiveComponent } from 'src/app/cosmetics/shared/components/in-active/in-active.component';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-regulationstatuscosing',
  templateUrl: './regulationstatuscosing.component.html',
  styleUrls: ['./regulationstatuscosing.component.scss']
})
export class RegulationstatuscosingComponent implements OnInit {
  regulationStatusCosing: any[] = [];
  isAddRegulationStatusCosing: boolean = false;
  public selectedRegulationStatusCosing: RegulationStatusCosing = new RegulationStatusCosing();
  public objregulationStatusCosing: RegulationStatusCosing = new RegulationStatusCosing();
  regulationStatusCosingItems: MenuItem[];
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  isaction: boolean = true;

  constructor(public _appService: AppService, private ireadyApi: IreadyApiService, private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setHeaderTitle("Regulations");
    this.GetAllRegulationStatusCosing();
     // RegulationStatusCosing
     this.regulationStatusCosingItems = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => {
          debugger;
          this.AddAndUpdateRegulationStatusCosing('Edit');
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          this.DeleteRegulationStatusCosing();
        }
      }
    ];
  }
  public HandleActionsClickRegulationStatusCosing(event, type) {
    if (type == "regulationStatusCosing") {
      this.selectedRegulationStatusCosing = event;
    }
  }
  SaveAndUpdateRegulationStatusCosing(type) {
    if (type != "Add") {
      this.ireadyApi.postData("IngMasterData/UpdateRegulationStatusCosing", this.objregulationStatusCosing).toPromise().then((resp: any) => {
        this.regulationStatusCosing = resp.data;
        this.GetAllRegulationStatusCosing()
      })
    }
    else {
      this.ireadyApi.postData("IngMasterData/InsertRegulationStatusCosing", this.objregulationStatusCosing).toPromise().then((resp: any) => {
        this.regulationStatusCosing = resp.data;
        this.GetAllRegulationStatusCosing()
      })
    }
  }
  onRegulationStatusCosingClose()
  {
    this.isAddRegulationStatusCosing = false;
  }
  AddAndUpdateRegulationStatusCosing(type) {
    this.isAddRegulationStatusCosing = true;
    if (type != "Add") {
      this.isaction = false;
      this.objregulationStatusCosing = this.selectedRegulationStatusCosing;
    }
    else {
      this.isaction = true;
      this.objregulationStatusCosing = new RegulationStatusCosing();
    }
  }
  GetAllRegulationStatusCosing() {
    this.ireadyApi.getData("IngMasterData/GetAllRegulationStatusCosing").toPromise().then((resp: any) => {
      this.regulationStatusCosing = resp.data;
      this.isAddRegulationStatusCosing = false;
    })
  }
  getregulationsStatus(data) {
    this.ireadyApi.setStorage("regulationStatusCosing", data);
    this.router.navigate(['/food/ingredientsregulations/regulations']);
  }
  DeleteRegulationStatusCosing() {
    this.modalReference = this.modalService.open(InActiveComponent, { size: 'sm' });
    this.modalReference.componentInstance.objModel = this.selectedRegulationStatusCosing;
    this.modalReference.componentInstance.moduleType = 'RegulationStatusCosing';
    this.modalReference.result.then((result) => {
    this.GetAllRegulationStatusCosing();
     });
  }
  // ShowActiveRegulationStatusCosing(event){
  //   let isactive=false;
  //   if(event.checked.length>0)
  //   isactive=true;
  // }
}
