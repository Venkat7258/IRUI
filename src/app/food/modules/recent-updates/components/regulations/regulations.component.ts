import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss']
})
export class RegulationsComponent implements OnInit {
  constructor(public _appService: AppService,private ireadyApi: IreadyApiService) { }
  ngOnInit(): void {
    this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    this._appService.setHeaderShow(true);
    this._appService.setSideMenuShow(false);
    this._appService.setHeaderTitle("Recent Updates");
  }
}
