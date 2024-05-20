import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AddressFullComponentConfig {
  id: string;
  name: string;
  line1: string;
  line2: string;
  county: string;
  postcode: string;
}
@Component({
  selector: 'app-address-full',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-full.component.html',
  styleUrl: './address-full.component.scss'
})
export class AddressFullComponent {
  @Input() config!: AddressFullComponentConfig;
}
