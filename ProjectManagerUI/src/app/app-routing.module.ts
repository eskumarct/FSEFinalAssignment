import { Routes } from '@angular/router';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';

export const appRoutes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'addTasks', component: AddTasksComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'viewTasks', component: ViewTasksComponent }
]
