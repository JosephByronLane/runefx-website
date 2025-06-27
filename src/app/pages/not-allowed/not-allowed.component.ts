import { Component } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';

@Component({
  selector: 'app-not-allowed',
  standalone: true,
  imports: [BackgroundVideoComponent, InfoBoxComponent, RButtonComponent  ],
  templateUrl: './not-allowed.component.html',
  styleUrl: './not-allowed.component.css'
})
export class NotAllowedComponent {

}
