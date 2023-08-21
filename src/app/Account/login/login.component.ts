import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/shared/services/env-config/app.service';
import { EnvService } from 'src/app/shared/services/env-config/env.service';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {
  constructor(private ireadyApi: IreadyApiService, public _appService: AppService, private router: Router, public env: EnvService,private modalService: NgbModal) { }
  Model: any = {};
  iserrorMessage: boolean = false;
  modalOptions: NgbModalOptions;
  modalReference: NgbModalRef;
  ngOnInit(): void {
    this._appService.setHeaderShow(false);
    this._appService.setMasterDataShow(false);
    this._appService.setRawMaterialShow(false);
  }

  InActiveModalInfo() {
    this.modalReference = this.modalService.open(LoginModalComponent, { size: 'lg' });
    this.modalReference.componentInstance.name = 'World';
  }
  Login() {
  //  alert("vghgf");
    // this.ireadyapi.removeStorage(this.env.CurrentTabState.TabName);
    // this.ireadyapi.removeStorage(this.env.CurrentTabState.Id);
    // this.ireadyapi.removeSession();
    this.iserrorMessage = false;
    //  this.Model.grant_type = "password";
    // this.ireadyApi.LoginData("Auth/Authentication/authenticate", this.Model).toPromise().then((res: any) => {
    //   debugger;
    //  this.ireadyApi.setSession('oauth', res);
   this.InActiveModalInfo();
  //  this.router.navigate(['/cosmetics/dashboard']);
    // });
    //   this._appService.setHeaderUserName(res.userName);
    //   this.ireadyapi.setSession('oauth', res);
    //   let params = new HttpParams().set("RoleId", res.RoleId);
    //   this.ireadyapi.getData("UserAccount/GetRolePrivileges", params).toPromise().then((resp: any) => {
    //     this.ireadyapi.setSession('RolePrivileges', resp.Data);
    //     this.ireadyapi.setStorage('IsThisAfterLogin_LoadingDashboard', "1");
    //     this.router.navigate(['/Dashboard']);
    //   }).catch((err: any) => {
    //     this.ireadyapi.removeSession();
    //     this.iserrorMessage = true;
    //     this.env.ValidationMessages.requiredLoginMsg = err.error.error_description;
    //   });
    // }).catch((err: any) => {
    //   this.ireadyapi.removeSession();
    //   this.iserrorMessage = true;
    //   this.env.ValidationMessages.requiredLoginMsg = err.error.error_description;
    //   if (err.error.error_description == undefined) {
    //     err.error.error_description = "The user name or password is incorrect.";
    //     this.env.ValidationMessages.requiredLoginMsg = err.error.error_description;
    //   }
    // })
    //  this.router.navigate(['/Dashboard']);
  }
  ForgotPassword() {
    this.router.navigate(['/ForgotPassword']);
  }
}
