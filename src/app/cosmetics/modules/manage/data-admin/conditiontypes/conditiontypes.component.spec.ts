import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditiontypesComponent } from './conditiontypes.component';

describe('ConditiontypesComponent', () => {
  let component: ConditiontypesComponent;
  let fixture: ComponentFixture<ConditiontypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditiontypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditiontypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
