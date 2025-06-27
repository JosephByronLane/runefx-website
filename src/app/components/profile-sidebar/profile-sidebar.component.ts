import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { style, state, trigger, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { RButtonComponent } from '../rbutton/rbutton.component';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { UtilsService } from '../../services/utils.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { IUser } from '../../interfaces/IUser';
import { AuthService } from '../../services/auth.service';
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
  public isAttemptingLogin:boolean =false;
  public username: string = '';
  public password: string = '';
  public currentUser: IUser | null= null;

  public  errorMessage: string = '';

  @ViewChild('userInput') userInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('passInput') passInputRef!: ElementRef<HTMLInputElement>;

  constructor(
    public temploading: IntermitentLoadingService,
    public utils: UtilsService,
    public authService: AuthService,  
    public loggerService: LoggerService
    ) {

    }

  closeSidebar(){
    if (this.isOpen) this.authService.closeProfileSidebar()
  }

  toggleSidebar() {
    this.authService.toggleProfileSidebar()
  }



  ngOnInit() {
    this.loggerService.log(LogLevel.Debug, `Profile Sidebar - Initialized`)
    this.authService.CurrentUserValue.subscribe(
      (user: IUser | null) =>{
        this.currentUser = user
        this.loggerService.log(LogLevel.Debug, `Profile Sidebar - Updated auth user as ${JSON.stringify(this.currentUser)}`)

      }
    )
    this.authService.isAuthenticatedValue.subscribe(
      (isAuth:boolean)=>{
        this.isLoggedIn = isAuth
        this.loggerService.log(LogLevel.Debug, `Profile Sidebar - Updated auth status as ${this.isLoggedIn}`)
      }
    )

    this.authService.isSidebarOpenValue.subscribe(
      (isSidebarOpen:boolean)=>{
        this.isOpen = isSidebarOpen
      }
    )
  }

   attemptLogin = (): void => {
    this.authService.login(this.username,this.password).subscribe({
      next: (_) =>{
        this.loggerService.log(LogLevel.Debug, "Login successful")
        //we dont do anything, all the switching the states is done through the login function itself and its subscribables (on the auth service)
      },
      error: (error) => {
        this.userInputRef.nativeElement.style.outline = "2px solid red"
        this.passInputRef.nativeElement.style.outline = "2px solid red"
        this.loggerService.log(LogLevel.Error, `Error while logging in ${error}`)
        const errorStatus = error.status
        if (errorStatus === 0 ) {  //server dead or didnt recieve response
          this.errorMessage = "Error comunicating with login server. Please contact support"
        }
        else if (errorStatus === 401 || errorStatus === 400){
          this.errorMessage = "Incorrect credentials."
        }
        else if (errorStatus === 500){
          this.errorMessage = "Server error. Please try again later."
        }
        else {
          this.errorMessage = "Error logging in."
        }
        
        setTimeout(() => {
          this.userInputRef.nativeElement.style.outline = "none"
          this.passInputRef.nativeElement.style.outline = "none"
        }, 12000)

      }
    })
  }



  logout = (): void => {
    this.authService.logout()
    this.isOpen=false //should we make logout reutrn a subscribabele? figure out...
  }

}
