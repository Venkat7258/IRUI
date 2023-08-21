import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared.module';

import { IngDetailsComponent } from './ing-details.component';

describe('IngDetailsComponent', () => {
  let component: IngDetailsComponent;
  let fixture: ComponentFixture<IngDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule],
      declarations: [ IngDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
