import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonSharedModule],
      providers: [IreadyApiService],
      declarations: [ MapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
