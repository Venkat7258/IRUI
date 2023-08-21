import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StringDataPopupModelWithActionService } from 'src/app/cosmetics/services/string-data-popup-model-with-action-service';
import * as _ from 'lodash';
import { Functions } from 'src/app/cosmetics/models/ingredients';
import { StringDataPopupModelWithAction } from '../../models/string-data-popup-model-with-action';

@Component({
  selector: 'app-StringDataPopUpWithAction',
  templateUrl: './string-datapopup-with-action.component.html',
  styleUrls: ['./string-datapopup-with-action.component.css']
})
export class StringDataPopUpWithActionComponent implements OnInit, OnDestroy {
  //Dialoge
  public dataSource: Array<{ isSelected: boolean, value: string }> = null;
  position: string;
  isDialogeOpened: boolean = false;

  subscriptions: Subscription[] = [];
  columns: Array<{ columnName: string, width: string }> = [];
  dialogWidth: string = '';
  dialogheight: string = '';
  isSelectable: boolean = false;

  returnedValue: string = '';
  stringPattern: string = '';
  selectableData: string[] = [];
  popupTitle: string = '';
  userData: string[];
  constructor(private stringDataPopUpService: StringDataPopupModelWithActionService) { }

  ngOnInit() {
    this.getPopUpServiceData();
  }

  setDefalut() {
    this.isDialogeOpened = false;
    this.subscriptions = [];
    this.columns = [];
    this.dialogWidth = '';
    this.dialogheight = '';
    this.isSelectable = false;
    this.stringPattern = '';
    this.selectableData = [];
    this.dataSource = [];
    this.popupTitle = '';

  }

  addSelected() {

    let selectedElements = _.filter(this.dataSource, (element) => { return element.isSelected === true; });
    let deselectedElements = _.filter(this.dataSource, (element) => { return element.isSelected === false; });
    let _stringPattern = this.stringPattern;

    let _userdata = this.userData;

    _.forEach(selectedElements, (se) => {
      let obj = _.find(_userdata, (ele) => { return ele.trim() === se.value });
      if (obj === undefined || obj === null) {
        _userdata.push(se.value);
      }
    });

    _.forEach(deselectedElements, (dse) => {
      let index = _.findIndex(_userdata, (ele) => { return ele.trim() === dse.value });
      if (index > -1) {
        _userdata.splice(index, 1);
      }

    });

    let _returnedValue = '';
    _.forEach(_userdata, function (value) {

      if (_returnedValue === '') {
        _returnedValue += value.trim();
      }
      else {
        _returnedValue = _returnedValue + " " + _stringPattern + " " + value.trim();
      }
    });

    this.setDefalut();
    this.closeStringDataPopup();
    this.stringDataPopUpService.set_returnedValue(_returnedValue);
  }

  getPopUpServiceData() {
    this.setDefalut();

    let subs = this.stringDataPopUpService.popUpServiceData.subscribe((response: StringDataPopupModelWithAction) => {
      if (response !== null) {
        this.dialogWidth = response.dialogHeight;
        this.dialogWidth = response.dialogWidth;
        this.isSelectable = response.isSelectable;
        this.stringPattern = response.pattern;
        this.popupTitle = response.popupTitle;

        this.userData = _.isEqual(response.userData, '') ? [] : response.userData.split(response.pattern);;
        let selectableData = response.userData.toLocaleLowerCase();
        let selectedList = _.isEqual(selectableData, '') ? [] : selectableData.split(response.pattern);

        _.forEach(response.dataList, (func: Functions) => {
          let isSelected: boolean = false;
          let data = _.find(selectedList, (value) => { return func.function.toLocaleLowerCase() === _.trim(value); })
          if (data != undefined || data != null) {
            isSelected = true;
          }

          this.dataSource.push({ isSelected: isSelected, value: func.function });

        });

        this.columns = response.columns;

        if (response.isVisible) {
          this.openStringDataPopup();
        }
      }

    });
    this.subscriptions.push(subs);
  }


  public openStringDataPopup(): void {
    this.isDialogeOpened = true;
  }

  public closeStringDataPopup(): void {
    this.isDialogeOpened = false;
  }

  onCheckBoxChecked(event: any, columnName: string, rowIndex: number) {
    this.dataSource[rowIndex][columnName] = event.checked;
  }

  closeDialoge(){
    this.setDefalut();
    this.closeStringDataPopup();
    this.stringDataPopUpService.set_returnedValue(null);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
