import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaAssessmentDetailsPageComponent } from './formula-assessment-details-page.component';

describe('FormulaAssessmentDetailsPageComponent', () => {
  let component: FormulaAssessmentDetailsPageComponent;
  let fixture: ComponentFixture<FormulaAssessmentDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaAssessmentDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaAssessmentDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
