import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('login', {read: ElementRef}) login: ElementRef<HTMLInputElement>;
  @ViewChild('password', {read: ElementRef}) password: ElementRef<HTMLInputElement>;
  @ViewChild('passwordRepeat', {read: ElementRef}) passwordRepeat: ElementRef<HTMLInputElement>;

  constructor(private alertService: AlertService, private router: Router) { }


  private validate(): boolean {
    // console.log(this.login.nat, this.passwordRepeat, this.password);
    if([this.login.nativeElement.value, this.password.nativeElement.value, this.passwordRepeat.nativeElement.value].includes('')) {
      this.alertService.addError('Login or password should not be blank');
      return false;
    }

    if(this.password.nativeElement.value !== this.passwordRepeat.nativeElement.value) {
      this.alertService.addError('Passwords should match');
      return false;
    }

    return true;
  }

  signUp() {
    const validation = this.validate();
    
    
    if (validation) this.router.navigate(['login']);
  }

}
