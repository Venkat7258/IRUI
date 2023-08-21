import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredintsComponent } from './add-ingredints.component';

describe('AddIngredintsComponent', () => {
  let component: AddIngredintsComponent;
  let fixture: ComponentFixture<AddIngredintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIngredintsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIngredintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
