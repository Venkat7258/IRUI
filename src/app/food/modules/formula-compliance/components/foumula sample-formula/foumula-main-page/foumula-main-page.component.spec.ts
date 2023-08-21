import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoumulaMainPageComponent } from './foumula-main-page.component';

describe('FoumulaMainPageComponent', () => {
  let component: FoumulaMainPageComponent;
  let fixture: ComponentFixture<FoumulaMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoumulaMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoumulaMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
