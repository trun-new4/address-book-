import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormComponent, AddressFormComponentConfig } from '../../ux/address-form/address-form.component';
import { AddressBookService, AddressRequest} from '../../services/address-book.service';
import { Observable, take, of, map } from 'rxjs';

@Component({
  selector: 'app-create-address',
  standalone: true,
  imports: [ CommonModule, AddressFormComponent ],
  templateUrl: './create-address.component.html'
})
export class CreateAddressComponent implements OnInit {
  controls: AddressRequest = {
    addressee: '',
    street1: '',
    street2: '',
    town: '',
    county: '',
    postcode: ''
  };

  addressFormConfig!: AddressFormComponentConfig;

  constructor(private addressBookService: AddressBookService) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.addressFormConfig = {
      controls: this.controls,
      onSubmit: this.create.bind(this)
    }
  }

  create(address: AddressRequest): Observable<AddressRequest> {
    /* TODO: Handle any server error messages for the UX - relies on Client Side Validation only atm */
    return this.addressBookService.create(address).pipe(take(1), map((response)=> {
      this.setForm();
      return response as AddressRequest;
    }));
  }
}
