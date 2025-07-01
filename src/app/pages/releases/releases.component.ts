import { Component } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { ShowcaseBoxComponent } from '../../components/showcase-box/showcase-box.component';

@Component({
  selector: 'app-releases',
  standalone: true,
  imports: [BackgroundVideoComponent, InfoBoxComponent, ShowcaseBoxComponent],
  templateUrl: './releases.component.html',
  styleUrl: './releases.component.css'
})
export class ReleasesComponent {

}
