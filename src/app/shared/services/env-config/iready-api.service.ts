import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IreadyApiService {
  public httpCounter: number = 0;
  DeleteData: any;
  constructor(private http: HttpClient, public router: Router) { }
  public getUrl(curl: string, urltype: string = ""): string {
    if (urltype == "IR")
      return environment.irApiUrl + curl;
    else if (urltype == "FC")
      return environment.fcApiUrl + curl;
    else
      return environment.apiUrl + curl;
  }
  // public getTokenUrl(curl:string): string {
  //   return this.env.tokenApiUrl + curl;
  // }
  // public getTimerTime(): string {
  //   return this.env.configTimerTime;
  // }
  public setHeaders() {
    var headersList = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      //  'Authorization':'Bearer '+this.getToken() 
    }
    return headersList;
  }
  setStorage(k: any, d: any) {
    //window.sessionStorage.setItem(k, d);
    localStorage.setItem(k, d);
  }
  getStorage(k: any): any {
    try {
      // if (window.sessionStorage.getItem(k)) {
      //   return window.sessionStorage.getItem(k);
      // }
      if (localStorage.getItem(k)) {
        return localStorage.getItem(k);
      }
    } catch (e) { }
  }
  removeStorage(k: any) {
    try {
      // if (window.sessionStorage.getItem(k)) {
      //   return window.sessionStorage.removeItem(k);
      // }
      if (localStorage.getItem(k)) {
        return localStorage.removeItem(k);
      }
    } catch (error) {
    }
  }
  postData(curl: any, data: any, urltype: any = ""): any {
    try {
      let headersList: any = this.setHeaders();
      return this.http.post(this.getUrl(curl, urltype), JSON.stringify(data), { headers: headersList });
    } catch (e) {
    }
  }
  LoginData(curl: any, data: any, urltype: any = ""): any {
    try {
      let headersList: any = {};
      const body = new HttpParams()
        .set(`username`, data.UserName)
        .set(`password`, data.Password)
        .set('grant_type', 'password');
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
      });
      return this.http.post(this.getUrl(curl), body.toString(), { headers: headers });
    } catch (e) {
    }
  }
  getUserName(): string {
    try {
      return JSON.parse(this.getSession('oauth') || "").fullName;
    } catch (e) {
      return 'NA';
    }
  }
  getUserId(): string {
    try {
      return JSON.parse(this.getSession('oauth') || "").userId;
    } catch (e) {
      return 'NA';
    }
  }
  getCurrentUser(): string {
    try {
      return JSON.parse(this.getSession('oauth') || "");
    } catch (e) {
      return 'NA';
    }
  }
  getConnectionName(): string {
    try {
      return JSON.parse(this.getSession('oauth') || "").ConnectionName;
    } catch (e) {
      return 'NA';
    }
  }
  getRolePrivilege(privilegeCode: any): string {
    try {
      // this.router.navigate(['/Login']);
      if (JSON.parse(this.getSession('RolePrivileges') || "").length > 0) {
        return JSON.parse(this.getSession('RolePrivileges') || "").filter((item: any) => item.Code === privilegeCode)[0].HaveAccess;
      } else {
        return 'NA';
      }
    } catch (e) {
      return 'NA';
    }
  }

  getRoleId(): string {
    try {
      return JSON.parse(this.getSession('oauth') || "").RoleId;
    } catch (e) {
      return 'NA';
    }
  }
  getToken(): string {
    try {
      return JSON.parse(this.getSession('oauth') || "").token;
    } catch (e) {
      return 'NA';
    }
  }
  getAuthId(): string {
    try {
      return JSON.parse(this.getSession('oauth') || "").authId;
    } catch (e) {
      return 'NA';
    }
  }

  postFormData(curl: any, data: any): any {
    try {
      const headersList = new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      });
      return this.http.post(this.getUrl(curl), data, { headers: headersList });
    } catch (e) {
    }
  }
  getData(curl: any, params?: any,urltype: any = ""): any {
    try {
      let headersList: any = this.setHeaders();
      return this.http.get(this.getUrl(curl,urltype), { headers: headersList, params: params });
    } catch (e) {
    }
  }
  setSession(k: any, d: any) {
    try {
      if (d === undefined) {
        //window.sessionStorage.removeItem(k);
        localStorage.removeItem(k);
      }
      else {
        //window.sessionStorage.setItem(k, btoa(JSON.stringify(d)));
        localStorage.setItem(k, btoa(JSON.stringify(d)));
      }
    } catch (error) {

    }
  }
  getSession(k: string): any {
    try {
      // if (window.sessionStorage.getItem(k)) {
      //   return atob(window.sessionStorage.getItem(k));
      // }
      if (localStorage.getItem(k)) {
        return atob(localStorage.getItem(k) || "");
      }
    } catch (e) { }
  }
  removeSession() {
    try {
      //return window.sessionStorage.clear();
      return localStorage.clear();
    } catch (error) { }
  }
  private _selectedIngredient!: any;
  selectedIngredient: BehaviorSubject<any> = new BehaviorSubject<any>(new Object());
  private _selectedCountry!: any;
  selectedCountry: BehaviorSubject<any> = new BehaviorSubject<any>(new Object());

}
