import { Component, OnInit } from '@angular/core';
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
  selector: 'app-foumula-main-page',
  templateUrl: './foumula-main-page.component.html',
  styleUrls: ['./foumula-main-page.component.scss']
})
export class FoumulaMainPageComponent {
  
}