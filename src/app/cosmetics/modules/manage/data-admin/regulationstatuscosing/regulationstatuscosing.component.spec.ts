import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulationstatuscosingComponent } from './regulationstatuscosing.component';

describe('RegulationstatuscosingComponent', () => {
  let component: RegulationstatuscosingComponent;
  let fixture: ComponentFixture<RegulationstatuscosingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegulationstatuscosingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegulationstatuscosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
