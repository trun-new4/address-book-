import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CreateAddressComponent } from './ui/create-address/create-address.component';
import { AddressesComponent } from './ui/addresses/addresses.component';
import { SceneComponent } from './ux/scene/scene.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CreateAddressComponent, AddressesComponent, SceneComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
