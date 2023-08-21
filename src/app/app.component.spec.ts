import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonSharedModule } from './shared/common-shared.module';
import { IreadyApiService } from './shared/services/env-config/iready-api.service';
import { PanelMenuModule } from './shared/libraries/panelmenu';
import { FooterComponent } from './shared/components/footer/footer.component';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        PanelMenuModule,
        CommonSharedModule
      ],
      declarations: [
        FooterComponent,
        AppComponent
      ],
      providers:[IreadyApiService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
