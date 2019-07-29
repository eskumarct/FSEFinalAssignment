import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user-model';
import { ApiService } from '../service/api-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  FirstName: string;
  LastName: string;
  EmployeeID: string;
  UserID: number;
  AddButtonText: string;
  ResetButtonText: string;
  object: UserModel;
  UserList: UserModel[];
  filteredList: UserModel[];
  searchText: string;
  sortByFName: string;
  userListCount: number;
  firstNameError: boolean;
  lastNameError: boolean;
  employeeIDError: boolean;

  constructor(private apiService: ApiService) {
    this.firstNameError = false;
    this.lastNameError = false;
    this.employeeIDError = false;
  }

  ngOnInit() {
    this.AddButtonText = "Add User";
    this.ResetButtonText = "Reset";
    this.GetUsers();
  }

  sortingUser(sort) {
    if (sort == 'FName') {
      this.filteredList.sort((a, b) => {
        if (a.FirstName < b.FirstName) return -1;
        else if (a.FirstName > b.FirstName) return 1;
        else return 0;
      });
    }
    else if (sort == 'LName') {
      this.filteredList.sort((a, b) => {
        if (a.LastName < b.LastName) return -1;
        else if (a.LastName > b.LastName) return 1;
        else return 0;
      });
    }
    else if (sort == 'EId') {
      this.filteredList.sort((a, b) => {
        if (a.EmployeeID < b.EmployeeID) return -1;
        else if (a.EmployeeID > b.EmployeeID) return 1;
        else return 0;
      });
    }

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  assignCopy() {
    this.filteredList = Object.assign([], this.UserList);
    this.userListCount = this.filteredList.length;
  }

  filterItem() {
    if (!this.searchText) this.assignCopy();
    this.filteredList = Object.assign([], this.UserList).filter(
      item => (item.FirstName != undefined ? item.FirstName.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 : true) ||
        (item.LastName != undefined ? item.LastName.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 : true) ||
        (item.EmployeeID != undefined ? item.EmployeeID.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 : true)
    )
  }

  GetUsers() {
    this.apiService.GetUsers()
      .subscribe((data: UserModel[]) => {
        this.UserList = data;
        this.assignCopy();
      },
        function (error) {
          console.log(error);
        });
  }

  AddUpdateUser() {
    document.getElementById('userMsg').innerText = "";
    document.getElementById('userMsg').style.color = "none";

    if (this.UserID) {
      this.UpdateUser();
    }
    else {
      this.AddUser();
    }
  }

  AddUser() {

    if (!this.FirstName) {
      this.firstNameError = true;
    }
    else {
      this.firstNameError = false;
    }

    if (!this.LastName) {
      this.lastNameError = true;
    }
    else {
      this.lastNameError = false;
    }

    if (!this.EmployeeID) {
      this.employeeIDError = true;
    }
    else {
      this.employeeIDError = false;
    }

    if (!this.firstNameError && !this.lastNameError && !this.employeeIDError) {
      this.object = new UserModel();
      this.object.FirstName = this.FirstName;
      this.object.LastName = this.LastName;
      this.object.EmployeeID = this.EmployeeID;

      this.apiService.AddUser(this.object)
        .subscribe((data: any) => {
          this.ResetData();
          this.GetUsers();
          document.getElementById('userMsg').innerText = "User added successfully...";
          document.getElementById('userMsg').style.color = "green";
        },
          function (error) {
            console.log(error);
            document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
            document.getElementById('userMsg').style.color = "red";
          });
    }
  }

  UpdateUser() {
    if (!this.FirstName) {
      this.firstNameError = true;
    }
    else {
      this.firstNameError = false;
    }

    if (!this.LastName) {
      this.lastNameError = true;
    }
    else {
      this.lastNameError = false;
    }

    if (!this.EmployeeID) {
      this.employeeIDError = true;
    }
    else {
      this.employeeIDError = false;
    }

    if (!this.firstNameError && !this.lastNameError && !this.employeeIDError) {
      this.object = new UserModel();
      this.object.UserID = this.UserID;
      this.object.FirstName = this.FirstName;
      this.object.LastName = this.LastName;
      this.object.EmployeeID = this.EmployeeID;

      this.apiService.UpdateUser(this.object)
        .subscribe((data: any) => {
          this.ResetData();
          this.GetUsers();
          document.getElementById('userMsg').innerText = "User updated successfully...";
          document.getElementById('userMsg').style.color = "green";
        },
          function (error) {
            console.log(error);
            document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
            document.getElementById('userMsg').style.color = "red";
          });
    }
  }

  DeleteUser(user) {
    let obj = new UserModel();
    obj.UserID = user.UserID;
    obj.FirstName = user.FirstName;
    obj.LastName = user.LastName;
    obj.EmployeeID = user.EmployeeID;

    document.getElementById('userMsg').innerText = "";
    document.getElementById('userMsg').style.color = "none";

    this.apiService.DeleteUser(obj)
      .subscribe((data: any) => {
        this.ResetData();
        this.GetUsers();
        document.getElementById('userMsg').innerText = "User deleted successfully...";
        document.getElementById('userMsg').style.color = "green";
      },
        function (error) {
          console.log(error);
          document.getElementById('userMsg').innerText = "Error occurred. Please try again...";
          document.getElementById('userMsg').style.color = "red";
        });
  }

  EditUser(user) {
    this.AddButtonText = "Update";
    this.ResetButtonText = "Cancel";
    this.FirstName = user.FirstName;
    this.LastName = user.LastName;
    this.EmployeeID = user.EmployeeID;
    this.UserID = user.UserID;
  }

  ResetData() {
    this.object = new UserModel();
    this.FirstName = undefined;
    this.LastName = undefined;
    this.EmployeeID = undefined;
    this.UserID = undefined;
    this.firstNameError = false;
    this.lastNameError = false;
    this.employeeIDError = false;
    this.AddButtonText = "Add User";
    this.ResetButtonText = "Reset";
    document.getElementById('userMsg').innerText = "";
    document.getElementById('userMsg').style.color = "none";
  }
}
