import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  activeTab: 'welcome' | 'profile' = 'welcome';
  userId: string | null = null;
  profile: any = null;
  profileLoaded = false;
  isEditing = false;

  // Profile Form Fields
  firstName = '';
  lastName = '';
  dob = '';
  gender = '';
  countryCode = '';
  phoneNumber = '';

  calculatedAge: number | null = null;
  successMessage = '';
  errorMessage = '';

  private apiUrl = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadProfile();
  }

  setActiveTab(tab: 'welcome' | 'profile') {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
    if (tab === 'profile') {
      this.loadProfile();
    }
    this.cdr.detectChanges();
  }

  loadProfile() {
    if (!this.userId) return;

    this.http.get<any>(`${this.apiUrl}/users/${this.userId}`).subscribe({
      next: (data) => {
        this.profile = data;
        this.profileLoaded = true;

        // If profile details exist, calculate age
        if (data && data.dob) {
          this.calculateAgeForDob(data.dob);
        }
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load profile:', error);
        this.profileLoaded = true;
        this.cdr.detectChanges();
      }
    });
  }

  enableEdit() {
    this.isEditing = true;
    if (this.profile) {
      this.firstName = this.profile.firstName || '';
      this.lastName = this.profile.lastName || '';
      this.dob = this.profile.dob ? this.profile.dob.split('T')[0] : '';
      this.gender = this.profile.gender || '';
      this.countryCode = this.profile.countryCode || '';
      this.phoneNumber = this.profile.phoneNumber || '';
      this.calculateAge();
    }
    this.cdr.detectChanges();
  }

  cancelEdit() {
    this.isEditing = false;
    this.successMessage = '';
    this.errorMessage = '';
    this.cdr.detectChanges();
  }

  calculateAge() {
    if (!this.dob) {
      this.calculatedAge = null;
      return;
    }
    this.calculateAgeForDob(this.dob);
  }

  private calculateAgeForDob(dobString: string) {
    const birthDate = new Date(dobString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.calculatedAge = age;
  }

  saveProfile() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.firstName || !this.lastName || !this.dob || !this.gender || !this.countryCode || !this.phoneNumber) {
      let missing = [];
      if (!this.firstName) missing.push('First Name');
      if (!this.lastName) missing.push('Last Name');
      if (!this.dob) missing.push('DOB');
      if (!this.gender) missing.push('Gender');
      if (!this.countryCode) missing.push('Country Code');
      if (!this.phoneNumber) missing.push('Phone Number');

      this.errorMessage = `Please fill out: ${missing.join(', ')}`;
      this.cdr.detectChanges();
      return;
    }

    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(this.countryCode) || !numberRegex.test(this.phoneNumber)) {
      this.errorMessage = 'Country code and phone number must contain only numbers.';
      this.cdr.detectChanges();
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
        this.isEditing = false;
        this.loadProfile();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to save details. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
