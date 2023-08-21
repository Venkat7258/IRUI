/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FoumulaSampleFormulaListComponent } from './foumula-sample-formula-list.component';

describe('FoumulaSampleFormulaComponent', () => {
  let component: FoumulaSampleFormulaListComponent;
  let fixture: ComponentFixture<FoumulaSampleFormulaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoumulaSampleFormulaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoumulaSampleFormulaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
