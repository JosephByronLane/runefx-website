import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IntermitentLoadingComponent } from '../intermitent-loading/intermitent-loading.component';
import { LoadingScreenService } from '../../services/loading-screen.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  ///ive seen this function before. Im sure i can generalize it and put it in a service
  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  
  constructor(private temploading: LoadingScreenService) {}
  navigate(path:string, id:string, duration:number) {
    this.temploading.switchWithLoading(path, id, duration);
  }



}
