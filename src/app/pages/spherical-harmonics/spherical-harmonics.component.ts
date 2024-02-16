import { Component } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { SimpleImageComponent } from '../../components/simple-image/simple-image.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';

@Component({
  selector: 'app-spherical-harmonics',
  standalone: true,
  imports: [BackgroundVideoComponent, SimpleImageComponent, InfoBoxComponent,],
  templateUrl: './spherical-harmonics.component.html',
  styleUrl: './spherical-harmonics.component.css'
})
export class SphericalHarmonicsComponent {

}
