using System.Collections.ObjectModel;

namespace ProjectManager.InterfaceLayer
{
    public interface IProjectBL
    {
        Collection<CommonEntities.Projects> GetProjects();
        void AddProject(CommonEntities.Projects project);
        void UpdateProject(CommonEntities.Projects project);
        void SuspendProject(int projectID);
    }
}
