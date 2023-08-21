import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIngredientsMainPageComponent } from './custom-ingredients-main-page.component';

describe('CustomIngredientsMainPageComponent', () => {
  let component: CustomIngredientsMainPageComponent;
  let fixture: ComponentFixture<CustomIngredientsMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomIngredientsMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomIngredientsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
