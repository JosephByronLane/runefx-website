import { Component } from '@angular/core';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';
import { SimpleBoxComponent } from '../../components/simple-box/simple-box.component';
import { SimpleImageComponent } from '../../components/simple-image/simple-image.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RButtonComponent, SimpleBoxComponent, SimpleImageComponent, BackgroundVideoComponent, InfoBoxComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
