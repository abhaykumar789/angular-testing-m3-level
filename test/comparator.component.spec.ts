import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CurrencyService } from 'src/app/currency.service';

import { ComparatorComponent } from '../src/app/comparator/comparator.component';
import { baseUsdExchangeRates } from './return-data';

describe('ComparatorComponent', () => {
  let component: ComparatorComponent;
  let fixture: ComponentFixture<ComparatorComponent>;
  let currencyService: CurrencyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule],
      declarations: [ ComparatorComponent ],
      providers: [CurrencyService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Testcase to check component existence
    expect(component).toBeTruthy();
  });

  it('should have ngOnChnages()', () => {
    // Testcase to check function existence
    expect(component.ngOnChanges).toBeTruthy();
  });

  it('ngOnChnages() should return exchangeRates', () => {
    // Testcase to check whether the function returns exchange rates for a base currency
    // Use spyOn to give a value('baseUsdExchangeRates') from return-data.ts when a function of service is called
    currencyService = TestBed.get(CurrencyService);
    spyOn(currencyService, 'getAllExchangeRate').and.returnValue(of(baseUsdExchangeRates));
    let output = Object.entries(baseUsdExchangeRates.rates).map(([key, value]) => ({key: [key], value: value}));
    component.from = 'USD';
    component.ngOnChanges();
    expect(currencyService.getAllExchangeRate).toHaveBeenCalled();
    expect(component.exchangeRates).toEqual(output);
  });
});
