import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMainPageComponent } from './import-main-page.component';

describe('ImportMainPageComponent', () => {
  let component: ImportMainPageComponent;
  let fixture: ComponentFixture<ImportMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
