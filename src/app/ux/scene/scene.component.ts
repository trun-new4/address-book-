import { Component } from '@angular/core';
import { SceneBackgroundComponent } from '../scene-background/scene-background.component';
import { SceneForegroundComponent } from '../scene-foreground/scene-foreground.component';

@Component({
  selector: 'app-scene',
  standalone: true,
  imports: [SceneBackgroundComponent, SceneForegroundComponent],
  templateUrl: './scene.component.html'
})
export class SceneComponent {}
