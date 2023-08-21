import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ExposureType } from 'src/app/cosmetics/models/exposure-type';
import { Formula, FormulaSpec } from 'src/app/cosmetics/models/fomulea';
import { FormulaSpecGrid } from 'src/app/cosmetics/models/formula-spec-grid';
import { ProductTypes } from 'src/app/cosmetics/models/product-types';
import { IngredientSearhRequest } from 'src/app/cosmetics/models/request/ingredient-searh-request';
import { ResponseData } from 'src/app/cosmetics/models/response-data';
import { IngredientsSearchResponse } from 'src/app/cosmetics/models/response/ingredients-search-response';
import { SeasonalAyr } from 'src/app/cosmetics/models/seasonal-ayr';
import { ProductSubProductTypes } from 'src/app/cosmetics/models/product-subproduct-types';
import { UseTypes } from 'src/app/cosmetics/models/use-types';
import { FormulaComplianceService } from 'src/app/cosmetics/services/formula-compliance.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Ingredients } from 'src/app/cosmetics/models/ingredients';
import { StringDataPopupModelWithActionService } from 'src/app/cosmetics/services/string-data-popup-model-with-action-service';
import { BehaviorSubject, Subscription, findIndex } from 'rxjs';
import { IngredientsRegulationsService } from 'src/app/cosmetics/services/ingredients-regulations.service';
import { StringDataPopupModelWithAction } from '../../../models/string-data-popup-model-with-action';
import { DropDownTextValueModel } from '../../../models/drop-down-text-value-model';


@Component({
  selector: 'app-formula-sample-formula-crud',
  templateUrl: './formula-sample-formula-crud.component.html',
  styleUrls: ['./formula-sample-formula-crud.component.css']
})
export class FormulaSampleFormulaCRUDComponent implements OnInit, OnDestroy {
  @Input() mode: string = '';
  subscriptions: Subscription[] = [];
  isControlsDisabled: boolean = false;

  stepsActiveIndex: number = 0;
  isEdit: boolean;
  isSampleFormula: boolean;
  addEditFormula: Formula;

  addEditFormulaForm = this.formBuilder.group({
    id: new FormControl(''),
    formulaNo: new FormControl(null, [Validators.required]),
    description: new FormControl(''),

    useType: new FormControl(null, [Validators.required]),
    productType: new FormControl(null, [Validators.required]),
    productSubType: new FormControl(null, [Validators.required]),
    exposureType: new FormControl(null, [Validators.required]),

    retentionFactor: new FormControl('', [Validators.required]),
    amountAppUnits: new FormControl(''),
    amountofProdApp: new FormControl('', [Validators.required]),
    areaOfApplication: new FormControl(''),
    deliveryMechanism: new FormControl(''),

    brandName: new FormControl(''),
    supplierName: new FormControl(''),
    intendedCountries: new FormControl(''),
    compliance: new FormControl(''),
    seasonalorAYR: new FormControl(""),
    eUorAsiaSeasoned: new FormControl(""),
    // sourcedRegion: new FormControl(''),
    remarks: new FormControl(''),


  });
  stepsItems: MenuItem[];
  productTypes: Array<DropDownTextValueModel> = [];
  useTypes: Array<DropDownTextValueModel> = [];
  subProductTypeList: Array<ProductSubProductTypes> = [];
  selectedSupProductType: ProductSubProductTypes = null;
  productSubProductTypes: Array<DropDownTextValueModel> = [];
  exposureTypes: Array<DropDownTextValueModel> = [];
  seasonalAYRs: Array<DropDownTextValueModel> = [];
  EUorAsiaSeasons: Array<DropDownTextValueModel> = [];

  retentionFactor_ExistingValue: any;
  AmtOfProductApplied_ExistingValue: any;
  AmtOfProductApplied_Unit: string = '';
  searchlist: Array<DropDownTextValueModel> = [
    { text: 'Ingredient Name', value: 'ingredientName' },
    { text: 'CAS No', value: 'casNo' },
    { text: 'EU INCI Name', value: 'ingData.euInciNames' },
    { text: 'US INCI Name', value: 'ingData.usInciNames' },
    { text: 'Japanese Name', value: 'ingData.japaneseNames' },
    { text: 'Chinese Name', value: 'ingData.chineseNames' },
    { text: 'Other Names', value: 'ingData.otherNames.otherName' }
  ];

  searchTypes: Array<DropDownTextValueModel> = [
    { text: 'Starts with', value: '0' },
    { text: 'Ends with', value: '1' },
    { text: 'Contains', value: '2' },
    { text: 'Equal to', value: '3' }
  ];

  // Formula Ingredient GRID
  totalRecords: number = 0;
  formulaIngredients: FormulaSpec[] = [];
  selectedFormulaIngredients: FormulaSpec[] = [];
  selectedFinalizedFormulaIngredients: FormulaSpecGrid[] = [];

  // Formula Ingredient Search
  showIngredient: boolean = true;
  formulaIngSearchResult: FormulaSpecGrid[] = [];
  selectedFIngForFinalization: FormulaSpecGrid[] = [];

  formulaIngredientSearchForm = this.formBuilder.group({
    SearchText: new FormControl('', [Validators.required]),
    SelectedColumn: new FormControl('', [Validators.required]),
    SearchBy: new FormControl('', [Validators.required]),
  });

  first = 0;
  rows = 50;
  totalRecords_2: number = 0;
  orderByColumnName_MongoDB: string = 'IngredientName';
  shortOrder: number = -1;
  loading: boolean;
  // Formula Ingredient Search

  //Selected or Finalized Formula Ingredient 
  _finalizedFormulaIngredientGrid: FormulaSpecGrid[] = [];
  isIngredientSelectedForFinalized: boolean = false;
  //Selected or Finalized Formula Ingredient 

  //Dialoge
  position: string;

  constructor(private _fcs: FormulaComplianceService, private _irs: IngredientsRegulationsService, private formBuilder: FormBuilder,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private stringDataPopUpService: StringDataPopupModelWithActionService) {

  }

  isFormulaIngList = new BehaviorSubject<boolean>(false);
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.stepsItems = [
      { label: 'Product Details' },
      { label: 'Ingredient Details' }
    ];
    this.hideFinalizedIngOtherFunction();
    this.GetMasterData();
    this.getSelectedFunctionsList();
    this.getSampleFormula(false);
  }

  getSelectedFunctionsList() {
    let subs = this.isFormulaIngList.subscribe((value: boolean) => {
      this.UpdateDataFromPopUp(value);
      this.hideFinalizedIngOtherFunction();
    });
    this.subscriptions.push(subs);
  }

  get formulaForm(): { [key: string]: AbstractControl } {
    return this.addEditFormulaForm.controls;
  }

  getSampleFormula(isAllDataLoaded: boolean) {
    let subs = this._fcs.isSampleFormula.subscribe((_value: boolean) => {
      this.isSampleFormula = _value;
      if (isAllDataLoaded) {
        if (this.addEditFormula !== undefined || this.addEditFormula !== null) {
          this.addEditFormula.isSampleFormula = _value;
        }
      }
    });
    this.subscriptions.push(subs);
  }

  GetMasterData() {
    let subs = this._fcs.GetMasterData().subscribe((response: any) => {
      response.data.productTypesList.forEach((productType: ProductTypes) => {
        this.productTypes.push({ text: productType.productName, value: productType.productName })
      });

      let uniqueSubTypes = _.uniqBy(response.data.subProductTypeList, function (e) {
        return e.subProductName;
      });

      response.data.subProductTypeList.forEach((productSubProductTypes: ProductSubProductTypes) => {
        this.subProductTypeList.push(productSubProductTypes);
      });

      uniqueSubTypes.forEach((productSubProductTypes: ProductSubProductTypes) => {
        this.productSubProductTypes.push({ text: productSubProductTypes.subProductName, value: productSubProductTypes.subProductName })
      });

      response.data.useTypesList.forEach((useType: UseTypes) => {
        this.useTypes.push({ text: useType.useType, value: useType.useType })
      });

      response.data.exposureTypesList.forEach((exposureType: ExposureType) => {
        this.exposureTypes.push({ text: exposureType.exposureName, value: exposureType.exposureName })
      });


      response.data.seasonalAyrList.forEach((seasonalAyr: SeasonalAyr) => {
        this.seasonalAYRs.push({ text: seasonalAyr.name, value: seasonalAyr.name });
      });

      this.EUorAsiaSeasons.push({ text: "EU", value: "EU" });
      this.EUorAsiaSeasons.push({ text: "Asia", value: "Asia" });

      this.getSelectedFormula();

    }, (error: any) => {
      this.getSelectedFormula();

    });
    this.subscriptions.push(subs);

  }

  getSelectedFormula() {
    let subs = this._fcs.selectedFormula.subscribe((formula: Formula) => {
      if (formula === null) {
        formula = new Formula();
        this.addEditFormula = new Formula();
      }
      else {
        if (formula.id !== '') {
          formula.id = this.mode === "clone" ? '' : formula.id;
          this.isEdit = true;
          this.addEditFormula = formula;

        } else {
          this.isEdit = false;
          this.addEditFormula = new Formula();
        }

        let filteredFormulaSpecs = this.addEditFormula.formulaSpecs.filter(fm => fm.isDelete === false);

        this.formulaIngredients = filteredFormulaSpecs;
        this.addEditFormulaForm.patchValue({
          id: formula.id,
          formulaNo: formula.formulaNo,
          description: formula.description,

          useType: formula.useType,
          productType: formula.productType,
          productSubType: formula.productSubType,
          exposureType: formula.exposureType,

          brandName: formula.brandName,

          supplierName: formula.supplierName,
          intendedCountries: formula.intendedCountries,
          compliance: formula.compliance,
          seasonalorAYR: formula.seasonalorAYR.toString(),
          remarks: formula.remarks,
          eUorAsiaSeasoned: formula.eUorAsiaSeasoned.toString(),

          retentionFactor: formula.retensionFactor.toString(),
          amountAppUnits: formula.amountAppUnits,
          amountofProdApp: formula.amountofProdApp.toString(),
          areaOfApplication: formula.areasOfApplication,

          deliveryMechanism: formula.deliveryMechanism,
        });
      }
      this.getSampleFormula(true);

      this.GetIngredientsByNames(this.formulaIngredients);
    });
    this.isControlsDisabled = this.mode === "view" ? true : false;
    this.subscriptions.push(subs);
  }
  GetIngredientsByNames(formulaSpecs: FormulaSpec[]) {
    var requestList = formulaSpecs.map(a => a.ingredientName);
    let subs = this._irs.GetIngredientsByNames(requestList).subscribe((response: ResponseData<any>) => {
      let _responseData: ResponseData<Array<Ingredients>> = response;
      let fIngs: FormulaSpec[] = this.formulaIngredients;
      _.forEach(_responseData.data, function (ingredient: Ingredients) {
        let formulaIngredient: FormulaSpec = _.find(fIngs, function (fSpec: FormulaSpec) {
          return fSpec.ingredientName === ingredient.ingredientName;
        });

        formulaIngredient.functions = (ingredient.ingData !== null) ? ingredient.ingData.functions : null;
      });
      this.formulaIngredients = fIngs;
    });
    this.subscriptions.push(subs);
  }

  update_FormulaIngredientsGrid(fieldName: string, event: any, rowIndex: number) {
    let data = this.formulaIngredients[rowIndex];
    data[fieldName] = event.target.value;
  }

  update_finalizedFormulaIngredientsGrid(fieldName: string, event: any, rowIndex: number) {
    let data = this._finalizedFormulaIngredientGrid[rowIndex];
    data[fieldName] = event.target.value;
  }

  prevPage() {
    this.stepsActiveIndex = 0;
  }

  nextPage() {
    if (!this.isFormulaFormIsValid()) {
      return;
    }
    this.stepsActiveIndex = 1;
    this.hideFinalizedIngOtherFunction();
  }

  hideFinalizedIngOtherFunction() {
    this.stringDataPopUpService.set_selectedFormula(null);
  }

  ClearAllFormulaSearchPanel() {
    this.formulaIngSearchResult = [];
    this.formulaIngredientSearchForm.reset();
    this._finalizedFormulaIngredientGrid = [];
    this.selectedFIngForFinalization = [];
    this.selectedFinalizedFormulaIngredients = [];
  }

  isLoaded = false;
  loadformulaIngSearchResult(event: any) {
    if (!this.showIngredient && this.isLoaded) {
      this.first = event.first;
      this.rows = event.rows;
      this.orderByColumnName_MongoDB = event.sortField == undefined ? this.orderByColumnName_MongoDB : event.sortField;
      // below condition is because short order is not always undefined
      this.shortOrder = event.sortField == undefined ? this.shortOrder : event.sortOrder;
      this.ShowFormulaIngSearchResult();
    }
  }

  ShowFormulaIngSearchResult() {

    for (const control of Object.keys(this.formulaIngredientSearchForm.controls)) {
      this.formulaIngredientSearchForm.controls[control].markAsTouched();
      this.formulaIngredientSearchForm.controls[control].markAsDirty();
    }
    if (this.formulaIngredientSearchForm.invalid) {
      return;
    }

    this.isLoaded = true;

    this.formulaIngSearchResult = [];
    let formValue = this.formulaIngredientSearchForm.value;
    let req: IngredientSearhRequest = {
      searchBy: formValue.SearchBy,
      searchText: formValue.SearchText,
      selectedColumn: formValue.SelectedColumn,
      skip: this.first,
      take: this.rows,
      isDelete: false,
      typeId: 0,
      orderBy: this.orderByColumnName_MongoDB,
      shortOrder: this.shortOrder
    };
    let subs = this._irs.GetIngredientsBySearch(req).subscribe((response: ResponseData<IngredientsSearchResponse>) => {
      let data = response.data.listData;// IngData
      _.forEach(data, (element: Ingredients) => {

        let fIngSpecGrid: FormulaSpecGrid = new FormulaSpecGrid();
        fIngSpecGrid.id = element.id;
        fIngSpecGrid.ingredientName = element.ingredientName;
        fIngSpecGrid.casNo = element.casNo;
        fIngSpecGrid.givenName = 'NA';
        if (!_.isNull(element.ingData)) {
          fIngSpecGrid.dap = element.ingData.dap;
        }
        if (!_.isNull(element.otherNames)) {
          fIngSpecGrid.otherNames = element.otherNames;
        }
        else {
          fIngSpecGrid.otherNames = [];
        }
        fIngSpecGrid.functions = element.ingData !== null ? element.ingData.functions : null;

        let formulaIngredient = _.find(this.formulaIngredients, function (fSpec: FormulaSpec) {
          return fSpec.ingredientName === fIngSpecGrid.ingredientName;
        });
        if (formulaIngredient === null || formulaIngredient === undefined) {
          this.formulaIngSearchResult.push(fIngSpecGrid);
        }

      });
    }, (error: any) => {
    });
    this.subscriptions.push(subs);
  }

  onIngredientSelect(event: any, id: string) {
    let givenName = this.formulaIngredientSearchForm.controls["SearchText"].value;
    // let _todayDate = new Date();

    let selectedData = _.find(this.formulaIngSearchResult, function (obj) { return obj.id === id; });
    selectedData.givenName = givenName;

    selectedData.isSelectedForFinalization = event.checked.length > 0 ? true : false;

    this.Show_Hide_AddSelectedIngredientButton();
  }

  isFinalIngDapPercentageIsValid(): boolean {
    let result: boolean = true;
    _.forEach(this._finalizedFormulaIngredientGrid, (formuaIng: FormulaSpecGrid) => {
      let dap = formuaIng.dap.toString();
      let percentage = formuaIng.percentage.toString();
      if (result) {
        if (dap === "" || dap === "0") {
          alert("Dap Required");
          result = false;
        }
        else if (percentage === "" || percentage === "0") {
          alert("Percentage Required");
          result = false;
        }
      }

    });
    return result;
  }

  _OnAddedIngToFormulaIng() {
    if (!this.isFinalIngDapPercentageIsValid()) {
      return;
    }

    let _FormulaIngredients: FormulaSpec[] = [];
    _.forEach(this._finalizedFormulaIngredientGrid, function (element: FormulaSpecGrid) {

      let fs: FormulaSpec = {
        formulaSpecsId: element.formulaSpecsId,
        formulaId: element.formulaId,
        ingredientId: element.ingredientId,
        ingredientName: element.ingredientName,
        casNo: element.casNo,
        typeId: element.typeId,
        ingredientFunctions: element.ingredientFunctions,
        percentage: element.percentage,
        isCustomized: element.isCustomized,
        dap: element.dap,
        ingredientSource: element.ingredientSource,
        givenName: element.givenName,
        dataSource: element.dataSource,
        csIngredientType: element.csIngredientType,
        id: element.id,
        isDelete: false,
        createdBy: element.createdBy,
        createdDate: element.createdDate,
        modifiedBy: element.createdBy,
        modifiedDate: element.modifiedDate,
        functions: element.functions
      };
      _FormulaIngredients.push(fs);
    });
    this.formulaIngredients.push(..._FormulaIngredients);
    this.ShowIngredientList();
  }

  Show_Hide_AddSelectedIngredientButton() {
    let data = _.find(this.formulaIngSearchResult, function (obj) { return obj.isSelectedForFinalization === true });
    this.isIngredientSelectedForFinalized = (!_.isUndefined(data)) ? true : false;
  }

  TempdataSaveIngredientsFormula() {
    let selectedFIngForFinalization = this.selectedFIngForFinalization;
    let selectedFinializedData: FormulaSpecGrid[] = [];

    this.selectedFIngForFinalization.forEach((fSelement: FormulaSpecGrid, index: number) => {

      let dataFromFinalizedGrid = this._finalizedFormulaIngredientGrid.find((fs: FormulaSpecGrid) => fs.ingredientName === fSelement.ingredientName);

      if (dataFromFinalizedGrid === undefined || dataFromFinalizedGrid === null) {
        selectedFinializedData.push({
          formulaSpecsId: null,
          formulaId: null,
          ingredientId: null,
          ingredientName: fSelement.ingredientName,
          casNo: fSelement.casNo,
          createdBy: 'Admin',
          createdDate: fSelement.createdDate,
          modifiedBy: 'Admin',
          modifiedDate: fSelement.modifiedDate,
          isDelete: false,
          typeId: 2,
          ingredientFunctions: '',
          percentage: 0,
          isCustomized: false,
          dap: fSelement.dap === null || fSelement.dap === undefined ? 0 : fSelement.dap,
          ingredientSource: 0,
          givenName: this.formulaIngredientSearchForm.controls["SearchText"].value,
          dataSource: '',
          csIngredientType: 'Standard',
          id: '',
          isSelectedForFinalization: true,
          isfinalized: true,
          otherFunctions: fSelement.otherFunctions,
          otherNames: [],
          functions: fSelement.functions,
        });
      }

    });

    this._finalizedFormulaIngredientGrid.push(...selectedFinializedData);
  }

  ClearIngGrid() {
    this.formulaIngredientSearchForm.reset();
    this.formulaIngSearchResult = [];
  }

  OnSelectionFinalizedCheckboxChange(sender: any) {

    this._finalizedFormulaIngredientGrid.forEach((listItem: FormulaSpecGrid, index: number) => {

      sender.selectedRows.forEach(element => {
        let dataItem = element.dataItem;
        if (dataItem.casNo === listItem.casNo) {
          listItem.isfinalized = listItem.isSelectedForFinalization = false;

        }
      });

      sender.deselectedRows.forEach(element => {
        let dataItem = element.dataItem;
        if (dataItem.casNo === listItem.casNo) {
          listItem.isfinalized = listItem.isSelectedForFinalization = true;

        }
      });
    });

  }


  removeSelectedIngFromFinalizedIng2() {
    let selectedFinializedData: FormulaSpecGrid[] = [];
    this._finalizedFormulaIngredientGrid.forEach((row, index) => {
      if (row.isfinalized === true) {
        selectedFinializedData.push({
          formulaSpecsId: null,
          formulaId: null,
          ingredientId: null,
          ingredientName: row.ingredientName,
          casNo: row.casNo,
          createdBy: 'Admin',
          createdDate: row.createdDate,
          modifiedBy: 'Admin',
          modifiedDate: row.modifiedDate,
          isDelete: row.isDelete,
          typeId: row.typeId,
          ingredientFunctions: row.ingredientFunctions,
          percentage: row.percentage,
          isCustomized: row.isCustomized,
          dap: row.dap,
          ingredientSource: row.ingredientSource,
          givenName: row.givenName,
          dataSource: row.dataSource,
          csIngredientType: 'Standard',
          id: '',
          isSelectedForFinalization: true,
          isfinalized: true,
          otherFunctions: row.otherFunctions,
          otherNames: [],
          functions: row.functions,
        });
      }
      else {
        let searchdItem = this.formulaIngSearchResult.find(x => x.casNo === row.casNo);
        if (searchdItem !== undefined && searchdItem !== null) {
          searchdItem.isSelectedForFinalization = false;
          searchdItem.isfinalized = false;
        }
      }
    });


    this._finalizedFormulaIngredientGrid = selectedFinializedData;
    this.Show_Hide_AddSelectedIngredientButton();

  }

  removeSelectedIngFromFinalizedIng() {
    let _formulaIngredients = this._finalizedFormulaIngredientGrid;
    let _selectedFormulaIngredients = this.selectedFinalizedFormulaIngredients;

    _.each(_formulaIngredients, function (fi, index) {
      let selectedIngredient = _.find(_selectedFormulaIngredients, (selectedFi: FormulaSpec) => {
        return selectedFi.ingredientName === fi.ingredientName;
      });
      if (selectedIngredient !== undefined && selectedIngredient !== null) {
        fi.isDelete = true;
      }

    });

    this.selectedFinalizedFormulaIngredients = [];
    this._finalizedFormulaIngredientGrid = _formulaIngredients.filter(x => x.isDelete === false);

    let removedIngredient = _formulaIngredients.filter(x => x.isDelete === true);

    let _selectedFIngForFinalization = this.selectedFIngForFinalization;
    let filteredData: FormulaSpecGrid[] = [];
    _.each(_selectedFIngForFinalization, function (fi: FormulaSpecGrid, index) {
      let formulaIng = _.find(removedIngredient, (ing: FormulaSpecGrid) => { return ing.ingredientName === fi.ingredientName });
      if (formulaIng === undefined || formulaIng === null) {
        fi.isDelete = false;
      }
      else {
        fi.isDelete = true;
      }
    });
    this.selectedFIngForFinalization = _selectedFIngForFinalization.filter(x => x.isDelete === false);

  }

  isFormulaFormIsValid(): boolean {

    for (const control of Object.keys(this.addEditFormulaForm.controls)) {
      this.addEditFormulaForm.controls[control].markAsTouched();
      this.addEditFormulaForm.controls[control].markAsDirty();
    }
    if (this.addEditFormulaForm.invalid) {
      return false;
    }
    return true;
  }

  isFIDapPercentageIsValid(): boolean {
    let result: boolean = true;
    _.forEach(this.formulaIngredients, function (formuaIng: FormulaSpec) {
      let dap = formuaIng.dap.toString();
      let percentage = formuaIng.percentage.toString();
      if (result) {
        if (dap === "" || dap === "0") {
          alert("Dap Required");
          result = false;
        }
        else if (percentage === "" || percentage === "0") {
          alert("Percentage Required");
          result = false;
        }
      }
    });
    return result;
  }

  SaveAllToFormula() {

    if (!this.isFormulaFormIsValid()) {
      return;
    }

    if (this.formulaIngredients.length === 0) {
      alert('Atleast one Ingredient should be added');
      return;
    }

    if (!this.isFIDapPercentageIsValid()) {
      return;
    }

    let specs: FormulaSpec[] = [];

    this.formulaIngredients.forEach((element: FormulaSpec) => {

      let spec: FormulaSpec = {
        formulaSpecsId: element.formulaSpecsId === null ? 0 : element.formulaSpecsId,
        formulaId: element.formulaId === null ? 0 : element.formulaId,
        ingredientId: element.ingredientId === null ? 0 : element.ingredientId,
        ingredientName: element.ingredientName,
        casNo: element.casNo,
        createdBy: element.createdBy,
        createdDate: element.createdDate,
        modifiedBy: element.modifiedBy,
        modifiedDate: element.modifiedDate,
        isDelete: element.isDelete,
        typeId: element.typeId,
        ingredientFunctions: element.ingredientFunctions,
        isCustomized: element.isCustomized,
        dap: element.dap,
        percentage: element.percentage,
        ingredientSource: element.ingredientSource,
        givenName: element.givenName,
        dataSource: element.dataSource,
        csIngredientType: element.csIngredientType,
        id: element.id,
        functions: []
      };

      specs.push(spec);
    });

    let todayDate = new Date;
    let _addEditFormulaForm = this.addEditFormulaForm.value;
    let _todayDate = new Date();
    let formula: Formula = {
      id: _addEditFormulaForm.id,
      formulaId: 0,
      formulaNo: _addEditFormulaForm.formulaNo,
      description: _addEditFormulaForm.description,
      createdBy: "Admin",
      createdDate: _todayDate,
      modifiedBy: "Admin",
      modifiedDate: _todayDate,
      isDelete: false,
      typeId: 1,
      useType: _addEditFormulaForm.useType,
      productType: _addEditFormulaForm.productType,
      productSubType: _addEditFormulaForm.productSubType,
      exposureType: _addEditFormulaForm.exposureType,
      otherProductSubType: "",
      isSampleFormula: this.isSampleFormula,
      amountAppUnits: _addEditFormulaForm.amountAppUnits.toString(),
      retensionFactor: parseFloat(_addEditFormulaForm.retentionFactor === '' ? "0" : _addEditFormulaForm.retentionFactor),
      amountofProdApp: parseFloat(_addEditFormulaForm.amountofProdApp === '' ? "0" : _addEditFormulaForm.amountofProdApp),
      supplierName: _addEditFormulaForm.supplierName,
      brandName: _addEditFormulaForm.brandName,
      seasonalorAYR: _addEditFormulaForm.seasonalorAYR,
      intendedCountries: _addEditFormulaForm.intendedCountries,
      remarks: _addEditFormulaForm.remarks,
      eUorAsiaSeasoned: _addEditFormulaForm.eUorAsiaSeasoned,
      compliance: _addEditFormulaForm.compliance,
      formulaSpecs: specs,
      deliveryMechanism: _addEditFormulaForm.deliveryMechanism,
      areasOfApplication: _addEditFormulaForm.areaOfApplication,
      // assessments: []
    }
    let subs = this._fcs.SaveFormulaDetail(formula).subscribe((response: ResponseData<boolean>) => {
      if (response.data === true) {
        this.router.navigate([!this.isSampleFormula ? '/cosmetics/formulacompliance' : '/cosmetics/formulacompliance/sampleformula']);
      }
    });
    this.subscriptions.push(subs);
  }

  onproductSubProductSelect(event: any, id: string) {
    let selectedData = _.find(this.subProductTypeList, function (obj) { return obj.id === id; });
    this.selectedSupProductType = selectedData;
  }

  setSelectedSubProductType() {
    this.isProductTypeVisible = true;
    this.addEditFormulaForm.patchValue({
      useType: this.selectedSupProductType.useType,
      productType: this.selectedSupProductType.productName,
      productSubType: this.selectedSupProductType.subProductName,
      exposureType: this.selectedSupProductType.exposureType,

      retentionFactor: this.selectedSupProductType.retensionFactor.toString(),
      amountAppUnits: this.selectedSupProductType.amountofProdApp.toString(),
      amountofProdApp: this.selectedSupProductType.amountofProdApp.toString(),
      areaOfApplication: this.selectedSupProductType.areasOfApplicationName,
      deliveryMechanism: this.selectedSupProductType.deliveryMechanismName,
    });

    this.retentionFactor_ExistingValue = this.selectedSupProductType.retensionFactor;
    this.AmtOfProductApplied_ExistingValue = this.selectedSupProductType.amountofProdApp;
    this.AmtOfProductApplied_Unit = this.selectedSupProductType.units;
    this.selectedSupProductType = null;
  }

  CancelSubProductType() {
    this.selectedSupProductType = null;
    this.isProductTypeVisible = true;
  }

  isProductTypeVisible = true;
  showSupProductTypesList() {
    this.selectedSupProductType = null;
    this.isProductTypeVisible = false;
  }

  isFooterIsHidden: boolean = false;
  HideIngredientList() {
    this.ClearAllFormulaSearchPanel();
    this.showIngredient = false;
    this.hideFooter();
  }

  ShowIngredientList() {
    this.ClearAllFormulaSearchPanel();
    this.showIngredient = true;
    this.showFooter();
  }

  hideFooter() {
    this.isFooterIsHidden = true;
  }

  showFooter() {
    this.isFooterIsHidden = false;
  }


  ///Show Ingredient Function
  showFinalizedIngOtherFunction(rowIndex: number, columnName: string, patternToSplit: string) {
    let rowData = this._finalizedFormulaIngredientGrid[rowIndex];
    let data: StringDataPopupModelWithAction = {
      mode: 'IngredientFunction',
      popupTitle: 'Functions',
      dataList: rowData.functions,
      isVisible: true,
      pattern: patternToSplit,
      isSelectable: true,
      userData: rowData[columnName],
      columns: [{ columnName: '', width: '1%' },
      { columnName: 'Functions', width: '10%' }],
      dialogHeight: '100px',
      dialogWidth: '45vw'
    };
    this.isFormulaIngList.next(false);
    this.stringDataPopUpService.set_selectedFormula(data);
    this.activeIndexToUpdate = rowIndex;
    this.activeColumnNameToUpdate = columnName;
  }

  showIngredientOtherFunction(rowIndex: number, columnName: string, patternToSplit: string) {
    this.isFormulaIngList.next(true);
    let rowData = this.formulaIngredients[rowIndex];
    let data: StringDataPopupModelWithAction = {
      mode: 'IngredientFunction',
      popupTitle: 'Functions',
      dataList: rowData.functions,
      isVisible: true,
      pattern: patternToSplit,
      isSelectable: true,
      userData: rowData[columnName],
      columns: [{ columnName: '', width: '1%' },
      { columnName: 'Functions', width: '10%' }],
      dialogHeight: '100px',
      dialogWidth: '45vw'
    };

    this.stringDataPopUpService.set_selectedFormula(data);
    this.activeIndexToUpdate = rowIndex;
    this.activeColumnNameToUpdate = columnName;
  }

  activeIndexToUpdate: number = -1;
  activeColumnNameToUpdate: string = '';
  UpdateDataFromPopUp(isFormulaIngList: boolean) {
    let subs = this.stringDataPopUpService.returnedValue.subscribe((response: string) => {
      if (response === null) {
        this.activeIndexToUpdate = -1;
        return;
      }
      if (this.activeIndexToUpdate > -1) {
        if (!isFormulaIngList) {
          let data = this._finalizedFormulaIngredientGrid[this.activeIndexToUpdate];
          data[this.activeColumnNameToUpdate] = response;
        }
        else {
          let data = this.formulaIngredients[this.activeIndexToUpdate];
          data[this.activeColumnNameToUpdate] = response;
        }

        this.activeIndexToUpdate = -1;
      }
    });
    this.subscriptions.push(subs);
  }

  removeSelectedFormulaIngredient() {
    let _formulaIngredients = this.formulaIngredients;
    let _selectedFormulaIngredients = this.selectedFormulaIngredients;

    let indexToRemove: Array<number> = []
    _.each(_formulaIngredients, function (fi, index) {
      let selectedIngredient = _.find(_selectedFormulaIngredients, (selectedFi: FormulaSpec) => {
        return selectedFi.ingredientName === fi.ingredientName;
      });

      if (selectedIngredient !== undefined && selectedIngredient !== null) {
        fi.isDelete = true;
      }

    });
    this.selectedFormulaIngredients = [];
    this.formulaIngredients = _formulaIngredients.filter(x => x.isDelete === false);

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => {
      subs.unsubscribe();
    });
  }

}

