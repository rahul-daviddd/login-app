import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Route, Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})

export class UserDetails {
  firstName = '';
  lastName = ''
  dob = '';
  gender = '';

  countryCode = '';
  phoneNumber = '';

  calculatedAge: number | null = null;

  successMessage = '';
  errorMessage = '';
  userId: string | null = null;

  private apiUrl = 'http://localhost:3000' ;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
    }
  }

  calculateAge() {
    if (!this.dob) {
      this.calculatedAge = null;
      return;
    }

    const birthDate = new Date(this.dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference == 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.calculatedAge = age;
  }

  saveDetails() {
    this.successMessage = '';
    this.errorMessage = '';

    // 1. Let's look inside Angular's brain! (Check your browser Console)
    console.log('--- Form Data Check ---', {
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      gender: this.gender,
      countryCode: this.countryCode,
      phoneNumber: this.phoneNumber
    });

    // 2. A smarter validation check that tells you EXACTLY what is missing
    if (!this.firstName || !this.lastName || !this.dob || !this.gender || !this.countryCode || !this.phoneNumber) {
      
      let missing = [];
      if (!this.firstName) missing.push('First Name');
      if (!this.lastName) missing.push('Last Name');
      if (!this.dob) missing.push('DOB');
      if (!this.gender) missing.push('Gender');
      if (!this.countryCode) missing.push('Country Code');
      if (!this.phoneNumber) missing.push('Phone Number');

      this.errorMessage = `Please fill out: ${missing.join(', ')}`;
      return;
    }

    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(this.countryCode) || !numberRegex.test(this.phoneNumber)) {
        this.errorMessage = 'Country code and phone number must contain only numbers.';
        return;
    }

    const details = {
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      gender: this.gender,
      countryCode: this.countryCode,
      phoneNumber: this.phoneNumber
    };

    this.http.put<any>(`${this.apiUrl}/users/${this.userId}/details`, details).subscribe({
      next: (response) => {
        this.successMessage = 'Profile updated successfully!';
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to save details. Please try again.';
        this.successMessage = '';
        this.cdr.detectChanges();
      }
    });
  }
}
