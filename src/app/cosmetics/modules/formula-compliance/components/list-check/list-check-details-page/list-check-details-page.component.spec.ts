import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckDetailsPageComponent } from './list-check-details-page.component';

describe('ListCheckDetailsPageComponent', () => {
  let component: ListCheckDetailsPageComponent;
  let fixture: ComponentFixture<ListCheckDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCheckDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCheckDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
