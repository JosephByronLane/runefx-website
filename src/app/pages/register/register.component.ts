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
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3),]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dcc: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
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
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = '';

    console.log("sending request");
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        console.log("request sent");
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSubmitting = false;
        console.log("request failed");
      }
    })

  }
  validatePasswords(group: FormGroup){
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  ngOnInit(){
    console.log('ngOnInit');
  }



}