import { TestBed } from '@angular/core/testing';
import { AddressBookService, AddressRequest, AddressError, Address } from './address-book.service';
import { ApiService } from './api.service';
import { of, throwError, Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

class MockApiService {
  get() {
    return of([]);
  }

  post(apiRequest: any) {
    return of({ addressId: '123', ...apiRequest.payload });
  }
}

describe('AddressBookService', () => {
  let service: AddressBookService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AddressBookService,
        { provide: ApiService, useClass: MockApiService }
      ]
    });
    service = TestBed.inject(AddressBookService);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial addressSubject$ as an empty array', (done: DoneFn) => {
    service.addresses$.subscribe(addresses => {
      expect(addresses).toEqual([]);
      done();
    });
  });

  it('should return an observable from addresses$', (done: DoneFn) => {
    service.addresses$.subscribe(addresses => {
      expect(Array.isArray(addresses)).toBe(true);
      done();
    });
  });

  it('should create a new address and add it to the local store', (done: DoneFn) => {
    const payload: AddressRequest = {
      addressee: 'John Doe',
      street1: '123 Main St',
      street2: '',
      town: 'Townsville',
      county: 'Countyshire',
      postcode: '12345'
    };

    spyOn(apiService, 'post').and.callThrough();

    service.create(payload).subscribe(result => {
      expect(apiService.post).toHaveBeenCalledWith(jasmine.objectContaining({ payload }));
      // Check the state of the local store
      service.addresses$.subscribe(addresses => {
        expect(addresses).toContain(jasmine.objectContaining({ addressId: '123', ...payload }));
        done();
      });
    });
  });

  it('should handle error when API call fails', (done: DoneFn) => {
    const payload: AddressRequest = {
      addressee: 'Jane Doe',
      street1: '456 Main St',
      street2: '',
      town: 'Townsville',
      county: 'Countyshire',
      postcode: '67890'
    };

    const errorResponse = new HttpErrorResponse({
      error: [{ errorMessage: 'test 404 error' }],
      status: 404,
      statusText: 'Not Found'
    });

    spyOn(apiService, 'post').and.returnValue(
      new Observable((observer) => {
        observer.error(errorResponse);
      })
    );

    service.create(payload).subscribe(result => {
      expect(apiService.post).toHaveBeenCalledWith(jasmine.objectContaining({ payload }));
      expect(result).toEqual({ errorMessage: 'test 404 error' });
      done();
    });
  });


  it('should return address from local storage if available', (done: DoneFn) => {
    const id = '123';
    const mockAddress: Address = {
      addressId: id,
      addressee: 'John Doe',
      street1: '123 Main St',
      street2: '',
      town: 'Townsville',
      county: 'Countyshire',
      postcode: '12345'
    };
  
    spyOn<any>(service, 'getRemoteById').and.returnValue(throwError('Unexpected call to getRemoteById'));
  
    spyOn<any>(service, 'getLocalById').and.returnValue(of(mockAddress));
  
    service.getById(id).subscribe((result: Address | AddressError) => {
      expect(result).toEqual(mockAddress);
      done();
    });
  });
  
  it('should return address from remote if not available locally', (done: DoneFn) => {
    const id = '123';
    const mockRemoteAddress: Address = {
      addressId: id,
      addressee: 'Jane Doe',
      street1: '456 Main St',
      street2: '',
      town: 'Townsville',
      county: 'Countyshire',
      postcode: '67890'
    };
  
    spyOn<any>(service, 'getLocalById').and.returnValue(of(undefined));
    spyOn<any>(service, 'getRemoteById').and.returnValue(of(mockRemoteAddress));
  
    service.getById(id).subscribe((result: Address | AddressError) => {
      expect(result).toEqual(mockRemoteAddress);
      done();
    });
  });
  
  it('should return an error if neither local nor remote address is available', (done: DoneFn) => {
    const id = '123';
  
    spyOn<any>(service, 'getLocalById').and.returnValue(of(undefined));
    spyOn<any>(service, 'getRemoteById').and.returnValue(of({ errorMessage: 'Address not found' }));
  
    service.getById(id).subscribe((result: Address | AddressError) => {
      expect(result).toEqual({ errorMessage: 'Address not found' });
      done();
    });
  });
});
