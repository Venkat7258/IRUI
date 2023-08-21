import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcmComponent } from './fcm.component';

describe('FcmComponent', () => {
  let component: FcmComponent;
  let fixture: ComponentFixture<FcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
