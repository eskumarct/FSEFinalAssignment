using NUnit.Framework;
using ProjectManager.InterfaceLayer;
using ProjectMangerModel = ProjectManagerService.Models;
using ProjectManagerService.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Results;
using System.Collections.ObjectModel;

namespace ProjectManagerService.Tests.UnitTest
{
    [TestFixture]
    public class TaskControllersTest
    {
        private ITaskBL taskBL;
        private TasksController taskController;

        [SetUp]
        public void TestSetUp()
        {
            taskBL = new MockTaskBL();
            taskController = new TasksController(taskBL);
        }

        [TearDown]
        public void TestTearDown()
        {
            taskBL = null;
            taskController = null;
        }

        [Test]
        public void GetTasksTest()
        {
            var response = taskController.GetTasks(1);
            var responseResult = response as OkNegotiatedContentResult<Collection<ProjectMangerModel.Tasks>>;
            Assert.IsNotNull(responseResult);
            Assert.IsNotNull(responseResult.Content);
            foreach (var task in responseResult.Content)
            {
                Assert.IsNotNull(task.TaskID);
                Assert.IsNotNull(task.Task);
                Assert.IsNotNull(task.StartDate);
                Assert.IsNotNull(task.EndDate);
            }
        }

        [Test]
        public void GetParentTasksTest()
        {
            var response = taskController.GetParentTasks();
            var responseResult = response as OkNegotiatedContentResult<Collection<ProjectMangerModel.ParentTasks>>;
            Assert.IsNotNull(responseResult);
            Assert.IsNotNull(responseResult.Content);
            foreach (var task in responseResult.Content)
            {
                Assert.IsNotNull(task.ParentTaskID);
                Assert.IsNotNull(task.ParentTask);
            }
        }

        [Test]
        public void AddTaskTest_Success()
        {
            // Arrange
            ProjectMangerModel.Tasks model = new ProjectMangerModel.Tasks
            {
                TaskID = 5,
                Task = "Task 5",
                ProjectID = 1,
                Priority = 10,
                StartDate = DateTime.Now.Date,
                EndDate = DateTime.Now.Date.AddDays(1)
            };

            // Act
            var response = taskController.AddTask(model);

            // Assert
            Assert.IsTrue(response is OkResult);
        }

        [Test]
        public void AddTaskTest_Error()
        {
            // Arrange
            var taskController = new TasksController(null);

            ProjectMangerModel.Tasks model = new ProjectMangerModel.Tasks
            {
                TaskID = 5,
                Task = "Task 5",
                ProjectID = 1,
                Priority = 10,
                StartDate = DateTime.Now.Date,
                EndDate = DateTime.Now.Date.AddDays(1)
            };

            // Act
            var response = taskController.AddTask(model);

            // Assert
            Assert.IsTrue(response is InternalServerErrorResult);
        }

        [Test]
        public void AddParentTaskTest_Success()
        {
            // Arrange
            ProjectMangerModel.ParentTasks model = new ProjectMangerModel.ParentTasks
            {
                ParentTaskID = 3,
                ParentTask = "Parent Task 3"
            };

            // Act
            var response = taskController.AddParentTask(model);

            // Assert
            Assert.IsTrue(response is OkResult);
        }

        [Test]
        public void AddParentTaskTest_Error()
        {
            // Arrange
            var taskController = new TasksController(null);

            ProjectMangerModel.ParentTasks model = new ProjectMangerModel.ParentTasks
            {
                ParentTaskID = 3,
                ParentTask = "Parent Task 3"
            };

            // Act
            var response = taskController.AddParentTask(model);

            // Assert
            Assert.IsTrue(response is InternalServerErrorResult);
        }

        [Test]
        public void UpdateTaskTest_Success()
        {
            // Arrange
            ProjectMangerModel.Tasks model = new ProjectMangerModel.Tasks
            {
                TaskID = 1,
                Task = "Task 1",
                ProjectID = 1,
                Priority = 10,
                StartDate = DateTime.Now.Date,
                EndDate = DateTime.Now.Date.AddDays(1)
            };

            // Act
            var response = taskController.UpdateTask(model);

            // Assert
            Assert.IsTrue(response is OkResult);
        }

        [Test]
        public void UpdateTaskTest_Error()
        {
            // Arrange
            var taskController = new TasksController(null);

            ProjectMangerModel.Tasks model = new ProjectMangerModel.Tasks
            {
                TaskID = 1,
                Task = "Task 1",
                ProjectID = 1,
                Priority = 10,
                StartDate = DateTime.Now.Date,
                EndDate = DateTime.Now.Date.AddDays(2)
            };

            // Act
            var response = taskController.UpdateTask(model);

            // Assert
            Assert.IsTrue(response is InternalServerErrorResult);
        }

        [Test]
        public void EndTaskTest_Success()
        {
            // Arrange
            ProjectMangerModel.Tasks model = new ProjectMangerModel.Tasks
            {
                TaskID = 1,
                Task = "Task 1",
                ProjectID = 1,
                Priority = 10,
                StartDate = DateTime.Now.Date,
                EndDate = DateTime.Now.Date.AddDays(1)
            };

            // Act
            var response = taskController.EndTask(model);

            // Assert
            Assert.IsTrue(response is OkResult);
        }

        [Test]
        public void EndTaskTest_Error()
        {
            // Arrange
            var taskController = new TasksController(null);

            ProjectMangerModel.Tasks model = new ProjectMangerModel.Tasks
            {
                TaskID = 1,
                Task = "Task 1",
                ProjectID = 1,
                Priority = 10,
                StartDate = DateTime.Now.Date,
                EndDate = DateTime.Now.Date.AddDays(2)
            };

            // Act
            var response = taskController.EndTask(model);

            // Assert
            Assert.IsTrue(response is InternalServerErrorResult);
        }
    }
}
