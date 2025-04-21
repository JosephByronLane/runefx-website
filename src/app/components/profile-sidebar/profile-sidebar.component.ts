import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { style, state, trigger, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { RButtonComponent } from '../rbutton/rbutton.component';
import { Router } from '@angular/router';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { UtilsService } from '../../services/utils.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { IUser } from '../../interfaces/IUser';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RButtonComponent, ClickOutsideDirective],
  templateUrl: './profile-sidebar.component.html',
  styleUrl: './profile-sidebar.component.css',
  animations: [
    trigger('sidebarState', [
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      state('open', style({
        transform: 'translateX(0)'
      })),
      transition('closed <=> open', [animate('0.3s ease')])
    ]),
    trigger('arrowState', [
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
      state('open', style({
        transform: 'rotate(180deg)'
      })),
      transition('closed <=> open', [animate('1s ease-in-out')])
    ]),
    trigger('dimmedBackgroundOpacity', [
      state('closed', style({
        opacity: 0
      })),
      state('open', style({
        opacity: 1
      })),
      transition('closed <=> open', [animate('0.3s ease')])
    ])
  ]
})
export class ProfileSidebarComponent {
  public isOpen: boolean = false;
  public isLoggedIn: boolean = false;
  public username: string = '';
  public password: string = '';
  public currentUser: IUser | null = null;

  constructor(private router: Router,
    public temploading: IntermitentLoadingService,
    public utils: UtilsService,
    private authService: AuthService,  
    ) {}

  public openSidebar() :void {
    this.isOpen = true
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    if(!this.isOpen){
      //first we get the dimmed background element
      
      
    }
  }
  ngOnInit() {
    this.isOpen = false;


  }

  ngAfterContentInit(){
    this.isLoggedIn = this.authService.isAuthenticatedValue
    this.currentUser = this.authService.CurrentUserValue
    //implement auth check
  }

  attemptLogin = (): void => {
    this.authService.login(this.username,this.password).subscribe({
      next: (response) =>{
        this.currentUser = this.authService.CurrentUserValue
        this.isLoggedIn = true
      },
      error: (error) =>{
        console.log("awww")
      }
    })
  }



  logout = (): void => {
    this.isLoggedIn = false;
  }

}
