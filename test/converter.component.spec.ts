import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { ComparatorComponent } from 'src/app/comparator/comparator.component';

import { CurrencyService } from 'src/app/currency.service';
import { ConverterComponent } from '../src/app/converter/converter.component';
import { baseEurExchangeRates, usdToInr } from './return-data';

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;
  let currencyService: CurrencyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,  
        FormsModule, 
        ReactiveFormsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
          maxOpened: 1,
          closeButton: true,
        }),
      ],
      declarations: [ConverterComponent, ComparatorComponent],
      providers: [CurrencyService]

    })
    .compileComponents();
    currencyService = TestBed.get(CurrencyService);
  }));

  beforeEach(() => {
    /*fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;*/
    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Testcase to check component existence
    expect(component).toBeTruthy();
  });

  it('should have getCurrencyList()', () => {
    // Testcase to check function existence
    expect(component.getCurrencyList).toBeTruthy();
  });

  it('should have convert()', () => {
    // Testcase to check function existence
    expect(component.convert).toBeTruthy();
  });

  it('getCurrencyList() should return the list of currencies', () => {
    // Testcase to check whether the function returns exchange rates for a base currency 'EUR'
    // Use spyOn to give a value('baseEurExchangeRates') from return-data.ts when a function of service is called
    spyOn(currencyService, 'getCurrencyList').and.returnValue(of(baseEurExchangeRates));
    component.getCurrencyList();
    expect(currencyService.getCurrencyList).toHaveBeenCalled();
    expect(component.currencyList).toEqual(Object.keys(baseEurExchangeRates.rates));
  });

  it('convert() given values should return the exchange rate for the required currency', () => {
    // Testcase to check whether the function returns exchange rate for from currency 'USD' and to currency 'INR'
    // Use spyOn to give a value('usdToInr') from return-data.ts when a function of service is called
    spyOn(currencyService, 'getSpecificExchangeRate').and.returnValue(of(usdToInr));
    const fromCurrency = component.converterForm.controls.from;
    fromCurrency.setValue('USD');
    const toCurrency = component.converterForm.controls.to;
    toCurrency.setValue('INR');
    const formAmount = component.converterForm.controls.amount;
    formAmount.setValue(1);
    
    component.convert();
    expect(currencyService.getSpecificExchangeRate).toHaveBeenCalled();
    expect(component.resultValue).toEqual(usdToInr.rates['INR']+' INR');
    expect(component.description).toEqual('1 USD=');
    expect(component.exchangeRate).toEqual('1 USD='+ usdToInr.rates['INR']+' INR');
    expect(component.comparatorInput).toEqual('USD');
    expect(component.converted).toEqual(true);
  });

  it('convert() given input null should return error message and hide the exchange rate', () => {
    // Testcase to check whether the function is hidden when from currency or to currency is 'null'
    const fromCurrency = component.converterForm.controls.from;
    fromCurrency.setValue(null);
    component.convert();
    expect(component.converted).toEqual(false);
  });

});
