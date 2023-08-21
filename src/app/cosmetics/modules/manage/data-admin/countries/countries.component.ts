import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { Country } from 'src/app/cosmetics/models/master-data/country';
import { InActiveComponent } from 'src/app/cosmetics/shared/components/in-active/in-active.component';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  countries: Country[] = [];
  regions: any[] = [];
  isAddCountry: boolean = false;
  public selectedCountry: Country = new Country();
  public objCountry: Country = new Country();
  countryItems: MenuItem[];
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  isaction: boolean = true;
  constructor(public _appService: AppService, private ireadyApi: IreadyApiService, private router: Router, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.GetAllCountries();
    this.GetAllRegions();
     // Country
     this.countryItems = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => {
          this.AddAndUpdateCountry('Edit');
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          this.DeleteCountry();
        }
      }
    ];

  }
   //1.Countries
   public HandleActionsClickCountry(event, type) {
    if (type == "country") {
      this.selectedCountry = event;
    }
  }
  SaveAndUpdateCountry(type) {
    if (type != "Add") {
      this.objCountry.alternateCountry = this.objCountry.countryName;
      this.ireadyApi.postData("IngMasterData/UpdateCountry", this.objCountry).toPromise().then((resp: any) => {
        this.countries = resp.data;
        this.GetAllCountries()
      })
    }
    else {
      this.objCountry.alternateCountry = this.objCountry.countryName;
      this.ireadyApi.postData("IngMasterData/InsertCountry", this.objCountry).toPromise().then((resp: any) => {
        this.countries = resp.data;
        this.GetAllCountries()
      })
    }
  }
  onCountryClose()
  {
    this.isAddCountry = false;
  }
  AddAndUpdateCountry(type) {
    this.isAddCountry = true;
    if (type != "Add") {
      this.isaction = false;
      this.objCountry = this.selectedCountry;
    }
    else {
      this.isaction = true;
      this.objCountry = new Country();
    }
  }
  GetAllCountries() {
    this.ireadyApi.getData("IngMasterData/GetAllCountries").toPromise().then((resp: any) => {
      this.countries = resp.data;
      this.isAddCountry = false;
    })
  }
  getCountryName(data) {
    this.ireadyApi.setStorage("countries", data);
    this.router.navigate(['/food/ingredientsregulations/regulations']);
  }
  DeleteCountry() {
    this.modalReference = this.modalService.open(InActiveComponent, { size: 'sm' });
    this.modalReference.componentInstance.objModel = this.selectedCountry;
    this.modalReference.componentInstance.moduleType = 'Country';
    this.modalReference.result.then((result) => {
      this.GetAllCountries();
      
    });
  }
  // ShowActiveCountry(event)
  // {
  //   let isactive=false;
  //   if(event.checked.length>0)
  //   isactive=true;
  // }

  GetAllRegions() {
    this.ireadyApi.getData("IngMasterData/GetAllRegions").toPromise().then((resp: any) => {
      this.regions = resp.data;
    })
  }
}
