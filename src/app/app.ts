import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('login-app');
  isLoggedIn = signal(false);
  username = signal('');
  constructor(private router: Router) {
    // Check initial logged-in state
    this.checkLoginStatus();

    // Check state on every navigation transition
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }

  private checkLoginStatus() {
    const userId = localStorage.getItem('userId')
    this.isLoggedIn.set(!!userId);
    this.username.set(localStorage.getItem('username') || '')
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');

    this.isLoggedIn.set(false);
    this.username.set('');

    this.router.navigate(['/login']);
  }
}
