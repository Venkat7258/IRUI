import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import $ from 'jquery';
import { AppService } from './shared/services/env-config/app.service';
import { IreadyApiService } from './shared/services/env-config/iready-api.service';
import { EnvService } from './shared/services/env-config/env.service';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  items: MenuItem[];
  showHeader: boolean = false;
  showHeaderMenu: boolean = false;
  showMasterData: boolean = true;
  showHeaderTitle: string = "";
  showHeaderUserName: string = "";
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  closeResult: string;
  loader = false;
  currentUrlName = '';
  private statename: string;
  constructor(
    public _appService: AppService,
    public cdf: ChangeDetectorRef,
    private modalService: NgbModal,
    public ireadyapi: IreadyApiService,
    public env: EnvService,
    private route: Router,
    private primengConfig: PrimeNGConfig) {

  }

  subscribeEvents: any[] = [];
  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'flaticon-pie-chart',
        routerLinkActiveOptions: { exact: true },
        routerLink: ['/cosmetics/dashboard']
      },
      {
        label: 'Ingredients Regulations',
        icon: 'flaticon-cell',
        routerLink: ['/cosmetics/ingredients']
      },
      {
        label: 'Recent Updates',
        icon: 'flaticon-test-tube',
        routerLink: ['/cosmetics/recentupdates']
      },
      //   {
      //     label: 'Formulae Compliance',
      //     icon: 'flaticon-binder',
      //     routerLink:['/cosmetics/formulacompliance'] 
      // },
      {
        label: 'Formulae Compliance',
        icon: 'flaticon-binder',
        items: [
          {
            label: 'Formulae',
            icon: 'pi pi-circle-fill',
            routerLink: '/cosmetics/formulacompliance/formulae',
          },
          {
            label: 'Sample Formula',
            icon: 'pi pi-circle-fill',
            routerLink: '/cosmetics/formulacompliance/sampleformula',
          },
          {
            label: 'List Check',
            icon: 'pi pi-circle-fill',
          },
          {
            label: 'Import',
            icon: 'pi pi-circle-fill',
          },
          {
            label: 'Custom Ingredient',
            icon: 'pi pi-circle-fill',
          }
          
        ]
      },
      {
        label: 'Manage',
        icon: 'flaticon-settings',
        items: [
          {
            label: 'Data Admin',
            icon: 'pi pi-circle-fill',
            expanded: false,
            items: [
              {
                label: 'Master Data',
                icon: 'pi pi-minus',
                routerLink: ['/cosmetics/manage/dataadmin/masterdata']
              },
              {
                label: 'Data Import',
                icon: 'pi pi-minus',
                routerLink: ['/cosmetics/manage/dataadmin/dataimport']
              },
              {
                label: 'History Data',
                icon: 'pi pi-minus',
                routerLink: ['/cosmetics/manage/dataadmin/historydata']
              }
            ]
          },
          {
            label: 'Dev Admin',
            icon: 'pi pi-circle-fill',
            expanded: false,
            items: [
              {
                label: 'Deployment History',
                icon: 'pi pi-minus'
              },

            ]
          },
          {
            label: 'Super Admin',
            icon: 'pi pi-circle-fill',
            expanded: false,
            items: [
              {
                label: 'Users',
                icon: 'pi pi-minus'
              },
              {
                label: 'Companies',
                icon: 'pi pi-minus'
              },

            ]
          }
        ]
      }
    ];
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this._appService.showHeaderMenu.subscribe(response => {
      this.showHeaderMenu = response;
      if (response)
        this.cdf.detectChanges();
    })

    this._appService.showHeader.subscribe(response => {
      this.showHeader = response;
      if (response)
        this.cdf.detectChanges();
    })
    this._appService.showHeaderTitle.subscribe(response => {
      this.showHeaderTitle = response;
      this.cdf.detectChanges();
    })
    this._appService.showHeaderUserName.subscribe(response => {
      this.showHeaderUserName = response;
      this.cdf.detectChanges();
    });

    this._appService.showLoader.subscribe(response => {
      this.loader = response;
      this.cdf.detectChanges();
    });
    this.opendata();
    this.route.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ).subscribe((res) => {

      this.cdf.markForCheck();
      this.currentUrlName = res['url'].toString().replace('/', '');
      console.log("Current URL: " + this.currentUrlName);

      if (this.ireadyapi.getUserName() == 'NA') {
        window.sessionStorage.clear();

        if (!(this.currentUrlName.indexOf('ForgotPassword') >= 0 || this.currentUrlName.indexOf('SetPassword') >= 0)) {
          // if (this.currentUrlName != "Login")
          //   this.route.navigate(['/Login']);
        }
      }
    });
    let style = localStorage.getItem('style');
    if (style == null) {
      $('body').addClass("light");
    } else {
      $('body').addClass(style);
    }
  }
  setTheme(theme) {
    if (theme == 'light') {
      $('body').removeAttr('class');
      $('body').attr('class', '');
      $('body').toggleClass("light");
    } else if (theme == 'blue') {
      $('body').removeAttr('class');
      $('body').attr('class', '');
      $('body').toggleClass("blue");
    } else if (theme == 'green') {
      $('body').removeAttr('class');
      $('body').attr('class', '');
      $('body').toggleClass("green");
    } else if (theme == 'dark') {
      $('body').removeAttr('class');
      $('body').attr('class', '');
      $('body').toggleClass("dark");
    }
    localStorage.setItem('style', theme);
  }
  private getState(url: string): string {
    if (url.trim().length > 0)
      url = url.indexOf('/') > 0 ? url.split('/')[0] : url.split('/')[1];
    if (url.trim().length == 0) url = 'Login';
    return url.toLowerCase().trim();
  }

  loadScript() {
    this.opendata();
  }
  ngAfterViewInit() {
    this.subscribeEvents.forEach(item => item.unsubscribe());
    console.log("Unsubscribe");
  }
  ngOnDestroy() {
    var rr = this.route.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ).subscribe((res) => {
      this.cdf.markForCheck();
      this.currentUrlName = res['url'].toString().replace('/', '');
      console.log("Current URL: " + this.currentUrlName);
    });
    rr.unsubscribe();
  }
  navigateToComponent(tabName: string) {
    this._appService.resetValues();
    this.resetTabState();
    this.route.navigate(["./" + tabName]);
  }
  resetTabState() {
    this.ireadyapi.removeStorage(this.env.CurrentTabState.Id);
    this.ireadyapi.removeStorage(this.env.CurrentTabState.TabName);
  }


  opendata(): any {
    // $("dropdown-toggle").dropdown();
    $('.sidebar-menu').on('mouseover', function (event) {
      event.preventDefault();
      event.stopPropagation();
      var thisclass = $('.sidebar').attr('class');
      var menustatu = localStorage.getItem('menustate');
      $('.sidebar').addClass('sidebar-collapse');
    })
    $('.sidebar-menu').on('mouseout', function (event) {
      var thisclass = $('.sidebar').attr('class');
      // $('.sidebar').removeClass('sidebar-collapse'); 
      var menustatu: any = localStorage.getItem('menustate');
      if (menustatu != 1) {
        $('.sidebar').removeClass('sidebar-collapse');
      }
    })
    $(".parent-list").on("click", function () {

      $(this).siblings().removeClass('parent-list-active');
      $(this).toggleClass('parent-list-active');
    })
    $('.page-content-wrapper').on('mouseover', function (event) {
      var menustatu: any = localStorage.getItem('menustate');
      if (menustatu != 1) {
        // console.log('New enven')
        $('li').removeClass('submenu-collapse');
      }
    })
    $('#selMenu').on('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
    })

    $('.menuSticky').click(function (event) {
      $('.main-content').toggleClass('off-canvas');
      $('.sidebar').toggleClass('sidebar-collapse');
      var menustatu: any = localStorage.getItem('menustate');
      if (menustatu == 1) {
        $('.menuSticky').addClass('fa-angle-double-right').removeClass('fa-angle-double-left');

        localStorage.removeItem('menustate');
      }
      else {
        localStorage.setItem('menustate', "1");
        $('.sidebar').addClass('sidebar-collapse');
        $('.menuSticky').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
      }
    });
    $(document).ready(function () {
      $(document).on('mouseover', '.getInfo', function () {
        // $(this).parent('div').addClass('custom-help-text-active');
        $(this).closest('.combo-label').addClass('custom-help-text-active');
      })
      $(document).on('mouseout', '.getInfo', function () {
        $(this).closest('.combo-label').removeClass('custom-help-text-active');
      })
      // var secwidth = $('.res-section').width(); 
      // alert('test '+ secwidth)
    });
    $(document).on('load', this.menustate());
    //$('#myModal').modal('show');
    $('.arrow').on('click', function (event) {
      $(this).siblings().removeClass('submenu-collapse');
      $(this).toggleClass('submenu-collapse');
      $(this).attr('id', 'selMenu');
      var thisid = $(this).attr('id', 'selMenu');
      var thiscls = $(this).attr('class');
    })
    $('.sub-menu').click(function (event) {
      event.stopPropagation();
    });
    $('.logOut').click(function (event) {
      localStorage.removeItem('menustate');
    });
  }

  menustate(): any {
    var menustatu: any = localStorage.getItem('menustate');
    console.log("menustatu: " + menustatu);
    if (menustatu == 1) {
      $('.sidebar').addClass('sidebar-collapse');
      $('.main-content').addClass('off-canvas');
    }
    else {
      $('.sidebar').removeClass('sidebar-collapse');
      $('.main-content').removeClass('off-canvas');
    }
  }
  OpenProfile() {
    //   this.modalReference = this.modalService.open(ProfileComponent, { size: 'xl' });
    //   //  this.modalReference.componentInstance.FormulationDetails = this.FormulationDetails;
    //   this.modalReference.result.then((result) => {
    //     this.closeResult = `Closed with: ${result}`;
    //   }, (reason) => {
    //     this.closeResult = `Dismissed ${this.GetDismissReason(reason)}`;
    //   });
  }
  ChangePwd() {
    //   this.modalReference = this.modalService.open(ChangePasswordComponent, { size: '' });
    //   //  this.modalReference.componentInstance.FormulationDetails = this.FormulationDetails;
    //   this.modalReference.result.then((result) => {
    //     this.closeResult = `Closed with: ${result}`;
    //   }, (reason) => {
    //     this.closeResult = `Dismissed ${this.GetDismissReason(reason)}`;
    //   });
  }
  GetDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  Logout() {
    this.ireadyapi
      .postData('UserAccount/Logout', {})
      .toPromise()
      .then((resp: any) => {
        this.ireadyapi.removeSession();
        this.route.navigate(['/Login']);
      })
      .catch((error) => {
        console.log(error);
        this.ireadyapi.removeSession();
        this.route.navigate(['/Login']);
      });
  }
}