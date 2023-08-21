import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomIngredientsComponent } from './add-custom-ingredients.component';

describe('AddCustomIngredientsComponent', () => {
  let component: AddCustomIngredientsComponent;
  let fixture: ComponentFixture<AddCustomIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomIngredientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
