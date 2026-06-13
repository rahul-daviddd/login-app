import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {
  username = '';
  email = '';
  password = '';

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}
  
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
      this.errorMessage =
        'Password must be at least 6 characters.';
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post(
      'http://localhost:3000/register',
      user
    ).subscribe({
      next: (response) => {
        this.errorMessage = '';
        this.successMessage = 'Account created successfully!';
        this.username = '';
        this.email = '';
        this.password = '';

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

        console.log('User created.', response);
      },

      error: (error) => {
        this.successMessage = '';
        this.errorMessage = 'Email already registered.';
        console.error(error);
      }
    });
  }
}