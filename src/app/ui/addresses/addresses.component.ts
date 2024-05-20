import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressSummaryComponent } from '../../ux/address-summary/address-summary.component';
import { AddressComponent } from '../address/address.component';
import { AddressBookService, Address } from '../../services/address-book.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, RouterModule, AddressSummaryComponent, AddressComponent],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss'
})
export class AddressesComponent {
  @Input('id') addressId ='';
  constructor(private addressBookService: AddressBookService) {}
  addresses: Address[] = [];

  get addressBook(): Address[] {
    return this.addresses;
  }

  get hasAddresses(): boolean {
    return !!this.addressBook?.length;
  }

  ngOnInit(): void {
    this.addressBookService.addresses$.subscribe((addresses: Address[])=> {
      this.addresses = addresses;
    })
  }

  get idPresentation(): string {
    return`${this.addressId.substring(0, 5)}...`;
  }
}
