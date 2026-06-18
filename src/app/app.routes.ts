import {Routes} from '@angular/router';
import {Login} from './login/login';
import {Register} from './register/register';
import {Home} from './home/home';
import { UserDetails } from './user-details/user-details';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'home', component: Home },
    { path: 'user-details', component: UserDetails }
];