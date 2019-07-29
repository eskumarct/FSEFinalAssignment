import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ProjectModel } from '../../models/project-model';
import { ApiService } from '../../service/api-service';

@Component({
  selector: 'app-project-list-model',
  templateUrl: './project-list-model.component.html',
  styleUrls: ['./project-list-model.component.css']
})
export class ProjectListModelComponent extends DialogComponent<ProjectModel[], ProjectModel> implements ProjectModel {
  ProjectID: number;
  Project: string;
  StartDate?: Date;
  EndDate?: Date;
  Priority: number;
  ManagerID: number;
  ManagerName: string;
  NoofTasks: number;
  NoofCompletedTasks: number;
  projectList: ProjectModel[];
  filteredList: ProjectModel[];
  projectListCount: number;
  searchText: string;

  constructor(dialogService: DialogService, private apiService: ApiService) {
    super(dialogService);
  }

  ngOnInit() {
    this.GetProjects();
    this.assignCopy();
  }

  GetProjects() {
    this.apiService.GetProjects()
      .subscribe((data: ProjectModel[]) => {
        console.log(data);
        this.projectList = data;
        this.assignCopy();
      },
        function (error) {
          console.log(error);
        });
  }

  SelectProject(project) {
    let projectModel = new ProjectModel();
    projectModel.ProjectID = project.ProjectID;
    projectModel.Project = project.Project;
    this.result = projectModel;
    this.close();
  }

  filterItem() {
    if (!this.searchText) this.assignCopy();
    this.filteredList = Object.assign([], this.projectList).filter(
      item => (item.Project != undefined ? item.Project.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 : true)
    )
  }

  assignCopy() {
    this.filteredList = Object.assign([], this.projectList);
    this.projectListCount = this.filteredList.length;
  }

}
