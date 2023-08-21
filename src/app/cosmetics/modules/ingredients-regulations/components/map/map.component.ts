import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ChemRegData, Flags, IngData, Ingredients, IngRegData } from 'src/app/cosmetics/models/ingredients';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import mapdata from '../../../../../../assets/mapdata.json';
//import $ from 'jquery';
 declare var $: any;
var MapValues=[];
var ExistMapData=[];
var gdpData = {
  "AF": 16.63,
  "IND": 11.58,
  "CA": 158.97,
  //...
};
var MapData = [{ "code": "AF", "name": "Afghanistan" },
{ "code": "IND", "name": "India" },
{ "code": "CA", "name": "Canada" }];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit {
  
  public objIngredients: Ingredients = new Ingredients();
  countries: IngRegData[] = [];
  physicalProperties: any[] = [];
  toxicityData: any[] = [];
  public countryRegulations: IngRegData = new IngRegData();
  public ingredientsRegulationobj: IngData = new IngData();
  public chemRegData: ChemRegData = new ChemRegData();
  public isChemRegData: boolean = false;
  public flagsDetails: Flags = new Flags();
  public isCountryRegulations: boolean = true;
  @Input() ingredients: any;
  constructor(public _appService: AppService, private ireadyApi: IreadyApiService) { }
  ngOnInit(): void {
    debugger;
     ExistMapData=mapdata.MapData;
    if (ExistMapData.length > 0) {
      for (var i = 0; i < ExistMapData.length; i++) {
        if (ExistMapData[i].color != null) {
          MapValues[ExistMapData[i].code.trim()] = ExistMapData[i].color;
        }
      }
    }
    // this._appService.setHeaderUserName(this.ireadyApi.getUserName());
    // this._appService.setHeaderShow(true);
    // this._appService.setSideMenuShow(false);
    // this._appService.setHeaderTitle("Ingredient Regulations");
    $('#root').vectorMap({
      map: 'world_mill',
      panOnDrag: true,
      zoomAnimate:true,
      focusOn: {
        x: 0.5,
        y: 0.5,
        scale: 1,
        animate: true
      },  
      regionStyle:{
        initial: {
          fill: '#dfe2e8',
          "fill-opacity": 1,
          stroke: 'none',
          "stroke-width": 0,
          "stroke-opacity": 1
        },
        hover: {
          "fill-opacity": 0.8,
          cursor: 'pointer'
        },
      },
      series: {
        regions: [{
          values: MapValues,
          normalizeFunction: 'polynomial'
        }]
      },
      onRegionClick(event, code, region) {
        let a = this.companyname;
        var data = FindObject(ExistMapData, code, "code");
        if (data.length <= 0) {
          event.preventDefault();
        }
        else {
          //$("#hName").text("Regulation Details in " + data[0].name);
          $("#hName").text("Regulation Details ");
          $("#myModal").modal('show');
        }
      },
      onRegionTipShow: function (e, el, code) {
            var data = FindObject(ExistMapData, code, "code");
            if (data.length <= 0) {
              e.preventDefault();
            }
            else {
              // if (data[0].Region == 'EU') {
              //   var LimitsAndRanges = data[0].LimitsAndRanges.length > 256 ? data[0].LimitsAndRanges.substr(0, 256) + '<span style="color:blue">....</span>' : data[0].LimitsAndRanges;
              //   label.html("EU" + '<br><font size=2><font color=#666666;<span style:"color:green">Regulatory Status</span>: <span style="font-weight: 500">' + data[0].RegulationStatus + '</span><br><font size=2><font color=#666666;>Limits and Ranges: <span style="font-weight: 500">' + LimitsAndRanges + '</span><br><small style="font-style:italic;color:blue;">Click on country to get more details<small>');
              // }
              el.html('<br><font size=2><font color=#666666;><span style="color:#343a40 !important; font-weight:600; margin-top:3px !important">Regulatory Status : </span><span style="font-weight: 500">' + "Approved" + '</span><br><font size=2><span style="color:#343a40 !important; font-weight:600;" >Limits and Ranges:</span> ' + "" + '<br><small style="font-weight:600;color:#ed1a60 !important; font-size:11px; margin-top:3px;">Click on country to get more details<small>').css('background:#ccc;');
            }
          }
    }); 
    this.objIngredients = JSON.parse(this.ireadyApi.getStorage("ingredients"));
    this.countries = this.objIngredients.ingRegData;
    this.countryRegulations =  this.countries!=null?this.countries[0]:new IngRegData();
    this.ingredientsRegulationobj = this.objIngredients.ingData!=null? this.objIngredients.ingData:new IngData();
    if (this.objIngredients.chemRegData.length > 0) {
      this.chemRegData = this.objIngredients.chemRegData.filter(item => item.country == this.countryRegulations.country)[0];
      if (this.chemRegData != undefined)
        this.isChemRegData = true;
      else {
        this.chemRegData = new ChemRegData();
        this.isChemRegData = false;
      }
    }
    else {
      this.isChemRegData = false;
    }
  }
  showChildModal() {
    $("#myModal").modal('hide');
  }
}
function FindObject(src, value, type) {
  var obj = [];
  for (var i = 0; i < src.length; i++) {
    if (src[i][type] == value) {
      obj.push(src[i]);
      break;
    }
  }
  return obj;
}