import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoopAnimationPlayer, animate, state, style, transition, trigger, ɵBrowserAnimationBuilder} from '@angular/animations';
import { CommonModule } from '@angular/common'; 
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoadingScreenService } from '../../services/loading-screen.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css',
  animations: [
  ]
})
export class LoadingScreenComponent implements OnInit {

  //
  //
  // THIS IS THE BASE LOADING SCREEN
  //
  //
  
  @Input() fadeTime: number = 5;

  show: boolean = true; 

  ngOnInit(): void {
    setTimeout(() => {
      this.startFadeOut();
    }, this.fadeTime * 1000); 
  }

  startFadeOut(): void {
    const element = document.getElementById('splash-screen');
    const logo = document.getElementById('splash-logo');

    if (element && logo) {
      element.classList.add('fade-out');
      logo.classList.add('fade-out-tl');

      setTimeout(() => {
        this.show = false; 
        element.classList.add('disabled');
        element.classList.remove('fade-out');

        logo.classList.add('disabled');
        logo.classList.remove('fade-out-tl');
      }, 1000); 
    }
  }
}
