import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  email = '';
  password = '';

  showPassword = false;

  successMessage = '';
  errorMessage = '';

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef) {}
  
  login() {
    // 1. The 50ms delay gives Chrome's autofill time to sync with Angular's ngModel
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';

      // 2. Basic Validation
      if (!this.email.trim() || !this.password.trim()) {
        this.errorMessage = 'Please enter both email and password.';
        // Force UI update so you actually see this error if it triggers!
        this.cdr.detectChanges(); 
        return;
      }

      const credentials = {
        email: this.email,
        password: this.password
      };

      // 3. HTTP POST Request to backend
      this.http.post<any>(`${this.apiUrl}/login`, credentials).subscribe({
        next: (response) => {
          this.errorMessage = '';
          this.successMessage = 'Login successful!';
          
          this.cdr.detectChanges(); 

          setTimeout(() => {
            this.router.navigate(['/home'], { replaceUrl: true });
          }, 1500);
        },
        error: (error: HttpErrorResponse) => {
          this.successMessage = '';
          
          if (error.status === 401 || error.status === 404) {
            this.errorMessage = 'Invalid email or password.';
          } else {
            this.errorMessage = 'Something went wrong. Please try again.';
          }
          
          this.cdr.detectChanges();
        }
      });
    }, 50); // <-- 50 millisecond pause
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}