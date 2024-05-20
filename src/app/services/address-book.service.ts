import { Injectable } from '@angular/core';
import { ApiService, ApiRequest } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, map, BehaviorSubject, take, mergeMap  } from 'rxjs';

export interface AddressRequest {
  addressee: string;
  street1: string;
  street2: string;
  town: string;
  county: string;
  postcode: string;
}

export interface Address extends AddressRequest {
  addressId: string;
}

export interface AddressError {
  errorMessage: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  private path = 'address';
  public addressSubject$: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);

  constructor(private apiService: ApiService) {}

  public get addresses$(): Observable<Address[]> {
    return this.addressSubject$.asObservable();
  }

  public create(payload: AddressRequest): Observable<Address | AddressError> {
    const request: ApiRequest = { path: this.path, payload };
    
   return this.apiService.post(request)
   .pipe(map( (address: unknown)=> {
        return this.addToLocalStore(address);
      }),
      catchError(this.onError)
    ) as Observable<Address | AddressError>;
  }

  public getById(id: string): Observable<Address | AddressError> {
    return this.getLocalById(id)
    .pipe(take(1))
    .pipe(
      mergeMap((address: Address | undefined)=> {
        return address? of(address) : this.getRemoteById(id);
      })
    );
  }

  private getLocalById(id: string): Observable<Address | undefined> {
    return this.addresses$
    .pipe(map( (addresses: Address[])=> {
      return addresses.find(availableAddress => availableAddress.addressId === id);
    }));
  }

  private getRemoteById(id: string): Observable<Address | AddressError> {
    const path = `${this.path}/${id}`;
    return this.apiService.get({path})
    .pipe(map( (address: unknown)=> {
        return this.addToLocalStore(address, id);
      }),
      catchError(this.onError)
    ) as Observable<Address | AddressError>;
  }

  private isInLocalStore(id: string): boolean {
    return !!this.addressSubject$.value.find(address => address.addressId === id)?.addressId;
  }

  private addToLocalStore(address: unknown, id?: string): Address {
    const addressToUpdate = address as Address;

    if( !addressToUpdate.addressId && !!id ) { /* TODO: THE fetch from api/:id does not return objects with an id - ask for this to be added and then remove this condition */
      addressToUpdate.addressId = id; /* work around and manually add the ID for now */
    }

    if( !this.isInLocalStore(addressToUpdate.addressId) ) {
      this.addressSubject$.next([...this.addressSubject$.value, addressToUpdate]);
    }

    return address as Address;
  }

  private onError(error: HttpErrorResponse): Observable<AddressError> {
    return of({  errorMessage: error?.error?.[0].errorMessage });
  }
}