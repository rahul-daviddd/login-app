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
    this.isLoggedIn.set(!!localStorage.getItem('userId'));
  }

  logout() {
    localStorage.removeItem('userId');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
