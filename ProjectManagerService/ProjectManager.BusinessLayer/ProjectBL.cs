using ProjectManager.DataAccessLayer;
using ProjectManager.InterfaceLayer;
using System.Collections.ObjectModel;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace ProjectManager.BusinessLayer
{
    public class ProjectBL : IProjectBL
    {
        private readonly ProjectManagerEntities _projectManager;

        public ProjectBL()
        {
            _projectManager = new ProjectManagerEntities();
        }
        public ProjectBL(ProjectManagerEntities projectManager)
        {
            _projectManager = projectManager;
        }
        public Collection<CommonEntities.Projects> GetProjects()
        {

            Collection<CommonEntities.Projects> projCollection = new Collection<CommonEntities.Projects>();

            _projectManager.Projects.SelectMany
            (
                proj => _projectManager.Users.Where(user => proj.ProjectID == user.ProjectID).DefaultIfEmpty(),
                (x, y) => new
                {
                    Projects = x,
                    Users = y
                }
            ).ToList()
                .ForEach(y => projCollection.Add(
                    new CommonEntities.Projects
                    {
                        ProjectID = y.Projects.ProjectID,
                        Project = y.Projects.Project,
                        StartDate = y.Projects.StartDate,
                        EndDate = y.Projects.EndDate,
                        Priority = y.Projects.Priority,
                        NoofTasks = _projectManager.Tasks.Where(x => x.ProjectID == y.Projects.ProjectID).Count(),
                        NoofCompletedTasks = _projectManager.Tasks.Where(x => x.ProjectID == y.Projects.ProjectID && x.Status == true).Count(),
                        ManagerID = y.Users != null ? y.Users.UserID : 0,
                        ManagerName = y.Users != null ? y.Users.FirstName + " " + y.Users.LastName : ""
                    }
                    ));

            return projCollection;
        }

        public void AddProject(CommonEntities.Projects project)
        {
            Projects proj = new Projects
            {
                Project = project.Project,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Priority = project.Priority
            };

            _projectManager.Projects.Add(proj);
            _projectManager.SaveChanges();
            var proId = proj.ProjectID;
            var ur = _projectManager.Users.Where(x => x.UserID == project.ManagerID).FirstOrDefault();
            if (ur != null)
            {
                ur.ProjectID = proId;
                _projectManager.SaveChanges();
            }
        }

        public void UpdateProject(CommonEntities.Projects project)
        {
            var proj = _projectManager.Projects.Where(x => x.ProjectID == project.ProjectID).FirstOrDefault();
            var user = _projectManager.Users.Where(x => x.UserID == project.ManagerID).FirstOrDefault();
            var extUser = _projectManager.Users.Where(x => x.ProjectID == project.ProjectID).FirstOrDefault();

            if (proj != null && user != null)
            {
                proj.Project = project.Project;
                proj.StartDate = project.StartDate;
                proj.EndDate = project.EndDate;
                proj.Priority = project.Priority;
                if (extUser != null)
                {
                    extUser.ProjectID = null;
                }
                user.ProjectID = project.ProjectID;
                _projectManager.SaveChanges();
            }
        }

        public void SuspendProject(int projectID)
        {
            Projects proj = new Projects
            {
                ProjectID = projectID
            };
            var user = _projectManager.Users.Where(x => x.ProjectID == projectID).FirstOrDefault();
            if (user != null)
            {
                user.ProjectID = null;
            }

            _projectManager.Entry(proj).State = EntityState.Deleted;
            _projectManager.SaveChanges();
        }
    }
}
