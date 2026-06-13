import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  
  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}