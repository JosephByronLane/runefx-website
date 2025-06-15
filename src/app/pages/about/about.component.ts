import { Component, OnInit } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BackgroundVideoComponent, InfoBoxComponent, ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  ngOnInit() {
  }
}
