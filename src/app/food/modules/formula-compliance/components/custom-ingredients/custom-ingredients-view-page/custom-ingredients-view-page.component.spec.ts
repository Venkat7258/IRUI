import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIngredientsViewPageComponent } from './custom-ingredients-view-page.component';

describe('CustomIngredientsViewPageComponent', () => {
  let component: CustomIngredientsViewPageComponent;
  let fixture: ComponentFixture<CustomIngredientsViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomIngredientsViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomIngredientsViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
