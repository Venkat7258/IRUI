/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StringDataPopUpWithActionComponent } from './string-datapopup-with-action.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

describe('StringDataToGridComponent', () => {
  let component: StringDataPopUpWithActionComponent;
  let fixture: ComponentFixture<StringDataPopUpWithActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        CommonSharedModule],
      providers: [IreadyApiService],
      declarations: [ StringDataPopUpWithActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringDataPopUpWithActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
