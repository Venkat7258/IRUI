import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Formula } from '../models/fomulea';
import { FormulaListRequest } from '../models/request/formula-list-request';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormulaComplianceService {
  selectedFormula = new BehaviorSubject<Formula>(null);
  selectedFormulaID = new BehaviorSubject<string>('');
  isEditFormula = new BehaviorSubject<boolean>(false);
  isSampleFormula = new BehaviorSubject<boolean>(false);

  selectedFormulaLocalStorageKey: string = "selectedFormula";
  isEditFormulaLocalStorageKey: string = "isEditFormula";
  isSampleFormulaLocalStorageKey: string = "isSampleFormula";
  selectedFormulaIDLocalStorageKey: string = "selectedFormulaID";

  constructor(private ireadyApi: IreadyApiService) {
    if (localStorage.getItem(this.selectedFormulaLocalStorageKey) !== null || localStorage.getItem(this.selectedFormulaLocalStorageKey) !== '') {
      let _formula: Formula = JSON.parse(localStorage.getItem(this.selectedFormulaLocalStorageKey));
      this.set_selectedFormula(_formula);
    }

    if (localStorage.getItem(this.isEditFormulaLocalStorageKey) !== null || localStorage.getItem(this.isEditFormulaLocalStorageKey) !== '') {
      let _isEditFormula: boolean = Boolean(localStorage.getItem(this.isEditFormulaLocalStorageKey));
      this.set_isEditFormula(_isEditFormula);
    }

    if (localStorage.getItem(this.isSampleFormulaLocalStorageKey) !== null || localStorage.getItem(this.isSampleFormulaLocalStorageKey) !== '') {
      let _isSampleFormula: boolean = Boolean(localStorage.getItem(this.isSampleFormulaLocalStorageKey));
      this.set_isSampleFormula(_isSampleFormula);
    }

    if (localStorage.getItem(this.selectedFormulaIDLocalStorageKey) !== null || localStorage.getItem(this.selectedFormulaIDLocalStorageKey) !== '') {
      let _formulaID = localStorage.getItem(this.selectedFormulaIDLocalStorageKey);
      this.set_selectedFormulaID(_formulaID);
    }

  }

  set_selectedFormula(selectedFormula: Formula) {
    this.selectedFormula.next(selectedFormula);
    localStorage.setItem(this.selectedFormulaLocalStorageKey, JSON.stringify(selectedFormula));
  }

  set_selectedFormulaID(selectedFormulaID: string) {
    this.selectedFormulaID.next(selectedFormulaID);
    localStorage.setItem(this.selectedFormulaIDLocalStorageKey, selectedFormulaID);
  }

  set_isEditFormula(isEdit: boolean) {
    this.isEditFormula.next(isEdit);
    localStorage.setItem(this.isEditFormulaLocalStorageKey, JSON.stringify(isEdit));
  }

  set_isSampleFormula(isSampleFormula: boolean) {
    this.isSampleFormula.next(isSampleFormula);
    localStorage.setItem(this.isSampleFormulaLocalStorageKey, JSON.stringify(isSampleFormula));
  }

  remove_IsEditFormula() {
    localStorage.removeItem(this.isEditFormulaLocalStorageKey);
  }

  remove_isSampleFormula() {
    localStorage.removeItem(this.isSampleFormulaLocalStorageKey);
  }

  remove_selectedFormula() {
    localStorage.removeItem(this.selectedFormulaLocalStorageKey);
  }

  remove_selectedFormulaID() {
    localStorage.removeItem(this.selectedFormulaIDLocalStorageKey);
  }

  GetMasterData(): any {
    return this.ireadyApi.getData(ApiConfig.GetMasterData, null)
  }

  getFormulaListData(requestModel: FormulaListRequest): any {
    return this.ireadyApi.postData(ApiConfig.GetFormulaListData, requestModel, "FC");
  }

  SaveFormulaDetail(requestModel: Formula) {
    let serviceLocation = requestModel.id === '' ? ApiConfig.SaveFormulaDetail : ApiConfig.UpdateFormulaDetail;
    return this.ireadyApi.postData(serviceLocation, requestModel, "FC");
  }

  GetFormulaById(Id: string): any {
    let params = new HttpParams().set("Id", Id);
    return this.ireadyApi.getData(ApiConfig.GetFormulaById, params, "FC");
  }

  GetAllCountries(): any {
    return this.ireadyApi.getData(ApiConfig.GetAllCountries, null, "");
  }

}
export const ApiConfig = {
  "GetMasterData": "RulesMasterData/GetMasterData",
  "GetFormulaListData": "Formula/GetFormulaList",
  "SaveFormulaDetail": "Formula/SaveFormulaDetail",
  "UpdateFormulaDetail": "Formula/UpdateFormulaDetail",
  "GetFormulaById": "Formula/GetFormulaById",
  "GetAllCountries": "IngMasterData/GetAllCountries"
}; 