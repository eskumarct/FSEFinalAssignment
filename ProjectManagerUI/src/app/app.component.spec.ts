import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from '../app/service/api-service';
import { DialogService } from "ng2-bootstrap-modal";
import { RouterModule, Router } from '@angular/router';
import { appRoutes } from '../app/app-routing.module';
import { ViewTasksComponent } from '../app/view-tasks/view-tasks.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UsersComponent } from '../app/users/users.component';
import { ProjectsComponent } from '../app/projects/projects.component';
import { AddTasksComponent } from '../app/add-tasks/add-tasks.component';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,ViewTasksComponent, UsersComponent, ProjectsComponent, AddTasksComponent],
      imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes)],
      providers: [ApiService, DialogService, { provide: APP_BASE_HREF, useValue: '/' }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
