import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

interface AddressSummaryComponentConfig {
  id: string;
  name: string;
  county: string;
}

@Component({
  selector: 'app-address-summary',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './address-summary.component.html',
  styleUrl: './address-summary.component.scss'
})
export class AddressSummaryComponent {
  @Input() config!: AddressSummaryComponentConfig;
}
