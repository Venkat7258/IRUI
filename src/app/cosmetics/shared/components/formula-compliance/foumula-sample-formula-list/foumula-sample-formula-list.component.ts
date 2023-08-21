import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterMatchMode, MenuItem } from 'primeng/api';
import { Formula } from 'src/app/cosmetics/models/fomulea';
import { FormulaListRequest } from 'src/app/cosmetics/models/request/formula-list-request';
import { ResponseData } from 'src/app/cosmetics/models/response-data';
import { FormulaListResponse } from 'src/app/cosmetics/models/response/formula-list-response';
import { FormulaComplianceService } from 'src/app/cosmetics/services/formula-compliance.service';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-foumula-sample-formula-list',
  templateUrl: './foumula-sample-formula-list.component.html',
  styleUrls: ['./foumula-sample-formula-list.component.css']
})
export class FoumulaSampleFormulaListComponent implements OnInit {
  @Input() isSampleFormula: boolean = false;

  dataSource: Formula[];
  loading: boolean;

  formulaSearchFilterForm = this.formBuilder.group({
    formulaName: new FormControl(''),
    formulaDescription: new FormControl(''),
    ingredientName: new FormControl(''),
  });

  first = 0;
  rows = 10;

  totalRecords: number = 0;
  orderBy: string = 'modifiedDate';
  shortOrder: number = -1;

  selectedContextTD: Formula;
  contextMenu: MenuItem[];
  isLoadingFirstTime: boolean;

  matchModeOptions = [
    {
      label: 'Contains',
      value: FilterMatchMode.CONTAINS
    }
  ];

  constructor(public _appService: AppService, private ireadyApi: IreadyApiService, private _fcs: FormulaComplianceService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setSideMenuShow(true);
    this._appService.setHeaderTitle("");
    this.getFormulaListData();
  }

  prepCm() {
    this.contextMenu = [{
      label: 'View', icon: 'pi pi-eye', command: (event) => {
        this.viewFormula(this.selectedContextTD.id, 'view');
      }
    },
    { label: 'Edit', icon: 'pi pi-file-edit', command: (event) => { this.viewFormula(this.selectedContextTD.id, 'edit'); } },
    {
      label: 'Clone', icon: 'pi pi-clone', command: (event) => {
        this.viewFormula(this.selectedContextTD.id, 'clone');
      }
    },
    { label: 'Move To Sample Formula', icon: 'pi pi-external-link', command: (event) => { this.alertBox(this.selectedContextTD); } }
    ];
  }

  alertBox(selecedFormula: Formula) {
    alert(selecedFormula.formulaNo);
  }

  openCm(event, cm, formulaId: string) {
    let selectedFormula = this.getForulaBykey("id", formulaId);
    this.selectedContextTD = selectedFormula;
    event.preventDefault();
    event.stopPropagation();
    this.prepCm();
    cm.show(event);
    return false;
  }

  loadListData(event: any) {
    if (_.isNull(event.filters.formulaNo[0].value) && _.isNull(event.filters.description[0].value)) {
      if (!this.isLoadingFirstTime) {
        this.first = event.first;
        this.rows = event.rows;
        this.orderBy = event.sortField === undefined ? this.orderBy : event.sortField;
        // below condition is because short order is not always undefined
        this.shortOrder = event.sortField === undefined ? this.shortOrder : event.sortOrder;
        this.getFormulaListData();
      }
    }
  }

  onFormulaFilter(event: any) {
    let formulaNo = event.filters.formulaNo[0].value;
    let description = event.filters.description[0].value;

    if (!_.isNull(formulaNo) || !_.isNull(description)) {
      let data = this.dataSource.filter((row) => {
        return _.isNull(formulaNo) ? true : row.formulaNo.toLocaleLowerCase().includes(formulaNo)
          && _.isNull(description) ? true : row.description.toLocaleLowerCase().includes(description)
      });

      this.dataSource = data;

    }
  }

  sort(event: any) {
    this.orderBy = event.field;
    this.shortOrder = event.order;
    this.getFormulaListData();
  }

  filterFormula() {
    this.getFormulaListData();
  }

  getFormulaListData() {
    this.loading = true;
    this.rows = 500;
    let requestModel: FormulaListRequest = {
      formulaName: this.formulaSearchFilterForm.controls["formulaName"].value,
      formulaDescription: this.formulaSearchFilterForm.controls["formulaDescription"].value,
      ingredientName: this.formulaSearchFilterForm.controls["ingredientName"].value,
      isDelete: false,
      skip: this.first,
      take: this.rows,
      orderBy: this.orderBy,
      shortOrder: this.shortOrder,
      isSampleFormula: this.isSampleFormula
    }

    this._fcs.getFormulaListData(requestModel).subscribe((response: ResponseData<FormulaListResponse>) => {
      this.dataSource = response.data.list;
      this.totalRecords = response.data.totalRows;
      this.loading = false;
      this.isLoadingFirstTime = false;
    });
  }

  getForulaBykey(keyName: string, value: string) {
    return this.dataSource.find(x => x[keyName] === value);
  }

  viewFormula(_id: any, mode: string) {
    // if (_id != '') {
    //   let selectedFormula = this.getForulaBykey("id", _id);
    //   this._fcs.set_selectedFormula(selectedFormula);
    // }
    this.navigateToFormulaPage(_id, mode);
  }

  navigateToFormulaPage(_id: any, mode: string) {
    let _selectedFormula: Formula = null;
    _selectedFormula = this.getForulaBykey("id", _id);
    this._fcs.set_isSampleFormula(this.isSampleFormula);
    // alert('this.isSampleFormula '+ this.isSampleFormula);

    switch (mode) {
      case 'edit': {
        this._fcs.set_isEditFormula(true);
        this._fcs.set_selectedFormula(_selectedFormula);
        this._fcs.set_selectedFormulaID(_selectedFormula.id);
        let routerLink = 'cosmetics/formulacompliance/' + (!this.isSampleFormula ? 'formula/' : 'sampleformula/') + 'editformula';
        this.router.navigate([routerLink]);

        break;
      }
      case 'add': {
        this._fcs.set_selectedFormula(null);
        this._fcs.set_isEditFormula(false);
        let routerLink = 'cosmetics/formulacompliance/' + (!this.isSampleFormula ? 'formula/' : 'sampleformula/') + 'addformula';
        this.router.navigate([routerLink]);
        break;
      }
      case 'view': {
        this._fcs.set_isEditFormula(true);
        this._fcs.set_selectedFormula(_selectedFormula);
        let routerLink = 'cosmetics/formulacompliance/' + (!this.isSampleFormula ? 'formula/' : 'sampleformula/') + 'viewformula';
        this.router.navigate([routerLink]);

        break;
      }
      case 'clone': {
        this._fcs.set_isEditFormula(false);
        this._fcs.set_selectedFormula(_selectedFormula);
        let routerLink = 'cosmetics/formulacompliance/' + (!this.isSampleFormula ? 'formula/' : 'sampleformula/') + 'cloneformula';
        this.router.navigate([routerLink]);
        break;
      }
    }
  }

  navigageToCompliance(formula_id: string) {
    this._fcs.set_selectedFormulaID(formula_id);
    let routerLink = 'cosmetics/formulacompliance/' + (!this.isSampleFormula ? 'formula/' : 'sampleformula/') + 'compliance';
    this.router.navigate([routerLink]);
    // formula/compliance
  }
}
