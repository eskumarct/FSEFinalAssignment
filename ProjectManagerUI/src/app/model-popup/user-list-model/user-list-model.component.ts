import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { UserModel } from '../../models/user-model';
import { ApiService } from '../../service/api-service';

@Component({
  selector: 'app-user-list-model',
  templateUrl: './user-list-model.component.html',
  styleUrls: ['./user-list-model.component.css']
})
export class UserListModelComponent extends DialogComponent<UserModel[], UserModel> implements UserModel {
  FirstName: string;
  LastName: string;
  EmployeeID: string;
  UserID: number;
  UserList: UserModel[];
  filteredList: UserModel[];
  userListCount: number;
  searchText: string;

  constructor(dialogService: DialogService, private apiService: ApiService) {
    super(dialogService);
  }

  ngOnInit() {
    this.GetUsers();
    this.assignCopy();
  }

  GetUsers() {
    this.apiService.GetUsers()
      .subscribe((data: UserModel[]) => {
        console.log(data);
        this.UserList = data;
        this.assignCopy();
      },
        function (error) {
          console.log(error);
        });
  }

  SelectUser(user) {
    let userModel = new UserModel();
    userModel.FirstName = user.FirstName;
    userModel.LastName = user.LastName;
    userModel.EmployeeID = user.EmployeeID;
    userModel.UserID = user.UserID;
    this.result = userModel;
    this.close();
  }

  filterItem() {
    if (!this.searchText) this.assignCopy();
    this.filteredList = Object.assign([], this.UserList).filter(
      item => (item.FirstName != undefined ? item.FirstName.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 : true) ||
        (item.LastName != undefined ? item.LastName.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 : true) ||
        (item.EmployeeID != undefined ? item.EmployeeID.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 : true)
    )
  }

  assignCopy() {
    this.filteredList = Object.assign([], this.UserList);
    this.userListCount = this.filteredList.length;
  }
}
