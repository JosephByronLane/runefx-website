import { Component, ElementRef, ViewChild } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoggerService, LogLevel } from '../../services/logger.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BackgroundVideoComponent, 
    InfoBoxComponent, 
    RButtonComponent, 
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public errorMessage: string = '';
  public isAttemptingLogin: boolean = false;

  @ViewChild('userInput') userInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('passInput') passInputRef!: ElementRef<HTMLInputElement>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly loggerService: LoggerService
  ) {}

  attemptLogin = (): void => {
    this.isAttemptingLogin = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (msg) => {
        this.loggerService.log(LogLevel.Debug, "Login successful");
        this.isAttemptingLogin = false;

      },
      error: (error) => {
        this.isAttemptingLogin = false;
        this.userInputRef.nativeElement.style.outline = "2px solid red";
        this.passInputRef.nativeElement.style.outline = "2px solid red";
        this.loggerService.log(LogLevel.Error, `Error while logging in ${error}`);
        
        const errorStatus = error.status;
        if (errorStatus === 0) {
          this.errorMessage = "Error communicating with login server. Please contact support";
        } else if (errorStatus === 401 || errorStatus === 400) {
          this.errorMessage = "Incorrect credentials.";
        } else if (errorStatus === 500) {
          this.errorMessage = "Server error. Please try again later.";
        } else {
          this.errorMessage = "Error logging in.";
        }
        
        setTimeout(() => {
          this.userInputRef.nativeElement.style.outline = "none";
          this.passInputRef.nativeElement.style.outline = "none";
        }, 12000);
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
