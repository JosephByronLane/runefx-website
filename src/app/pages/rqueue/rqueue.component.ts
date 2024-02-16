import { Component } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { SimpleImageComponent } from '../../components/simple-image/simple-image.component';

@Component({
  selector: 'app-rqueue',
  standalone: true,
  imports: [BackgroundVideoComponent, InfoBoxComponent, SimpleImageComponent],
  templateUrl: './rqueue.component.html',
  styleUrl: './rqueue.component.css'
})
export class RqueueComponent {

}
