import { Component, ChangeDetectorRef } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = '';
  email = '';
  password = '';
  successMessage = '';
  errorMessage = '';

  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}
  
  register() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.username.trim() || !this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Enter a valid email address.';
      return;
    }
    
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post<any>(`${this.apiUrl}/register`, user).subscribe({
      next: (response) => {
        this.errorMessage = '';
        this.successMessage = 'Account created successfully!';
        this.cdr.detectChanges();
        this.username = '';
        this.email = '';
        this.password = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },

      error: (error: HttpErrorResponse) => {
        this.successMessage = '';
        if (error.status === 409) {
          this.errorMessage = 'Email already registered.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }

        this.cdr.detectChanges(); 
      }
    });
  }
}