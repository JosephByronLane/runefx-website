import { Component} from '@angular/core';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { IDropdownItem } from '../../interfaces/IDropdownItem';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { UtilsService } from '../../services/utils.service';
import { items as navbarItems } from '../../data/navbarItems.json';
import { ProfileSidebarComponent } from '../profile-sidebar/profile-sidebar.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';
import { NavbarAccordionComponent } from '../navbar-accordion/navbar-accordion.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, ClickOutsideDirective, DropdownComponent, ProfileSidebarComponent, NavbarAccordionComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('accordionAnimation', [
      state('closed', style({
        overflow: 'hidden',
        padding: '0'
      })),
      state('open', style({
        padding: '*'
      })),
      transition('closed <=> open', animate('300ms ease-in-out'))
    ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1,
        visibility: 'visible'
      })),
      state('out', style({
        transform: 'translateX(100%)',
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ]),
    trigger('backdropAnimation', [
      state('in', style({
        opacity: 1,
      })),
      state('out', style({
        opacity: 0,
      })),
      transition('in <=> out', animate('300ms ease-out')),
    ])
  ]
})
export class NavbarComponent {

  dropdownItems: IDropdownItem[] = navbarItems;

  calculatedPadding  = this.utils.mapRange(window.screen.width/window.screen.height, 2, 1, 5, 1)
  isMenuOpen = false;
  menuState = 'out';
  openAccordion: string ="-1";
  isLoggedIn = false;
  currentUser: IUser | null = null;


  public profileItem: IDropdownItem=
  {
    "id": "888",
    "title": "Profile",
    "link": "/",
    "items": [
      {
        "id": "1",
        "displayString": "Login",
        "link": "login"
      },
      {
        "id": "2",
        "displayString": "Register",
        "link": "register"
      },
    ]
  }
  

  navigateAndClose(path:string, id:string, duration:number) {
    this.menuState = 'out';
    this.isMenuOpen = false;
    this.temploading.switchWithLoading(path, id, duration);    
  }
  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu() {
    this.menuState = 'out';
    this.isMenuOpen = false;
  }
  constructor(
    public temploading: IntermitentLoadingService, 
    public utils: UtilsService,
    public authService: AuthService
  ) {}
  
  ngOnInit() {
    this.authService.isAuthenticatedValue.subscribe(isAuth => {
      this.isLoggedIn = isAuth;
    });
    
    this.authService.CurrentUserValue.subscribe(user => {
      this.currentUser = user;
    });
    


  }
   

  
  isAccordionOpen(id: string): boolean {
    return this.openAccordion == id
  }
  
  logoutAndClose() {
    this.authService.logout();
    this.menuState = 'out';
    this.isMenuOpen = false;
  }
}
