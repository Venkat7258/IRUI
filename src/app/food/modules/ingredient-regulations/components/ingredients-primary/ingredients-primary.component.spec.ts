import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsPrimaryComponent } from './ingredients-primary.component';

describe('IngredientsPrimaryComponent', () => {
  let component: IngredientsPrimaryComponent;
  let fixture: ComponentFixture<IngredientsPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsPrimaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
