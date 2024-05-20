import { Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressBookService, Address, AddressError } from '../../services/address-book.service';
import { AddressFullComponent, AddressFullComponentConfig } from '../../ux/address-full/address-full.component';

export interface AddressComponentConfig {
  addressId: string;
}

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, AddressFullComponent],
  templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit, OnChanges {
  @Input() config!: AddressComponentConfig;
  address!: Address | AddressError;
  addressFullComponentConfig!: AddressFullComponentConfig;

  constructor(private addressBookService: AddressBookService) {}

  ngOnInit(): void {
    this.getById();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getById();
  }

  getById(): void | false {
    if( !this.config.addressId) {
      return false;
    }
    this.addressBookService.getById(this.config.addressId).subscribe((address: Address | AddressError): void => {
      this.setAddress(address);
    })
  }

  setAddress(address: Address | AddressError): void | false {
    const response = address as Address;
    if( !response?.addressee ) {
      return false;
      /* TODO: Handle not found */
    }
    this.address = response;
    this.addressFullComponentConfig = {
      id: response.addressId,
      name: response.addressee,
      line1: response.street1,
      line2: response.street2,
      county: response.county,
      postcode: response.postcode
    } 
  }
}
