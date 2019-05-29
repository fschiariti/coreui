using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using facturawebApi.DataModel;
using facturawebApi.ViewModel;


namespace facturawebApi.Interface
{
    public interface IUsers
    {
        bool InsertUsers(Users user);
        bool CheckUsersExits(string username);
        Users GetUsersbyId(int userid);
        bool DeleteUsers(int userid);
        bool UpdateUsers(Users role);
        List<Users> GetAllUsers();
        bool AuthenticateUsers(string username, string password);
        LoginResponse GetUserDetailsbyCredentials(string username);
    }
}