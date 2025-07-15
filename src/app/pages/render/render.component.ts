import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';
import { ShittyNavbarComponent } from '../../components/shitty-navbar/shitty-navbar.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';


@Component({
  selector: 'app-render',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, BackgroundVideoComponent, RButtonComponent, ShittyNavbarComponent, InfoBoxComponent],
  templateUrl: './render.component.html',
  styleUrl: './render.component.css'
})
export class RenderComponent {

  //nav items for shitty navbar,  should be one similar in /vfx
  navItems = [
    { text: 'Rendering', targetId: 'Rendering' },
    { text: 'Simulations', targetId: 'Simulations' },
    { text: 'Parallelization', targetId: 'Parallelization' },
    { text: 'Machine Learning', targetId: 'MachineLearning' }
  ];
}
