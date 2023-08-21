import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporttypecosmeticsComponent } from './importtypecosmetics.component';

describe('ImporttypecosmeticsComponent', () => {
  let component: ImporttypecosmeticsComponent;
  let fixture: ComponentFixture<ImporttypecosmeticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImporttypecosmeticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImporttypecosmeticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
