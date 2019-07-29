import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../models/task-model';
import { ProjectModel } from '../models/project-model';
import { UserModel } from '../models/user-model';
import { ParentTaskModel } from '../models/task-model';
import { ApiService } from '../service/api-service';
import { DialogService } from "ng2-bootstrap-modal";
import { UserListModelComponent } from '../model-popup/user-list-model/user-list-model.component';
import { ProjectListModelComponent } from '../model-popup/project-list-model/project-list-model.component';
import { TaskListModelComponent } from '../model-popup/task-list-model/task-list-model.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {
  IsParentTask: boolean;
  StartDate: string;
  EndDate: string;
  Priority: number;
  ParentTask: string;
  ParentTaskID: number;
  UserID: number;
  UserName: string;
  Project: string;
  ProjectID: number;
  Task: string;
  TaskID: number;
  taskModel: TaskModel;
  parentTaskModel: ParentTaskModel;
  projectList: ProjectModel[];
  UserList: UserModel[];
  parentTaskList: ParentTaskModel[];
  startMinDate: string;
  endMinDate: string;
  addButtonText: string;
  taskError: boolean;
  projectError: boolean;
  startEndDateError: boolean;
  userError: boolean;

  constructor(private apiService: ApiService, private dialogService: DialogService, private route: ActivatedRoute, private location: Location) {

    this.startMinDate = new Date().toISOString().split('T')[0];
    let tmpDate = new Date();
    tmpDate.setDate(tmpDate.getDate() + 1);
    this.endMinDate = tmpDate.toISOString().split('T')[0];
    this.taskError = false;
    this.projectError = false;
    this.startEndDateError = false;
    this.userError = false;

    if (route.snapshot.params['task']) {
      let tModel = JSON.parse(route.snapshot.params['task']);
      this.TaskID = tModel.TaskID;
      this.Task = tModel.Task;
      this.ProjectID = tModel.ProjectID;
      this.ParentTaskID = tModel.ParentTaskID;
      this.Project = tModel.Project;
      this.Priority = tModel.Priority;
      this.StartDate = tModel.StartDate.split('T')[0];
      this.EndDate = tModel.EndDate.split('T')[0];
      this.UserID = tModel.UserID;
      this.ParentTask = tModel.ParentTask;
      this.UserName = tModel.UserName;
      this.addButtonText = "Update Task";
    }
    else {
      this.Priority = 0;
      this.StartDate = new Date().toISOString().split('T')[0];
      let tmpDate = new Date();
      tmpDate.setDate(tmpDate.getDate() + 1);
      this.EndDate = tmpDate.toISOString().split('T')[0];
      this.addButtonText = "Add Task";
    }
  }

  ngOnInit() {
  }

  TaskCheckBoxChange() {
    if (this.IsParentTask) {

      document.getElementById('projDialogButton').style.display = 'none';
      document.getElementById('parentTaskDialogButton').style.display = 'none';
      document.getElementById('openUserDialogButton').style.display = 'none';
      this.StartDate = undefined;
      this.EndDate = undefined;
      this.ProjectID = undefined;
      this.Priority = 0;
      this.ParentTaskID = undefined;
      this.UserID = undefined;
      this.projectError = false;
      this.startEndDateError = false;
      this.userError = false;
    }
    else {
      document.getElementById('projDialogButton').style.display = 'block';
      document.getElementById('parentTaskDialogButton').style.display = 'block';
      document.getElementById('openUserDialogButton').style.display = 'block';
      this.StartDate = new Date().toISOString().split('T')[0];
      let tmpDate = new Date();
      tmpDate.setDate(tmpDate.getDate() + 1);
      this.EndDate = tmpDate.toISOString().split('T')[0];
    }
  }

  AddUpdateTask() {
    document.getElementById('userMsg').innerText = "";
    document.getElementById('userMsg').style.color = "none";

    if (this.TaskID) {
      this.UpdateTask();
    }
    else {
      this.AddTask();
    }
  }

  UpdateTask() {
    var error = false;
    if (!this.Task) {
      this.taskError = true;
      error = true;
    }
    else {
      this.taskError = false;
    }

    if (!this.ProjectID) {
      this.projectError = true;
      error = true;
    }
    else {
      this.projectError = false;
    }

    if (!this.UserID) {
      this.userError = true;
      error = true;
    }
    else {
      this.userError = false;
    }

    if (!this.StartDate || !this.EndDate) {
      this.startEndDateError = true;
      error = true;
    }
    else {
      this.startEndDateError = false;
    }

    if (!error) {
      this.taskModel = new TaskModel();
      this.taskModel.TaskID = this.TaskID;
      this.taskModel.Task = this.Task;
      this.taskModel.ProjectID = this.ProjectID;
      this.taskModel.ParentTaskID = this.ParentTaskID;
      this.taskModel.Project = this.Project;
      this.taskModel.Priority = this.Priority;
      this.taskModel.StartDate = new Date(this.StartDate);
      this.taskModel.EndDate = new Date(this.EndDate);
      this.taskModel.UserID = this.UserID;
      this.apiService.UpdateTask(this.taskModel)
        .subscribe((data: any) => {
          this.ResetTask();
          document.getElementById('userMsg').innerText = "Task updated successfully...";
          document.getElementById('userMsg').style.color = "green";
        },
          function (error) {
            console.log(error);
            document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
            document.getElementById('userMsg').style.color = "red";
          });
    }
  }

  AddTask() {
    if (this.IsParentTask) {
      this.projectError = false;
      this.startEndDateError = false;
      this.userError = false;
      if (!this.Task) {
        this.taskError = true;
      }
      else {
        this.taskError = false;
      }

      if (!this.taskError) {
        this.parentTaskModel = new ParentTaskModel();
        this.parentTaskModel.ParentTask = this.Task;

        this.apiService.AddParentTask(this.parentTaskModel)
          .subscribe((data: any) => {
            this.ResetTask();
            document.getElementById('userMsg').innerText = "Task updated successfully...";
            document.getElementById('userMsg').style.color = "green";
          },
            function (error) {
              console.log(error);
              document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
              document.getElementById('userMsg').style.color = "red";
            });
      }
    }
    else {
      var error = false;
      if (!this.Task) {
        this.taskError = true;
        error = true;
      }
      else {
        this.taskError = false;
      }

      if (!this.ProjectID) {
        this.projectError = true;
        error = true;
      }
      else {
        this.projectError = false;
      }

      if (!this.UserID) {
        this.userError = true;
        error = true;
      }
      else {
        this.userError = false;
      }

      if (!this.StartDate || !this.EndDate) {
        this.startEndDateError = true;
        error = true;
      }
      else {
        this.startEndDateError = false;
      }

      if (!error) {
        this.taskModel = new TaskModel();
        this.taskModel.Task = this.Task;
        this.taskModel.ProjectID = this.ProjectID;
        this.taskModel.ParentTaskID = this.ParentTaskID;
        this.taskModel.Project = this.Project;
        this.taskModel.Priority = this.Priority;
        this.taskModel.StartDate = new Date(this.StartDate);
        this.taskModel.EndDate = new Date(this.EndDate);
        this.taskModel.UserID = this.UserID;
        this.apiService.AddTask(this.taskModel)
          .subscribe((data: any) => {
            document.getElementById('userMsg').innerText = "Task added successfully...";
            document.getElementById('userMsg').style.color = "green";
          },
            function (error) {
              console.log(error);
              document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
              document.getElementById('userMsg').style.color = "red";
            });
      }
    }
  }

  ResetTask() {
    this.Priority = 0;
    this.StartDate = new Date().toISOString().split('T')[0];
    let tmpDate = new Date();
    tmpDate.setDate(tmpDate.getDate() + 1);
    this.EndDate = tmpDate.toISOString().split('T')[0];
    this.addButtonText = "Add Task";

    this.TaskID = undefined;
    this.Task = undefined;
    this.ProjectID = undefined;
    this.ParentTaskID = undefined;
    this.Project = undefined;
    this.UserID = undefined;
    this.ParentTask = undefined;
    this.UserName = undefined;
    this.taskError = false;
    this.projectError = false;
    this.startEndDateError = false;
    this.userError = false;

    document.getElementById('userMsg').innerText = "";
    document.getElementById('userMsg').style.color = "none";
  }

  openProjectDialog() {
    let disposable = this.dialogService.addDialog(ProjectListModelComponent, this.projectList)
      .subscribe((selectedProject) => {
        if (selectedProject) {
          this.ProjectID = selectedProject.ProjectID;
          this.Project = selectedProject.Project;
        }
      });
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);
  }

  openParentTaskDialog() {
    let disposable = this.dialogService.addDialog(TaskListModelComponent, this.parentTaskList)
      .subscribe((selectedTask) => {
        if (selectedTask) {
          this.ParentTaskID = selectedTask.ParentTaskID;
          this.ParentTask = selectedTask.ParentTask;
        }
      });
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);
  }

  openUserDialog() {
    let disposable = this.dialogService.addDialog(UserListModelComponent, this.UserList)
      .subscribe((selectedUser) => {
        if (selectedUser) {
          this.UserID = selectedUser.UserID;
          this.UserName = selectedUser.FirstName + ' ' + selectedUser.LastName;
        }
      });
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);
  }

}
