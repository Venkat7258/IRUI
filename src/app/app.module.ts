import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppInitService } from './shared/services/env-config/app-init.service';
import { LoginComponent } from './Account/login/login.component';
import { IreadyApiService } from './shared/services/env-config/iready-api.service';
import { LoginModalComponent } from './Account/login-modal/login-modal.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {ScrollTopModule} from 'primeng/scrolltop';
import {PanelModule} from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { CommonSharedModule } from './shared/common-shared.module';
import { PanelMenuModule } from './shared/libraries/panelmenu';
import { FooterComponent } from './shared/components/footer/footer.component';
export function init_app(appLoadService: AppInitService) {
  return () => appLoadService.init();
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginModalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPageScrollModule,
    ScrollTopModule,
    PanelModule,
    ToastModule,
    CommonSharedModule,
    PanelMenuModule,
  ],
  providers: [IreadyApiService,AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppInitService],
      multi: true
    }],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
  exports:[CommonSharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
