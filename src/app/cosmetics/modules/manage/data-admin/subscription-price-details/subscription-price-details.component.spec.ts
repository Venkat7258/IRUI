import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPriceDetailsComponent } from './subscription-price-details.component';

describe('SubscriptionPriceDetailsComponent', () => {
  let component: SubscriptionPriceDetailsComponent;
  let fixture: ComponentFixture<SubscriptionPriceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPriceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionPriceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
