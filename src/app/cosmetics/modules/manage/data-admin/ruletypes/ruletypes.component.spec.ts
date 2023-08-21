import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuletypesComponent } from './ruletypes.component';

describe('RuletypesComponent', () => {
  let component: RuletypesComponent;
  let fixture: ComponentFixture<RuletypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuletypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuletypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
