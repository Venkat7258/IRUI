import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

import { RegulationsComponent } from './regulations.component';

describe('RegulationsComponent', () => {
  let component: RegulationsComponent;
  let fixture: ComponentFixture<RegulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        CommonSharedModule],
      providers: [IreadyApiService],
      declarations: [ RegulationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

