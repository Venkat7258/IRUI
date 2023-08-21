
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IreadyApiService } from './iready-api.service';
describe('ApiIreadyService', () => {
  let service: IreadyApiService;
  //let httpmock: HttpTestingController;
  let httpclient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[IreadyApiService]
    });
    service = TestBed.inject(IreadyApiService);
    // httpmock= TestBed.inject(HttpTestingController);
    // httpclient= TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
