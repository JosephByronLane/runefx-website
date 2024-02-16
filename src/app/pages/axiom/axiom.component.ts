import { Component } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { SimpleImageComponent } from '../../components/simple-image/simple-image.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';

@Component({
  selector: 'app-axiom',
  standalone: true,
  imports: [BackgroundVideoComponent, SimpleImageComponent, InfoBoxComponent,],
  templateUrl: './axiom.component.html',
  styleUrl: './axiom.component.css'
})
export class AxiomComponent {

}
