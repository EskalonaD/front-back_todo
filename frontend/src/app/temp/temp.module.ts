import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { RouterModule } from '@angular/router';
import { AlertDirective } from './alert.directive';
import { AlertComponent } from './alert/alert.component';

// const appRoutes = [
//   {path: '/tasks'}
// ];

const components = [
  PanelComponent,
  AlertDirective,
  AlertComponent,
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
