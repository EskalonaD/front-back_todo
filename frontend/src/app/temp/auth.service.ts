import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TempModule } from './temp.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router, private route: ActivatedRoute) {
    this.isAuthenticated = sessionStorage.getItem('isAuth') === 'true';
  }

  isAuthenticated = false;

  login() {
    this.isAuthenticated = true;
    const url = this.route.snapshot.queryParams['returned-url'] || '/';
    sessionStorage.setItem('isAuth', 'true');
    this.router.navigateByUrl(url);

  }

  logout() {
    this.isAuthenticated = false;
    sessionStorage.setItem('isAuth', 'false');

    this.router.navigateByUrl('/login');
  }
}
