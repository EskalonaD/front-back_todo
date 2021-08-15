import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { RouterModule } from '@angular/router';
import { AlertDirective } from './alert.directive';
import { AlertComponent } from './alert/alert.component';
import { LogoComponent } from './logo/logo.component';
import { InAppComponent } from './in-app/in-app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// const appRoutes = [
//   {path: '/tasks'}
// ];

const components = [
  PanelComponent,
  AlertDirective,
  AlertComponent,
  InAppComponent,
  LogoComponent,
  LoginComponent,
  RegisterComponent,
]


@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    // RouterModule.forRoot(appRoutes),
  ],
  exports: [...components,]
})
export class TempModule { }
