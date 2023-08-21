import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';

import { CloneFormulaComponent } from './clone-formula.component';

describe('CloneFormulaComponent', () => {
  let component: CloneFormulaComponent;
  let fixture: ComponentFixture<CloneFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        CommonSharedModule],
      declarations: [ CloneFormulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloneFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
