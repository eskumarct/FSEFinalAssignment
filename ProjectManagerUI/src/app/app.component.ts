import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectManagerUI';
  selectedItem: string;

  constructor() {
    this.selectedItem = 'addUsers';
  }

  listClick(newValue) {
    this.selectedItem = newValue;
  }

}
