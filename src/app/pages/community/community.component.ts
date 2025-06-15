import { Component } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { SimpleImageComponent } from '../../components/simple-image/simple-image.component';
import { SimpleBoxComponent } from '../../components/simple-box/simple-box.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';
@Component({
  selector: 'app-community',
  standalone: true,
  imports: [BackgroundVideoComponent, SimpleImageComponent, SimpleBoxComponent, InfoBoxComponent, RButtonComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent {

}
