import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { SubscriptionPriceDetails } from 'src/app/cosmetics/models/master-data/subscription-price-details';
import { InActiveComponent } from 'src/app/cosmetics/shared/components/in-active/in-active.component';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-subscription-price-details',
  templateUrl: './subscription-price-details.component.html',
  styleUrls: ['./subscription-price-details.component.scss']
})
export class SubscriptionPriceDetailsComponent implements OnInit {
  subscriptionPriceDetails: any[] = [];
  isAddSubscriptionPriceDetails: boolean = false;
  public selectedSubscriptionPriceDetails: SubscriptionPriceDetails = new SubscriptionPriceDetails();
  public objSubscriptionPriceDetails: SubscriptionPriceDetails = new SubscriptionPriceDetails();
  subscriptionPriceDetailsitems: MenuItem[];
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  isaction: boolean = true;

  constructor(public _appService: AppService, private ireadyApi: IreadyApiService, private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setHeaderTitle("Regulations");
    this.GetAllSubscriptionPriceDetails();
  this.subscriptionPriceDetailsitems = [
    {
      label: 'Update', icon: 'pi pi-refresh', command: () => {
        debugger;
        this.AddAndUpdateSubscriptionPriceDetails('Edit');
      }
    },
    {
      label: 'Delete', icon: 'pi pi-times', command: () => {
      this. DeleteSubscriptionPriceDetails();
      }
    }
  ];
}
public HandleActionsClickSubscriptionPriceDetails(event, type) {
  if (type == "subscriptionPriceDetails") {
    this.selectedSubscriptionPriceDetails = event;
  }
}
SaveAndUpdateSubscriptionPriceDetails(type) {
  if (type != "Add") {
    this.ireadyApi.postData("IngMasterData/UpdateSubscriptionPriceDetails", this.objSubscriptionPriceDetails).toPromise().then((resp: any) => {
      this.subscriptionPriceDetails = resp.data;
      this.GetAllSubscriptionPriceDetails()
    })
  }
  else {
    this.ireadyApi.postData("IngMasterData/InsertSubscriptionPriceDetails", this.objSubscriptionPriceDetails).toPromise().then((resp: any) => {
      this.subscriptionPriceDetails = resp.data;
      this.GetAllSubscriptionPriceDetails()
    })
  }
}
onSubscriptionPriceDetailsClose()
  {
    this.isAddSubscriptionPriceDetails = false;
  }
AddAndUpdateSubscriptionPriceDetails(type) {
  this.isAddSubscriptionPriceDetails = true;
  if (type != "Add") {
    this.isaction = false;
    this.objSubscriptionPriceDetails = this.selectedSubscriptionPriceDetails;
  }
  else {
    this.isaction = true;
    this.objSubscriptionPriceDetails = new SubscriptionPriceDetails();
  }
}
GetAllSubscriptionPriceDetails() {
  this.ireadyApi.getData("IngMasterData/GetAllSubscriptionPriceDetails").toPromise().then((resp: any) => {
    this.subscriptionPriceDetails = resp.data;
    this.isAddSubscriptionPriceDetails = false;
  })
}
getDuration(data) {
  this.ireadyApi.setStorage("subscriptionPriceDetails", data);
  this.router.navigate(['/food/ingredientsregulations/regulations']);
}
DeleteSubscriptionPriceDetails() {
  this.modalReference = this.modalService.open(InActiveComponent, { size: 'sm' });
  this.modalReference.componentInstance.objModel = this.selectedSubscriptionPriceDetails;
  this.modalReference.componentInstance.moduleType = 'subscriptionPriceDetails';
  this.modalReference.result.then((result) => {
  this.GetAllSubscriptionPriceDetails();
});
}
ShowActiveSubscriptionPriceDetails(event) {
  let isactive=false;
  if(event.checked.length>0)
  isactive=true;
}
}