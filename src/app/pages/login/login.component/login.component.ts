import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login.component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
 errorMessage ='';
 loginForm;

  
  constructor(private formBuilder: FormBuilder,
     private authService: AuthService,
      private router: Router) {
        this.loginForm = this.formBuilder.group({
          phone: ['', Validators.required],
          password: ['', Validators.required]
        });
  }

  onSubmit(): void {    
    if ( this.loginForm.invalid){
      return;
    }

    const { phone, password } = this.loginForm.value;
    this.authService.login(phone!, password!).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    })
  }
}
