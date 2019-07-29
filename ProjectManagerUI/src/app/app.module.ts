import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { appRoutes } from './app-routing.module';
import { ApiService } from './service/api-service';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { UserListModelComponent } from './model-popup/user-list-model/user-list-model.component';
import { ProjectListModelComponent } from './model-popup/project-list-model/project-list-model.component';
import { TaskListModelComponent } from './model-popup/task-list-model/task-list-model.component';
import { DialogService } from "ng2-bootstrap-modal";

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    UsersComponent,
    AddTasksComponent,
    ViewTasksComponent,
    UserListModelComponent,
    ProjectListModelComponent,
    TaskListModelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BootstrapModalModule.forRoot({ container: document.body })
  ],
  entryComponents: [
    UserListModelComponent,
    ProjectListModelComponent,
    TaskListModelComponent
  ],
  providers: [ApiService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
