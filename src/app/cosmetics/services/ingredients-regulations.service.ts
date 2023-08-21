import { Injectable } from '@angular/core';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { IngredientSearhRequest } from '../models/request/ingredient-searh-request';
@Injectable({
  providedIn: 'root'
})
export class IngredientsRegulationsService {
  constructor(public _appService: AppService, private ireadyApi: IreadyApiService) {
  }
  getAllIngredients() {
    debugger;
    return this.ireadyApi.getData(ApiConfig.GetAllIngredientsApi);
  }
  GetIngredientsBySearch(requestModel: IngredientSearhRequest) {
    return this.ireadyApi.postData(ApiConfig.GetIngredientsBySearch, requestModel);
  }
  GetIngredientsByNames(requestModel: Array<string>) {
    return this.ireadyApi.postData(ApiConfig.GetIngredientsByNames, requestModel);
  }
}
export const ApiConfig = {
  GetAllIngredientsApi: "Ingredients/GetAllIngredients",
  GetIngredientsBySearch: "Ingredients/GetIngredientsBySearch",
  GetIngredientsByNames: "Ingredients/GetIngredientsByNames"
}; 