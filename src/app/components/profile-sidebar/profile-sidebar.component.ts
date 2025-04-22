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
import { Observable, Subscribable, Subscription } from 'rxjs';
import { LoggerService, LogLevel } from '../../services/logger.service';
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
  public currentUser: IUser | null= null;

  constructor(
    private router: Router,
    public temploading: IntermitentLoadingService,
    public utils: UtilsService,
    private authService: AuthService,  
    public loggerService: LoggerService
    ) {

    }

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

    this.loggerService.log(LogLevel.Debug, `Profile Sidebar - Initialized`)
    this.isOpen = false;
    this.authService.CurrentUserValue.subscribe(
      (user: IUser | null) =>{
        this.currentUser = user
        this.loggerService.log(LogLevel.Debug, `Profile Sidebar - Updated auth user as ${this.currentUser}`)

      }
    )
    this.authService.isAuthenticatedValue.subscribe(
      (isAuth:boolean)=>{
        this.isLoggedIn = isAuth
        this.loggerService.log(LogLevel.Debug, `Profile Sidebar - Updated auth status as ${this.isLoggedIn}`)
      }
    )
  }

  ngOnDestroy(){

  }

  ngAfterContentInit(){
    //implement auth check
  }

  attemptLogin = (): void => {
    this.authService.login(this.username,this.password)
  }



  logout = (): void => {
    this.authService.logout()
    this.isOpen=false //should we make logout reutrn a subscribabele? figure out...
  }

}
