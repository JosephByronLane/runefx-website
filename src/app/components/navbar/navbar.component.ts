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

    dropdownItems: IDropdownItem[] = [

  {
    id: '1',
    title: 'Showcase',
    link: '/vfx',
    items: [
      {
        id: '1',
        displayString: '2025',
        link: '/vfx#2025'
      },
      {
        id: '2',
        displayString: '2024',
        link: '/vfx#2024'
      },
      {
        id: '3',
        displayString: '2023',
        link: '/vfx#2023'
      },
      {
        id: '4',
        displayString: '2022',
        link: '/vfx#2022'
      },
      {
        id: '5',
        displayString: 'Further back',
        link: '/vfx#2021'
      },  
        
    ]
  },
  {
    id: '2',
    title: 'Technologies',
    link: '/render',
    items: [
      {
        id: '1',
        displayString: 'Rendering',
        link: '/render'
      },
      {
        id: '2',
        displayString: 'Simulation',
        link: '/render#Simulations'
      },
      {
        id: '3',
        displayString: 'Parallelization',
        link: '/render#Parallelization'
      },
      {
        id: '4',
        displayString: 'Machine Learning',
        link: '/render#MachineLearning'
      },
    ]
  },
  {
    id: '3',
    title: 'Try/Buy',
    link: '/try-buy',
    items: [
      {
        id: '1',
        displayString: 'Runic Renderer',
        link: '/try-buy'
      },
      {
        id: '2',
        displayString: 'Forge',
        link: '/try-buy'
      }
    ]
  },

]

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
