import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../src/environments/environment';
import { CurrencyService } from '../src/app/currency.service';
import { baseInrExchangeRates, baseUsdExchangeRates, usdToInr } from './return-data';

describe('CurrencyService', () => {
  let httpMock: HttpTestingController;
  let service: CurrencyService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService],
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(CurrencyService);
  });

  it('should be created', () => {
    // Testcase to check component existence
    expect(service).toBeTruthy();
  });

  it('should have getCurrencyList()', () => {
    // Testcase to check function existence
    expect(service.getCurrencyList).toBeTruthy();
  });

  it('should be have getSpecificExchangeRate()', () => {
    // Testcase to check function existence
    expect(service.getSpecificExchangeRate).toBeTruthy();
  });

  it('should be have getAllExchangeRate()', () => {
    // Testcase to check function existence
    expect(service.getAllExchangeRate).toBeTruthy();
  });

  it('getCurrencyList() should return all exchange rates for base EUR', () => {
    // Testcase to check whether function returns all exchange rates for base EUR
    // Use httpTestingController to create a mock backend to return a value(baseEurExchangeRates) from return-data.ts
    service.getCurrencyList().subscribe(
      data => {
        expect(data.data).toEqual(baseUsdExchangeRates);
      }
    );
    const req = httpMock.expectOne(environment.API_URL);
    expect(req.request.method).toEqual('GET');
    req.flush({data: baseUsdExchangeRates});
  });

  it('getSpecificExchangeRate() should return exchange rate for particular base and currency', () => {
    // Testcase to check whether function send two currencies string('USD', 'INR') to backend
    // Use httpTestingController to create a mock backend to return a value(usdToInr) from return-data.ts
    service.getSpecificExchangeRate('USD', 'INR').subscribe(
      data => {
        expect(data.data).toEqual(usdToInr);
      }
    );
    const req = httpMock.expectOne(environment.API_URL + '&base=' + 'USD' + '&symbols=' + 'INR');
    expect(req.request.method).toEqual('GET');
    req.flush({data: usdToInr});
  });


  it('getAllExchangeRate() should return all exchange rates for particular base', () => {
    // Testcase to check whether function send a string('INR') to backend
    // Use httpTestingController to create a mock backend to return a value(baseInrExchangeRates) from return-data.ts
    service.getAllExchangeRate('INR').subscribe(
      data => {
        expect(data.data).toEqual(baseInrExchangeRates);
      }
    );
    const req = httpMock.expectOne(environment.API_URL + '&base=' + 'INR');
    expect(req.request.method).toEqual('GET');
    req.flush({data: baseInrExchangeRates});
  });
  afterEach( () => {
    httpMock.verify();
 });
});
