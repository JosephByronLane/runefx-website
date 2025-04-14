import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IntermitentLoadingComponent } from '../intermitent-loading/intermitent-loading.component';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { IDropdownItem } from '../../interfaces/IDropdownItem';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { UtilsService } from '../../services/utils.service';
import { items as navbarItems } from '../../data/navbarItems.json';
import { ProfileSidebarComponent } from '../profile-sidebar/profile-sidebar.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, ClickOutsideDirective, DropdownComponent, ProfileSidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    dropdownItems: IDropdownItem[] = navbarItems;

  ///TODO: ive seen this function before. Im sure i can generalize it and put it in a service

  calculatedPadding  = this.utils.mapRange(window.screen.width/window.screen.height, 2, 1, 5, 1)
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
  constructor(private temploading: IntermitentLoadingService, public utils: UtilsService) {}
  navigate(path:string, id:string, duration:number) {
    this.temploading.switchWithLoading(path, id, duration);
  }
  //add to helper service



}
