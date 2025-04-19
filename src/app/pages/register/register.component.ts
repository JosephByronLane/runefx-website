import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RButtonComponent } from '../../components/rbutton/rbutton.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { RouterModule } from '@angular/router';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import dccOptions from '../../data/dccOptions.json';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RButtonComponent, BackgroundVideoComponent, RouterModule, InfoBoxComponent, ReactiveFormsModule, RButtonComponent],
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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dcc: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      password2: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    },
    {
      validators: this.validatePasswords
    }
  );
  console.log(this.registerForm);
  }
  onSubmit(){
    console.log('onSubmit');
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      console.log("form is invalid");
      console.log(this.registerForm)
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = '';

    console.log("sending request");
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.statusMessage = "Registration successful";
      },
      error: (err) => {
        this.isSubmitting = false;
        console.log("Full error object:", err);
        
        // Get the error response body
        const errorResponse = err.error;
        console.log("Error response body:", errorResponse);
        
        if (errorResponse && errorResponse.message) {
          // Check if message is an array and grab the first item
          if (Array.isArray(errorResponse.message)) {
            this.errorMessage = errorResponse.message[0];
          } else {
            this.errorMessage = errorResponse.message;
          }
        } else if (err.status === 400) {
          // If the error body doesn't have a message property but status is 400
          this.errorMessage = "Invalid form data. Please check your inputs and try again.";
        } else {
          // Fallback generic error
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
    console.log('ngOnInit');
  }



}