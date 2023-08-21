import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuletypeCategoriesComponent } from './ruletype-categories.component';

describe('RuletypeCategoriesComponent', () => {
  let component: RuletypeCategoriesComponent;
  let fixture: ComponentFixture<RuletypeCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuletypeCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuletypeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
