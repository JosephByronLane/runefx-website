import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingScreenService } from '../../services/loading-screen.service';

@Component({
  selector: 'app-rbutton',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rbutton.component.html',
  styleUrl: './rbutton.component.css'
})
export class RButtonComponent {
  ///
  ///
  /// READ ME PLEASE, IMPLEMENT THIS INSIDE OF background-video PLEASE.
  /// IT CURRENTLY USES ITS OWN BUTTON WHICH IS A COPY OF THIS.
  ///
  ///
  @Input() buttonText: string = 'See All';
  @Input() buttonAlignment: 'left' | 'center' | 'right' = 'center';
  @Input() sendTo: string ="";
  @Input() isExternalWebpage: boolean = false;
  @Input() loadingDuration:number = 2000;
  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  constructor(private temploading: LoadingScreenService) {}

  handleNavigation() {
    if (this.isExternalWebpage) {
      //navigate outside the website

      //TODO: Try to make this angular rather than standard JS/TS 
      window.open(this.sendTo, '_blank');
    } else {
      //nagivate inside the website
      this.navigate(this.sendTo, '', this.loadingDuration);
    }
  }

  navigate(path:string, id:string, duration:number) {
    this.temploading.switchWithLoading(path, id, duration);
  }
}
