import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { IngredientSearhRequest } from '../models/request/ingredient-searh-request';
import { ResponseData } from '../models/response-data';
import { IngredientsSearchResponse } from '../models/response/ingredients-search-response';

@Injectable({
  providedIn: 'root'
})
export class RecentUpdatesService {
  serviceURLIRDB: string;
  headers: any;
  constructor(public _appService: AppService, private ireadyApi: IreadyApiService,private httpClient: HttpClient) {}
  getAllIngredients() {
    debugger;
    return this.ireadyApi.getData(ApiConfig.GetRecentUpdatesApi);
  }
  GetFormulaIngredientSearchResult(requestModel: IngredientSearhRequest): any {
    let serviceLocation = "Ingredients/GetFormulaIngredientSearchResult";
    const url = this.serviceURLIRDB + serviceLocation; //44385
    let headers = this.headers;
    return this.httpClient.post<ResponseData<IngredientsSearchResponse>>(url, requestModel, { headers: headers });
  }
}
export const ApiConfig = { 
  GetRecentUpdatesApi:"Ingredients/GetAllIngredients"
}; 


