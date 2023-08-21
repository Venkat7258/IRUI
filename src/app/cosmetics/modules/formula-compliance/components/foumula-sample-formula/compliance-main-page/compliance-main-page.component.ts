import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormulaComplianceService } from 'src/app/cosmetics/services/formula-compliance.service';

@Component({
  selector: 'app-compliance-main-page',
  templateUrl: './compliance-main-page.component.html',
  styleUrls: ['./compliance-main-page.component.scss']
})
export class ComplianceMainPageComponent implements OnInit, OnDestroy {
  isSampleFormula: boolean;
  selectedFormulaID: string;
  subscriptions: Subscription[] = [];
  constructor(private _fcs: FormulaComplianceService) { }

  ngOnInit(): void {
    this.getSampleFormula();
    this.getFormulaID();
  }

  getSampleFormula() {
    let subs = this._fcs.isSampleFormula.subscribe((_value: boolean) => {
      this.isSampleFormula = _value;
    });
    this.subscriptions.push(subs);
  }

  getFormulaID() {
    let subs = this._fcs.selectedFormulaID.subscribe((_value: string) => {
      this.selectedFormulaID = _value;
    });
    this.subscriptions.push(subs);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => {
      subs.unsubscribe();
    });
    this._fcs.remove_selectedFormulaID();
    this._fcs.remove_isSampleFormula();

  }
}
