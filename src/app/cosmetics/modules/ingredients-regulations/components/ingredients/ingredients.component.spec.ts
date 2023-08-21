import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { IngredientsComponent } from './ingredients.component';
describe('IngredientsComponent', () => {
  let component: IngredientsComponent;
  let fixture: ComponentFixture<IngredientsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        CommonSharedModule],
      providers: [IreadyApiService],
      declarations: [ IngredientsComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(IngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
