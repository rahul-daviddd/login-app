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

    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';

      if (!this.email.trim() || !this.password.trim()) {
        this.errorMessage = 'Please enter both email and password.';
        this.cdr.detectChanges(); 
        return;
      }

      const credentials = {
        email: this.email,
        password: this.password
      };

      this.http.post<any>(`${this.apiUrl}/login`, credentials).subscribe({
        next: (response) => {
          this.errorMessage = '';
          this.successMessage = 'Login successful!';

          localStorage.setItem('userId', response.user.id);
          
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
    }, 50);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}