import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StringDataPopupModelWithAction } from '../shared/models/string-data-popup-model-with-action';

@Injectable({
  providedIn: 'root'
})
export class StringDataPopupModelWithActionService {
  popUpServiceData = new BehaviorSubject<StringDataPopupModelWithAction>(null);
  returnedValue = new BehaviorSubject<string>('');

  constructor() { }

  set_selectedFormula(data: StringDataPopupModelWithAction) {
    this.popUpServiceData.next(data);
  }

  set_returnedValue(data: string) {
    this.returnedValue.next(data);
  }

}