import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { RouterModule } from '@angular/router';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import dccOptions from '../../data/dccOptions.json';
import { AuthService } from '../../services/auth.service';
import { LoggerService, LogLevel } from '../../services/logger.service';
import { ProfileSidebarComponent } from '../../components/profile-sidebar/profile-sidebar.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RButtonComponent, BackgroundVideoComponent, RouterModule, InfoBoxComponent, ReactiveFormsModule, RButtonComponent, ProfileSidebarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  dccOptions = [
    { "value": "maya", "label": "Maya" },
    { "value": "blender", "label": "Blender" },
    { "value": "houdini", "label": "Houdini" },
    { "value": "katana", "label": "Katana" }
  ];

  errorMessage: string = '';
  isSubmitting: boolean = false;
  statusMessage: string = '';
  registerForm: FormGroup;

  isLoggedIn: boolean = false;
  

  constructor(private fb: FormBuilder, private authService: AuthService, private loggingService: LoggerService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dcc: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/)]],
      password2: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/)]],
    },
    {
      validators: this.validatePasswords
    }

    );
  }

  openSidebar(event:MouseEvent){
    event.stopPropagation(); //stop directive from closing it as soon as it opens
    this.authService.openProfileSidebar()
  }
  onSubmit(){
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      this.loggingService.log(LogLevel.Debug, `Form is valid, ${this.registerForm}`)
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.statusMessage = "Registration successful";
      },
      error: (err) => {
        this.isSubmitting = false;
        this.loggingService.log(LogLevel.Error, `invalid form, ${err}`)

        
        const errorResponse = err.error;
        this.loggingService.log(LogLevel.Error, `Error response body:, ${errorResponse}`)
        
        if (errorResponse && errorResponse.message) {
          if (Array.isArray(errorResponse.message)) {
            this.errorMessage = errorResponse.message[0];
          } else {
            this.errorMessage = errorResponse.message;
          }
        } else if (err.status === 400) {
          this.errorMessage = "Invalid form data. Please check your inputs and try again.";
        } else {
          this.errorMessage = "An error occurred while registering. Please try again later.";
        }
      }
    })
    this.isSubmitting = false;
  }
  validatePasswords(group: FormGroup){
    const password = group.get('password')?.value;
    const confirmPassword = group.get('password2')?.value;
    if (password !== confirmPassword) {
      group.get('password2')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }


  ngOnInit(){
    this.authService.isAuthenticatedValue.subscribe(
      (isAuth:boolean)=>{
        this.isLoggedIn = isAuth
        this.loggingService.log(LogLevel.Debug, `Register page - Checked for registration ${this.isLoggedIn}`)
      }
    )
  }



}