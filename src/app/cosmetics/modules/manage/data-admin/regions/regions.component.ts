import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { Region } from 'src/app/cosmetics/models/master-data/region';
import { InActiveComponent } from 'src/app/cosmetics/shared/components/in-active/in-active.component';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit{
  regions: any[] = [];
  isAddRegion: boolean = false;
  public selectedRegion: Region = new Region();
  public objRegion: Region = new Region();
  regionItems: MenuItem[];
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  isaction: boolean = true;

  constructor(public _appService: AppService, private ireadyApi: IreadyApiService, private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setHeaderTitle("Regulations");
    this.GetAllRegions();
      this.regionItems = [
        {
          label: 'Update', icon: 'pi pi-refresh', command: () => {
            debugger;
            this.AddAndUpdateRegion('Edit');
          }
        },
        {
          label: 'Delete', icon: 'pi pi-times', command: () => {
            this.DeleteRegion();
          }
        }
      ];
  }

  public HandleActionsClickRegion(event, type) {
    if (type == "region") {
      this.selectedRegion = event;
    }
  }
  SaveAndUpdateRegion(type) {
    if (type != "Add") {
      debugger;
      this.ireadyApi.postData("IngMasterData/FindOneAndUpdate", this.objRegion).toPromise().then((resp: any) => {
        this.regions = resp.data;
        this.GetAllRegions()
      })
    }
    else {
      this.ireadyApi.postData("IngMasterData/InsertRegion", this.objRegion).toPromise().then((resp: any) => {
        this.regions = resp.data;
        this.GetAllRegions()
      })
    }
  }
  onRegionClose()
  {
    this.isAddRegion = false;
  }
  AddAndUpdateRegion(type) {
    this.isAddRegion = true;
    if (type != "Add") {
      this.isaction = false;
      this.objRegion = this.selectedRegion;
    }
    else {
      this.isaction = true;
      this.objRegion = new Region();
    }
  }
  GetAllRegions() {
    this.ireadyApi.getData("IngMasterData/GetAllRegions").toPromise().then((resp: any) => {
      this.regions = resp.data;
      this.isAddRegion = false;
    })
  }
  getregionName(data) {
    this.ireadyApi.setStorage("regions", data);
    this.router.navigate(['/food/ingredientsregulations/regulations']);
  }
  DeleteRegion() {
    this.modalReference = this.modalService.open(InActiveComponent, { size: 'sm' });
    this.modalReference.componentInstance.objModel = this.selectedRegion;
    this.modalReference.componentInstance.moduleType = 'regions';
    this.modalReference.result.then((result) => {
    this.GetAllRegions();
  });
  }
  // ShowActiveRegion(event) {
  //  let isactive=false;
  //   if(event.checked.length>0)
  //  isactive=true;
  // }

}
