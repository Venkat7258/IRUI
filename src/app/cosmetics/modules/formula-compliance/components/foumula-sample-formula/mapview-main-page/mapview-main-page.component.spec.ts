import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapviewMainPageComponent } from './mapview-main-page.component';

describe('MapviewMainPageComponent', () => {
  let component: MapviewMainPageComponent;
  let fixture: ComponentFixture<MapviewMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapviewMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapviewMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
