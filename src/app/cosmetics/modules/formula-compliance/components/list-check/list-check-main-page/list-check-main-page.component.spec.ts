import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckMainPageComponent } from './list-check-main-page.component';

describe('ListCheckMainPageComponent', () => {
  let component: ListCheckMainPageComponent;
  let fixture: ComponentFixture<ListCheckMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCheckMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCheckMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
