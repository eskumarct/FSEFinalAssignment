using ProjectManager.DataAccessLayer;
using ProjectManager.InterfaceLayer;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using CommonEntities = ProjectManager.CommonEntities;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManager.BusinessLayer;

namespace ProjectManagerService.Tests.UnitTest
{
    public class MockTaskBL : ITaskBL
    {
        public Collection<CommonEntities.Tasks> GetTasks(int projectID)
        {
            ProjectManagerEntities mockContext = MockDataSetList();
            var taskBL = new TaskBL(mockContext);
            Collection<CommonEntities.Tasks> tasks = taskBL.GetTasks(projectID);

            return tasks;
        }

        public Collection<CommonEntities.ParentTasks> GetParentTasks()
        {
            ProjectManagerEntities mockContext = MockDataSetList();
            var taskBL = new TaskBL(mockContext);
            Collection<CommonEntities.ParentTasks> tasks = taskBL.GetParentTasks();

            return tasks;
        }

        public void AddTask(CommonEntities.Tasks task)
        {
            ProjectManagerEntities mockContext = MockDataSetList();
            var taskBL = new TaskBL(mockContext);
            taskBL.AddTask(task);
        }

        public void AddParentTask(CommonEntities.ParentTasks task)
        {
            ProjectManagerEntities mockContext = MockDataSetList();
            var taskBL = new TaskBL(mockContext);
            taskBL.AddParentTask(task);
        }

        public void UpdateTask(CommonEntities.Tasks task)
        {
            ProjectManagerEntities mockContext = MockDataSetList();
            var taskBL = new TaskBL(mockContext);
            taskBL.UpdateTask(task);
        }

        public void EndTask(CommonEntities.Tasks task)
        {
            ProjectManagerEntities mockContext = MockDataSetList();
            var taskBL = new TaskBL(mockContext);
            taskBL.EndTask(task);
        }

        private static ProjectManagerEntities MockDataSetList()
        {
            MockProjectManager mockProj = new MockProjectManager();
            ProjectManagerEntities mockContext = mockProj.MockDataSetList();

            return mockContext;
        }
    }
}
