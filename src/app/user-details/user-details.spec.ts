import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { UserDetails } from './user-details';

@Component({ selector: 'dummy-login', template: '' })
class DummyLogin {}

describe('UserDetails', () => {
  let component: UserDetails;
  let fixture: ComponentFixture<UserDetails>;

  beforeEach(async () => {
    localStorage.setItem('userId', 'mock-user-123');

    await TestBed.configureTestingModule({
      imports: [UserDetails],
      providers: [
        provideRouter([
          { path: 'login', component: DummyLogin }
        ]),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorage.removeItem('userId');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
