import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-scene-foreground',
  standalone: true,
  imports: [ LogoComponent ],
  templateUrl: './scene-foreground.component.html',
  styleUrls: [
    './scene-foreground.component.scss',
    './scene-foreground.responsive.component.scss'
  ]
})
export class SceneForegroundComponent {}
