import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

title = 'Object Oriented TODO';


  ngOnInit(): void {


    if( this.authService.isAuthenticated) {
      this.router.navigateByUrl('/');
    }
  }

  login() {
    this.authService.login();
  }

  goToRegister() {
    this.router.navigate(['register'], {relativeTo: this.route.parent, })
  }

}
