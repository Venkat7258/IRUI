import { Component, OnInit } from '@angular/core';
import { FormulaComplianceService } from 'src/app/cosmetics/services/formula-compliance.service';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-edit-formula',
  templateUrl: './edit-formula.component.html',
  styleUrls: ['./edit-formula.component.scss']
})
export class EditFormulaComponent implements OnInit {

  constructor(public _appService: AppService, private ireadyApi: IreadyApiService, private _fcs: FormulaComplianceService) { }

  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setSideMenuShow(true);
    this._appService.setHeaderTitle("");
  }




}
