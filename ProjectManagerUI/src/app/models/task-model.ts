export class TaskModel {
    ProjectID: number;
    Project: string;
    TaskID: number;
    Task: string;
    ParentTaskID: number;
    ParentTask: string;
    Priority: number;
    StartDate?: Date;
    EndDate?: Date;
    UserID: number;
    UserName: string;
    Status: boolean;
}

export class ParentTaskModel {
    ParentTaskID: number;
    ParentTask: string;
}