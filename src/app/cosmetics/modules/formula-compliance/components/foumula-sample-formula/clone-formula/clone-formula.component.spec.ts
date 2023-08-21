import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneFormulaComponent } from './clone-formula.component';

describe('CloneFormulaComponent', () => {
  let component: CloneFormulaComponent;
  let fixture: ComponentFixture<CloneFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
