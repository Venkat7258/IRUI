import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { IngredientsSecondaryComponent } from './ingredients-secondary.component';
describe('IngredientsSecondaryComponent', () => {
  let component: IngredientsSecondaryComponent;
  let fixture: ComponentFixture<IngredientsSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[CommonSharedModule],
      declarations: [ IngredientsSecondaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
