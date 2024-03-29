import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './temp/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Object-Oriented-ToDo-List';
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
  }
}
