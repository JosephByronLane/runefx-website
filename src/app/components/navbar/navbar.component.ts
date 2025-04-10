import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IntermitentLoadingComponent } from '../intermitent-loading/intermitent-loading.component';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { IDropdownItem } from '../../interfaces/IDropdownItem';
import { DropdownComponent } from '../dropdown/dropdown.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, ClickOutsideDirective, DropdownComponent ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  technologiesDropdownItem: IDropdownItem = {
    id: '1',
    title: 'Rendering',
    items: [
        {
          id: '1',
          displayString: 'Runic Renderer',
          link: '/runic-renderer'
        },
        {
          id: '2',
          displayString: 'Arnold Renderer',
          link: '/arnold-renderer'
        },
        {
          id: '3',
          displayString: 'Cycles Renderer',
          link: '/cycles-renderer'
        },
        {
          id: '4',
          displayString: 'Redshift Renderer',
          link: '/redshift-renderer'
        },      
          
      ]
  }

  ///TODO: ive seen this function before. Im sure i can generalize it and put it in a service
  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  calculatedPadding  = this.mapRange(window.screen.width/window.screen.height, 2, 1, 5, 1)
  isMenuOpen = false;
  menuState = 'out';

  navigateAndClose(path:string, id:string, duration:number) {
    this.isMenuOpen = false;
    this.navigate(path, id, duration);
  }
  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu() {
    this.isMenuOpen = false;
  }
  constructor(private temploading: IntermitentLoadingService) {}
  navigate(path:string, id:string, duration:number) {
    this.temploading.switchWithLoading(path, id, duration);
  }
  //add to helper service
  mapRange(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((x - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  }


}
