import { Component } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { SimpleBoxComponent } from '../../components/simple-box/simple-box.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { SimpleImageComponent } from '../../components/simple-image/simple-image.component';

@Component({
  selector: 'app-forge',
  standalone: true,
  imports: [BackgroundVideoComponent, SimpleBoxComponent, InfoBoxComponent, SimpleImageComponent],
  templateUrl: './forge.component.html',
  styleUrl: './forge.component.css'
})
export class ForgeComponent {

}
