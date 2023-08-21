import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulationstatuschemComponent } from './regulationstatuschem.component';

describe('RegulationstatuschemComponent', () => {
  let component: RegulationstatuschemComponent;
  let fixture: ComponentFixture<RegulationstatuschemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegulationstatuschemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegulationstatuschemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
