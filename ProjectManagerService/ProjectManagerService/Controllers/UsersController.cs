using ProjectManager.BusinessLayer;
using ProjectManager.InterfaceLayer;
using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web.Http;
using CommonEntities = ProjectManager.CommonEntities;
using ProjectMangerModel = ProjectManagerService.Models;

namespace ProjectManagerService.Controllers
{
    [RoutePrefix("api/Users")]
    public class UsersController : ApiController
    {
        private readonly IUserBL _userBL = null;

        public UsersController()
        {
            _userBL = new UserBL();
        }

        public UsersController(IUserBL userBL)
        {
            _userBL = userBL;
        }

        [HttpGet]
        [Route("GetUsers")]
        public IHttpActionResult GetUsers()
        {
            Collection<ProjectMangerModel.Users> users = new Collection<ProjectMangerModel.Users>();

            var blProjects = _userBL.GetUsers();
            blProjects.ToList()
                .ForEach(ur => users.Add(
                   new ProjectMangerModel.Users
                   {
                       UserID = ur.UserID,
                       FirstName = ur.FirstName,
                       LastName = ur.LastName,
                       EmployeeID = ur.EmployeeID
                   }));

            return Ok(users);
        }

        [HttpPost]
        [Route("AddUser")]
        public IHttpActionResult AddUser([FromBody]ProjectMangerModel.Users user)
        {
            try
            {
                CommonEntities.Users usr = new CommonEntities.Users
                {
                    UserID = user.UserID,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    EmployeeID = user.EmployeeID
                };

                _userBL.AddUser(usr);
                return Ok();
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        [Route("UpdateUser")]
        public IHttpActionResult UpdateUser([FromBody]ProjectMangerModel.Users user)
        {
            try
            {
                CommonEntities.Users usr = new CommonEntities.Users
                {
                    UserID = user.UserID,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    EmployeeID = user.EmployeeID
                };

                _userBL.UpdateUser(usr);
                return Ok();
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        [Route("DeleteUser")]
        public IHttpActionResult DeleteUser([FromBody]ProjectMangerModel.Users user)
        {
            try
            {
                CommonEntities.Users usr = new CommonEntities.Users
                {
                    UserID = user.UserID,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    EmployeeID = user.EmployeeID
                };
                _userBL.DeleteUser(usr);
                return Ok();
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
    }
}
