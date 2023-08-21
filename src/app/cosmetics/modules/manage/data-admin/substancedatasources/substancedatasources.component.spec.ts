import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstancedatasourcesComponent } from './substancedatasources.component';

describe('SubstancedatasourcesComponent', () => {
  let component: SubstancedatasourcesComponent;
  let fixture: ComponentFixture<SubstancedatasourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubstancedatasourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubstancedatasourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
