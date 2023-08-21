import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-foumula-main-page',
  templateUrl: './foumula-main-page.component.html',
  styleUrls: ['./foumula-main-page.component.scss']
})
export class FoumulaMainPageComponent implements OnInit {
  constructor(public _appService: AppService,private ireadyApi: IreadyApiService) { }
  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setSideMenuShow(false);
    this._appService.setHeaderTitle("Formula Compliance");
  }
}