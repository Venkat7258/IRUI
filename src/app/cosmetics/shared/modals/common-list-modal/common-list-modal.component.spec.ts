import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { IreadyApiService } from 'src/app/shared/services/env-config/iready-api.service';
import { CommonListModalComponent } from './common-list-modal.component';
describe('CommonListModalComponent', () => {
  let component: CommonListModalComponent;
  let fixture: ComponentFixture<CommonListModalComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        CommonSharedModule],
      providers: [IreadyApiService,NgbActiveModal],
      declarations: [ CommonListModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
