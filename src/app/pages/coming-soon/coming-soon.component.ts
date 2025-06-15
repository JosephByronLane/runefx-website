import { Component } from '@angular/core';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';
import { SimpleBoxComponent } from '../../components/simple-box/simple-box.component';
import { SimpleImageComponent } from '../../components/simple-image/simple-image.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [RButtonComponent, SimpleBoxComponent, SimpleImageComponent, BackgroundVideoComponent, InfoBoxComponent],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css'
})
export class ComingSoonComponent {

}
