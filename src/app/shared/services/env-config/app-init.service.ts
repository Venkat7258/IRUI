import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
declare var window: any;
@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor() { }
  // This is the method you want to call at bootstrap
  // Important: It should return a Promise
  public init() {
    return from(
      fetch('assets/app-config.json').then(function (response) {
        return response.json();
      })
    ).pipe(
      map((config) => {
        window.config = config;
        return config;
      })).toPromise();
  }
}
