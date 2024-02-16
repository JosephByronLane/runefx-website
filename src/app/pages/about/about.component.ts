import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { SimpleBoxComponent } from '../../components/simple-box/simple-box.component';
import { SimpleImageComponent } from '../../components/simple-image/simple-image.component';
import { InitialLoadingService, browserRefresh } from '../../services/initial-loading.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent, BackgroundVideoComponent, InfoBoxComponent, SimpleBoxComponent,SimpleImageComponent ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  ngOnInit() {
  }
}
