import { Component } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { SimpleImageComponent } from '../../components/simple-image/simple-image.component';

@Component({
  selector: 'app-runic-renderer',
  standalone: true,
  imports: [BackgroundVideoComponent, InfoBoxComponent, SimpleImageComponent],
  templateUrl: './runic-renderer.component.html',
  styleUrl: './runic-renderer.component.css'
})
export class RunicRendererComponent {

}
