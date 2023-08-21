import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceMainPageComponent } from './compliance-main-page.component';

describe('ComplianceMainPageComponent', () => {
  let component: ComplianceMainPageComponent;
  let fixture: ComponentFixture<ComplianceMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
