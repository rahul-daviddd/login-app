import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Home } from './home';

@Component({ selector: 'dummy-login', template: '' })
class DummyLogin {}

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    localStorage.setItem('userId', 'mock-user-123');

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([
          { path: 'login', component: DummyLogin }
        ]),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
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
