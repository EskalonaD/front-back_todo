import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './temp/auth.guard';
import { LoginComponent } from './temp/login/login.component';
import { PanelComponent } from './temp/panel/panel.component';
import { RegisterComponent } from './temp/register/register.component';
import { EditorComponent } from './view-layer/editor/editor.component';
import { PageNotFoundComponent } from './view-layer/page-not-found/page-not-found.component';
import { TasksComponent } from './view-layer/tasks/tasks.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '', 
    component: PanelComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'tasks' },
      { path: 'tasks/create', component: EditorComponent },
      { path: 'tasks/:id', component: EditorComponent },
      { path: 'tasks', component: TasksComponent, },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
