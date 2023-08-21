import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-common-list-modal',
  templateUrl: './common-list-modal.component.html',
  styleUrls: ['./common-list-modal.component.scss']
})
export class CommonListModalComponent implements OnInit {
  @Input() objModel;
  @Input() moduleType;
  public title: string;
  constructor(public activeModal: NgbActiveModal, private ireadyApi: IreadyApiService) { }
  ngOnInit(): void {
    debugger;
    if (this.moduleType == "function")
      this.title = "Functions";
    else if (this.moduleType == "cosmeticsInventory")
      this.title = "Markets/ Countries";
    else if (this.moduleType == "chemicalInventory")
      this.title = "Markets/ Countries";
    else if (this.moduleType == "euInciNames")
      this.title = "EU INCI Name";
    else if (this.moduleType == "usInciNames")
      this.title = "US INCI Name";
    else if (this.moduleType == "otherNames")
      this.title = "Other Names";
  }
  closeModal() {
    this.activeModal.close(this.moduleType);
  }
}
