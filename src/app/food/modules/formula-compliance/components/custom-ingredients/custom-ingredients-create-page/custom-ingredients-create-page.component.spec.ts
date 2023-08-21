import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIngredientsCreatePageComponent } from './custom-ingredients-create-page.component';

describe('CustomIngredientsCreatePageComponent', () => {
  let component: CustomIngredientsCreatePageComponent;
  let fixture: ComponentFixture<CustomIngredientsCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomIngredientsCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomIngredientsCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
