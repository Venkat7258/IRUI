import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaAssessmentMainPageComponent } from './formula-assessment-main-page.component';

describe('FormulaAssessmentMainPageComponent', () => {
  let component: FormulaAssessmentMainPageComponent;
  let fixture: ComponentFixture<FormulaAssessmentMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaAssessmentMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaAssessmentMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
