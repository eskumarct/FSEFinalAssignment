import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../models/project-model';
import { UserModel } from '../models/user-model';
import { ApiService } from '../service/api-service';
import { DialogService } from "ng2-bootstrap-modal";
import { UserListModelComponent } from '../model-popup/user-list-model/user-list-model.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  ProjectID: number;
  Project: string;
  StartDate: string;
  EndDate: string;
  Priority: number;
  ManagerID: number;
  ManagerName: string;
  NoofTasks: number;
  NoofCompletedTasks: number;
  StartEndDateSelected: boolean;
  object: ProjectModel;
  projectList: ProjectModel[];
  filteredList: ProjectModel[];
  projListCount: number;
  AddButtonText: string;
  ResetButtonText: string;
  startMinDate: string;
  endMinDate: string;
  UserList: UserModel[];
  searchText: string;
  projectNameError: boolean;
  StartEndDateError: boolean;
  managerError: boolean;

  constructor(private apiService: ApiService, private dialogService: DialogService) {
    this.projectNameError = false;
    this.StartEndDateError = false;
    this.managerError = false;
    this.StartEndDateSelected = false;
    this.Priority = 0;
    this.startMinDate = new Date().toISOString().split('T')[0];
    let tmpDate = new Date();
    tmpDate.setDate(tmpDate.getDate() + 1);
    this.endMinDate = tmpDate.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.AddButtonText = "Add Project";
    this.ResetButtonText = "Reset";
    this.GetProjects();
  }

  GetProjects() {
    this.apiService.GetProjects()
      .subscribe((data: ProjectModel[]) => {
        this.projectList = data;
        this.assignCopy();
      },
        function (error) {
          console.log(error);
        });
  }

  AddUpdateProject() {

    document.getElementById('userMsg').innerText = "";
    document.getElementById('userMsg').style.color = "none";

    if (this.ProjectID) {
      this.UpdateProject();
    }
    else {
      this.AddProject();
    }
  }

  AddProject() {
    var error = false;
    if (!this.Project) {
      this.projectNameError = true;
      error = true;
    }
    else {
      this.projectNameError = false;
    }

    if (this.StartEndDateSelected && (!this.StartDate || !this.EndDate)) {
      this.StartEndDateError = true;
      error = true;
    }
    else {
      this.StartEndDateError = false;
    }

    if (!this.ManagerID) {
      this.managerError = true;
      error = true;
    }
    else {
      this.managerError = false;
    }

    if (!error) {
      this.object = new ProjectModel();
      this.object.Project = this.Project;
      this.object.Priority = this.Priority;
      if (this.StartEndDateSelected) {
        this.object.StartDate = new Date(this.StartDate);
        this.object.EndDate = new Date(this.EndDate);
      }
      this.object.ManagerID = this.ManagerID;

      this.apiService.AddProject(this.object)
        .subscribe((data: any) => {
          this.ResetData();
          this.GetProjects();
          document.getElementById('userMsg').innerText = "Project added successfully...";
          document.getElementById('userMsg').style.color = "green";
        },
          function (error) {
            console.log(error);
            document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
            document.getElementById('userMsg').style.color = "red";
          });
    }
  }

  UpdateProject() {
    var error = false;
    if (!this.Project) {
      this.projectNameError = true;
      error = true;
    }
    else {
      this.projectNameError = false;
    }

    if (this.StartEndDateSelected && (!this.StartDate || !this.EndDate)) {
      this.StartEndDateError = true;
      error = true;
    }
    else {
      this.StartEndDateError = false;
    }

    if (!this.ManagerID) {
      this.managerError = true;
      error = true;
    }
    else {
      this.managerError = false;
    }

    if (!error) {
      this.object = new ProjectModel();
      this.object.Project = this.Project;
      this.object.Priority = this.Priority;
      this.object.ProjectID = this.ProjectID;
      if (this.StartEndDateSelected) {
        this.object.StartDate = new Date(this.StartDate);
        this.object.EndDate = new Date(this.EndDate);
      }
      this.object.ManagerID = this.ManagerID;

      this.apiService.UpdateProject(this.object)
        .subscribe((data: any) => {
          this.ResetData();
          this.GetProjects();
          document.getElementById('userMsg').innerText = "Project updated successfully...";
          document.getElementById('userMsg').style.color = "green";
        },
          function (error) {
            console.log(error);
            document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
            document.getElementById('userMsg').style.color = "red";
          });
    }
  }

  SuspendProject(projectID) {
    document.getElementById('userMsg').innerText = "";
    document.getElementById('userMsg').style.color = "none";

    this.apiService.SuspendProject(projectID)
      .subscribe((data: any) => {
        this.ResetData();
        this.GetProjects();
        document.getElementById('userMsg').innerText = "Project suspended successfully...";
        document.getElementById('userMsg').style.color = "green";
      },
        function (error) {
          console.log(error);
          document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
          document.getElementById('userMsg').style.color = "red";
        });
  }

  EditProject(project) {
    this.AddButtonText = "Update";
    this.ResetButtonText = "Cancel";
    this.ProjectID = project.ProjectID;
    this.Project = project.Project;
    this.Priority = project.Priority;
    if (project.StartDate) {
      this.StartDate = project.StartDate.split('T')[0];
      this.EndDate = project.EndDate.split('T')[0];
      this.StartEndDateSelected = true;
    }
    else {
      this.StartEndDateSelected = false;
      this.StartDate = undefined;
      this.EndDate = undefined;
    }
    this.ManagerID = project.ManagerID;
    this.ManagerName = project.ManagerName;
  }

  filterItem() {
    if (!this.searchText) this.assignCopy();
    this.filteredList = Object.assign([], this.projectList).filter(
      item => (item.Project != undefined ? item.Project.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 : true)
    )
  }

  sortingProject(sort) {
    if (sort == 'SDate') {
      this.filteredList.sort((a, b) => {
        if (a.StartDate < b.StartDate) return -1;
        else if (a.StartDate > b.StartDate) return 1;
        else return 0;
      });
    }
    else if (sort == 'EDate') {
      this.filteredList.sort((a, b) => {
        if (a.EndDate < b.EndDate) return -1;
        else if (a.EndDate > b.EndDate) return 1;
        else return 0;
      });
    }
    else if (sort == 'Priority') {
      this.filteredList.sort((a, b) => {
        if (a.Priority < b.Priority) return -1;
        else if (a.Priority > b.Priority) return 1;
        else return 0;
      });
    }
    else if (sort == 'Completed') {
      this.filteredList.sort((a, b) => {
        if (a.NoofCompletedTasks < b.NoofCompletedTasks) return -1;
        else if (a.NoofCompletedTasks > b.NoofCompletedTasks) return 1;
        else return 0;
      });
    }
  }

  openDialog() {
    let disposable = this.dialogService.addDialog(UserListModelComponent, this.UserList)
      .subscribe((selectedUser) => {
        if (selectedUser) {
          this.ManagerID = selectedUser.UserID;
          this.ManagerName = selectedUser.FirstName + ' ' + selectedUser.LastName;
        }
      });
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);
  }

  assignCopy() {
    this.filteredList = Object.assign([], this.projectList);
    this.projListCount = this.filteredList.length;
  }

  ResetData() {
    this.object = new ProjectModel();
    this.Project = undefined;
    this.Priority = 0;
    this.StartEndDateSelected = false;
    this.StartDate = undefined;
    this.EndDate = undefined;
    this.ManagerID = undefined;
    this.ManagerName = undefined;
    this.projectNameError = false;
    this.StartEndDateError = false;
    this.managerError = false;
    this.AddButtonText = "Add Project";
    this.ResetButtonText = "Reset";
    document.getElementById('userMsg').innerText = "";
    document.getElementById('userMsg').style.color = "none";
  }

  DateCheckBoxChange() {
    if (this.StartEndDateSelected) {
      this.StartDate = new Date().toISOString().split('T')[0];
      let tmpDate = new Date();
      tmpDate.setDate(tmpDate.getDate() + 1);
      this.EndDate = tmpDate.toISOString().split('T')[0];
      this.StartEndDateError = false;
    }
    else {
      this.StartDate = undefined;
      this.EndDate = undefined;
      this.StartEndDateError = false;
    }
  }

}
