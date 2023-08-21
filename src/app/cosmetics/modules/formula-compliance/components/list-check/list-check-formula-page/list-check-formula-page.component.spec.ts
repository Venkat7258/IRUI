import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckFormulaPageComponent } from './list-check-formula-page.component';

describe('ListCheckFormulaPageComponent', () => {
  let component: ListCheckFormulaPageComponent;
  let fixture: ComponentFixture<ListCheckFormulaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCheckFormulaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCheckFormulaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
