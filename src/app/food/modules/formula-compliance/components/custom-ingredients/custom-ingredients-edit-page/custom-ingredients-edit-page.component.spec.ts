import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIngredientsEditPageComponent } from './custom-ingredients-edit-page.component';

describe('CustomIngredientsEditPageComponent', () => {
  let component: CustomIngredientsEditPageComponent;
  let fixture: ComponentFixture<CustomIngredientsEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomIngredientsEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomIngredientsEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
