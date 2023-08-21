/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormulaSampleFormulaCRUDComponent } from './formula-sample-formula-crud.component';

describe('FormulaSampleFormulaCRUDComponent', () => {
  let component: FormulaSampleFormulaCRUDComponent;
  let fixture: ComponentFixture<FormulaSampleFormulaCRUDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaSampleFormulaCRUDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaSampleFormulaCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
