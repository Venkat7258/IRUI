import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormulaComponent } from './view-formula.component';

describe('ViewFormulaComponent', () => {
  let component: ViewFormulaComponent;
  let fixture: ComponentFixture<ViewFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFormulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
