import { Routes } from '@angular/router';
import { AddressesComponent } from './ui/addresses/addresses.component';
import { CreateAddressComponent } from './ui/create-address/create-address.component';

export const routes: Routes = [
    { path: '', component: AddressesComponent },
    { path: 'create', component: CreateAddressComponent },
    { path: 'mf', component: AddressesComponent },
    { path: 'mf/:id', component: AddressesComponent }
];
