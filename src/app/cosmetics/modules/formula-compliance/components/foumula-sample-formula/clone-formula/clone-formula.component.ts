import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-clone-formula',
  templateUrl: './clone-formula.component.html',
  styleUrls: ['./clone-formula.component.scss']
})
export class CloneFormulaComponent  implements OnInit {

  constructor(public _appService: AppService) { }

  ngOnInit(): void {
   // this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setSideMenuShow(true);
    this._appService.setHeaderTitle("");

  }
  
}
