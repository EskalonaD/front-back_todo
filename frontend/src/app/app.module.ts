import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Initiazer } from './temp/initiazer';
import { TasksComponent } from './view-layer/tasks/tasks.component';
import { TaskComponent } from './view-layer/task/task.component';
import { TempModule } from './temp/temp.module';
import { PageNotFoundComponent } from './view-layer/page-not-found/page-not-found.component';
import { EditorComponent } from './view-layer/editor/editor.component';
import { TasksController } from './controller/tasks.controller';
import { TasksModel } from './model-layer/tasks.model';
import { FieldComponent } from './view-layer/field/field.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent,
    PageNotFoundComponent,
    EditorComponent,
    FieldComponent,
  ],
  imports: [
    BrowserModule,
    TempModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER, useValue: (new Initiazer).init, multi: true,
    },
    {
      provide: TasksController, useValue: TasksController.getController(TasksModel)
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
