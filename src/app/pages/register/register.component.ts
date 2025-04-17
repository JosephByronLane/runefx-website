import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { RouterModule } from '@angular/router';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { dccOptions  } from '../../data/dccOptions.json';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RButtonComponent, BackgroundVideoComponent, RouterModule, InfoBoxComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  dccOptions = dccOptions;
}
